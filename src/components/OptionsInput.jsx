import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ErrorIcon from '@mui/icons-material/Error';

// TODO: in the validation only the options selected from the list will be considered valid 
// TODO: selecting an option for the state list will always reset the city list
// NOTE** : onBlur the input should get cleared if nothing selected from list

//-----------CUSTOM PARAMS---------------------
//options(required)  : the list of options which will show in selectable list 
//filter(required)   : a function to filter the options
// setValue(required): for setting the value and performing some other options. It is not RHFs setValue but augmented
// inputProps        : props for the input to directly sprread


const OptionsInput = React.forwardRef(({ options , filter, inputProps,setValue, onChange, onBlur, name} , ref) => {
  const [onFocus, setOnFocus] = useState(false);
  const timeoutRef = useRef(null);

  const [data, setData] = useState({state : 'idle', data :null});
    
    // send request only when idling and options is url string 

      if (data.state === 'idle' && typeof options === "string" && options.includes("https://")) {
  
        setData({state:'loading',data:'loading...'})
        
        // clear the previous request if within 500ms (debouncing) 
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {

          axios
            .get(options)
            .then((res) => {
              // when the validation error occurs
              if (res.status === 200 && res.data.status === false) {
                const resp = res.data?.error?.errorDetails?.details;

                      if (resp.includes("Data Not Found")) {
                        setData({
                          state: "data",
                            // just add the given text as a school name when this error happens
                          data: [resp.slice(resp.indexOf(":") + 1).toUpperCase()],
                        });
                        return;
                      } else { // other validation errors
                        setData({
                          state: "error",
                          data: res.data?.error?.errorDetails?.details,
                        });
                      }
                // when data returns   
              } else if (res.status === 200) {
                setData({state:'data',data:[...(res.data.data.map((each) => {
  
                  const name = each['keyword'];
                  return name.slice(0,name.indexOf('(')) + name.slice( name.indexOf('|', name.indexOf('|')+1) )
  
                  })), res.config.url.slice(res.config.url.lastIndexOf("=")+1).toUpperCase()]

                });
              }
            })
            .catch((e) => {
              setData({
                state: "data",
                  // just add the given text as a school name when any error happens because the school api is optional
                data: [e.config.url.slice(e.config.url.lastIndexOf("=")+1).toUpperCase()],
              });
            })

        }, 500);
      }
    



  return (
    <>
      <input
        id = {name}
        ref={ref}
        name={name}
        defaultValue=""
        {...inputProps}
        onFocus={() => {
          setOnFocus(true);
        }}
        onBlur={(e) => {
          setOnFocus(false); // to close the list

          setTimeout(() => {
            onBlur(e);
            if (
              // if the text inside input is not within list/options reset input --- for non link options
              !options.includes(e.target.value) ||
              // or if the text inside the input is not within the resp list -- for link options or when opt is url but state is not data
              (options.includes("https://") && ( ! data.data.includes(e.target.value) ))
            ){
              setValue("");
            }
            // reset the state 
            setData({state: "idle",data:[]});

          }, 100);
        }}
        // reset state to idle to allow making another request as the input changes
        onChange={(e) => {
          setData({ state:"idle" , data:[] });
          onChange(e);
        }}
        autoComplete = "false"
      />

      {onFocus &&
        // only when on focus that's why '('
        (Array.isArray(options) ? (
          <div className="no-scrollbar w-full h-fit max-h-30 flex flex-col gap-[1px] overflow-y-scroll absolute top-[108%] z-100 left-0 bg-[#ddbbbb] rounded-sm">
            {options
              .filter((opt) => filter(opt))
              .map((opt, index) => {
                return (
                  <div
                    key={index}
                    onMouseDown={() => {
                      setValue(opt);
                    }}
                    className="w-full bg-[#faeeee] p-1 font-normal text-xs text-red-800"
                  >
                    {opt}
                  </div>
                );
              })}
          </div>
        ) : typeof options === "string" && !options.includes("https://") ? (
          <div className="w-full absolute top-[107%] z-100 rounded-sm bg-[#faeeee] p-1 font-normal text-xs text-red-800">
            {options}
          </div>
        ) : (
          <>
            {data.state === "loading" || data.state === "error" ? (
              <div className="w-full absolute top-[107%] rounded-sm z-100 bg-[#faeeee] p-1 font-normal text-xs text-red-800">
                {data.data}
              </div>
            ) : (
              data.state === "data" && (
                <div className="no-scrollbar w-full h-fit max-h-30 flex flex-col gap-[1px] overflow-y-scroll absolute top-[108%] z-100 left-0 bg-[#ddbbbb] rounded-sm">
                  {data.data.filter((opt) => filter(opt))
                    .map((opt, index) => {
                      return (
                        <div
                          key={index}
                          onMouseDown={() => {
                            setValue(opt);
                          }}
                          className="w-full bg-[#faeeee] p-1 font-normal text-xs text-red-800"
                        >
                          {opt}
                        </div>
                      );
                    })}
                </div>
              )
            )}
          </>
        ))}
    </>
  );
});

export default OptionsInput;


// filter :
/*
  Why the functions approach so that you can choose how you want the filter to happen
  like in my case CITIES was an object so I need first the get state object then within
  that state would be cities array

  but in STATE which is itself an array I would not have to go do selection
  See in sign up page for yourself 
*/