import { useEffect, useRef, useState } from "react";

// dflip (jQuery based) lives in public/dflip, it is loaded only when a flipbook is opened
// to switch to the paid version just replace the files in public/dflip
const DFLIP_LOCATION = "/dflip/";
let dflipLoader = null; // shared promise so that jQuery and dflip are loaded only once
// spreads kept downloaded around the open one -> 2 behind + open + 3 ahead = 12 pages (more ahead as books are mostly read forward)
const SPREADS_BEHIND = 2;
const SPREADS_AHEAD = 3;

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false; // keeps the order in which they were added
    script.onload = resolve;
    script.onerror = () => reject(new Error("FLIPBOOK_LOAD_FAILED"));
    document.body.appendChild(script);
  });

const loadDflip = () => {
  if (!dflipLoader) {
    dflipLoader = import("jquery").then(({ default: jQuery }) => {
      window.jQuery = window.$ = jQuery; // dflip expects a global jQuery
      window.dFlipLocation = DFLIP_LOCATION; // dflip loads pdf.js, three.js, sounds etc. from here

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = DFLIP_LOCATION + "css/dflip.min.css";
      document.head.appendChild(link);

      // three.js is loaded here instead of letting dflip load it , dflip's own loader gets stuck at
      // "Loading WEBGL 3D" when a flipbook is closed and opened again while three.js is still downloading
      return Promise.all([
        loadScript(DFLIP_LOCATION + "js/libs/three.min.js"),
        loadScript(DFLIP_LOCATION + "js/dflip.min.js"),
      ]).then(() => jQuery);
    }).catch((e) => {
      dflipLoader = null; // allow retry
      throw e;
    });
  }
  return dflipLoader;
};

// source is either a pdf url or an array of page image urls (in order)
const FlipBook = ({ source, className = "" }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let app = null;
    let cancelled = false;

    // for image books, keep the spreads around the open one downloaded so flipping either way looks continuous
    // e.g. while 8,9 is open -> 4..7 + 8,9 + 10..15 are ready , the browser cache serves them when dflip asks for them
    const preloaded = new Set();
    const preloadNearbyPages = (flipbook) => {
      if (!Array.isArray(source)) return; // pdf.js loads pdf pages itself
      const spreadStart = Math.floor(flipbook.currentPageNumber / 2) * 2; // left page of the open spread , same as dflip
      const first = Math.max(1, spreadStart - 2 * SPREADS_BEHIND);
      const last = Math.min(source.length, spreadStart + 1 + 2 * SPREADS_AHEAD);
      for (let page = first; page <= last; page++) { // dflip pages start from 1
        if (preloaded.has(page)) continue;
        preloaded.add(page);
        const img = new Image();
        img.crossOrigin = "anonymous"; // same as dflip , otherwise the cached copy is not reused
        img.src = source[page - 1];
      }
    };

    loadDflip()
      .then(($) => {
        if (cancelled) return;
        app = $(containerRef.current).flipBook(source, {
          is3D: true,
          height: "100%",
          backgroundColor: "transparent",
          showDownloadControl: false,
          showPrintControl: false,
          hideControls: "download,share,print",
        });

        // the lite version ignores the onReady / onPageChanged options , but dflip still calls executeCallback
        // internally on those events , so it is wrapped here (the original still runs , so the paid version keeps working)
        const executeCallback = app.executeCallback.bind(app);
        app.executeCallback = (name) => {
          executeCallback(name);
          if (name === "onReady" || name === "onPageChanged") preloadNearbyPages(app);
        };
      })
      .catch((e) => {
        console.log(e);
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
      app?.dispose?.();
    };
  }, [source]);

  if (error)
    return (
      <div className={`flex justify-center items-center ${className}`}>
        <p className="text-sm">Unable to load the book right now, please try again.</p>
      </div>
    );

  // dflip sets its element's height to 100% , so it is put inside a wrapper whose height is decided by className
  // dflip shows its own loader while the book loads
  return (
    <div className={className}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default FlipBook;
