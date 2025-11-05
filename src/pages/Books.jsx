import { useEffect, useRef, useState } from "react";
import {Swiper , SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import Loader1 from "../components/Loader1";
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import DownIcon from '@mui/icons-material/ExpandCircleDown';
import { NavLink } from "react-router";
import BooksList, { Book } from "../components/BooksList";
import Search from "../components/Search";
import axios from "axios";
import { toast } from "react-toastify";
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AnnouncementIcon from '@mui/icons-material/Campaign';

const Hero = ({announcements=[1,2,4]})=>{
  const [hero,setHero] = useState(()=>window.innerHeight>window.innerWidth?'imageSmall' : 'imageLarge');
  const handleResize = ()=>{console.log('called')
    if(window.innerHeight > window.innerWidth)
      setHero('imageSmall');
    else setHero('imageLarge');
  }
  useEffect(()=>{
    window.addEventListener('resize',handleResize);
    return ()=>window.removeEventListener('resize',handleResize);
  },[])
  return (
    <>
       {announcements.length > 0 && <div // show when there is something to show
        id="hero-parent"
        className="w-full h-full bg-red-50 flex justify-center relative top-1"
      >
        <div data-aos = 'fade-up' className="w-full max-w-[1280px] bg-orange-300 h-full flex items-center">
          <Swiper
            pagination={true}
            loop = {true}
            speed = {800}
                autoplay={{
                    delay:4000,
                    disableOnInteraction:false
                }}
                navigation={{
                    nextEl:'.test-next',
                    prevEl:'.test-prev',
                }}
                modules={[Navigation, Autoplay]}
            className="mySwiper h-100 bg-white w-full"
          >
            {
              announcements.map((_,index)=>{
                return <SwiperSlide key = {index} className="bg-red-100 text-black w-full">
                <div className="w-full h-full text-black bg-cover" style = {{backgroundImage:`url(${_[hero]})`}}>
                  {_.link || <AnnouncementIcon className = 'text-gray-400 m-auto'/>}
                  <NavLink alt = "announcement" to = {_.link} className = 'w-full h-full text-gray-400 flex justify-center items-center'>{hero}</NavLink>
                </div>
              </SwiperSlide>
              })
            }
          </Swiper>
        </div>
      </div>}
    </>
  );
}

const FilterAccordian = ({filters , filterOption, setFilterOption })=>{
  const [open, setOpen] = useState([]);
  
  const handleChange = (e, name, option) => {
    if (e.target.checked) {
      setFilterOption((curr) => [...curr, { name, option }]); // if checked then add it
    } else {
      setFilterOption((curr) => curr.filter((opt) => opt.option !== option)); // if unchecked then remove it
    }
  };

  return (
    <>
      {filters?.map((each, index) => {
        return (
          <div key={index} className="w-full h-fit px-1 pb-1">
            {/* filter option name */}
            <div
              key={index}
              className="p-1 flex justify-between"
              onClick={() =>
                setOpen((curr) => {
                  if (curr.includes(each.name))
                    return curr.filter((e) => e !== each.name);
                  else return [...curr, each.name];
                })
              }
            >
              {/* filter type name */}
              {each.name
                .split("_")
                .map((each) => each[0].toUpperCase() + each.slice(1))
                .join(" ")}{" "}
              <span
                className={`duration-300 transform ${
                  open.includes(each.name) ? "rotate-180" : "rotate-0"
                }`}
              >
                <ArrowDownIcon className="scale-70 bg-black text-white" />
              </span>
            </div>
            {/* options parent*/}
            {open.includes(each.name) && (
              <div className="w-full h-fit flex flex-col bg-white overflow-hidden text-black">
                {each.options.map((option) => {
                  return (
                    // each options
                    <label
                      key={option}
                      className="w-full px-2 flex justify-between items-center hover:bg-red-200 select-none cursor-pointer"
                    >
                      {option}
                      <input
                        type="checkbox"
                        onChange={(e) => handleChange(e, each.name, option)}
                        checked={filterOption.some(
                          (opt) =>
                            opt.name === each.name && opt.option === option
                        )}
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

const Books = () => {
  // TODO: empty this later
  const [data, setData] = useState({
    announcements: [
      {
        imageLarge: "",
        imageSmall: "",
        id: "",
        link: "",
      },{
        imageLarge: "",
        imageSmall: "",
        id: "",
        link: "",
      },
    ],
    booksList: [
      {
        heading : 'List Heading',
        books : [{
          id: "1",
          image: "",
          title: "General Knowledge",
        }],
      },
      {
        heading : 'List Heading',
        books : [
          {
          id: "1",
          image: "",
          title: "General Knowledge",
        },  {
          id: "2",
          image: "",
          title: "General Knowledge",
        },  {
          id: "3",
          image: "",
          title: "General Knowledge",
        }, {
          id: "12",
          image: "",
          title: "General Knowledge",
        },  {
          id: "24",
          image: "",
          title: "General Knowledge",
        },  {
          id: "35",
          image: "",
          title: "General Knowledge",
        }, {
          id: "16",
          image: "",
          title: "General Knowledge",
        },  {
          id: "27",
          image: "",
          title: "General Knowledge",
        },  {
          id: "33",
          image: "",
          title: "General Knowledge",
        }, {
          id: "11",
          image: "",
          title: "General Knowledge",
        },  {
          id: "23",
          image: "",
          title: "General Knowledge",
        },  {
          id: "32",
          image: "",
          title: "General Knowledge",
        }, {
          id: "17",
          image: "",
          title: "General Knowledge",
        },  {
          id: "25",
          image: "",
          title: "General Knowledge",
        },  {
          id: "38",
          image: "",
          title: "General Knowledge",
        }, {
          id: "14564",
          image: "",
          title: "General Knowledge",
        },  {
          id: "256456",
          image: "",
          title: "General Knowledge",
        },  {
          id: "334524",
          image: "",
          title: "General Knowledge",
        }, {
          id: "145245",
          image: "",
          title: "General Knowledge",
        },  {
          id: "2245234",
          image: "",
          title: "General Knowledge",
        },  {
          id: "354345",
          image: "",
          title: "General Knowledge",
        },
      ],
      },
      {
        heading : 'List Heading',
        books : [{
          id: "1",
          image: "",
          title: "General Knowledge",
        }],
      },
    ],
    filters: [
      { name: "book_title", options: ["one", "two", "three"] },
      { name: "subject", options: ["one", "two", "three"] },
      { name: "class", options: ["one", "two", "three"] },
      { name: "latest_release", options: ["one", "two", "three"] },
      { name: "board", options: ["one", "two", "three"] },
  ],
  });
  const [filterOption , setFilterOption] = useState([]);
  const [filterResult , setFilterResult] = useState([ // todo : empty it
    {id:'', title:'Book',image:'',},
    {id:'', title:'Book',image:'',},
    {id:'', title:'Book',image:'',},
    {id:'', title:'Book',image:'',},
    {id:'', title:'Book',image:'',},
    {id:'', title:'Book',image:'',},
]);
  const [filterMobileOpen, setFilterMobileOpen] = useState(false);
 
  useEffect(()=>{
    axios.get(import.meta.env.VITE_SERVER_URL+'/books',{
      withCredentials:true
    }).then(res=>{
      if(res.data.success){
        setData(data)
      }
    }).catch(e=>{
      toast.error('Some error occurred !');
    })
  },[])
  
  useEffect(()=>{
    const controller = new AbortController();

    if(filterOption.length > 0){ // when filters are selected
      axios.post(`${import.meta.env.VITE_SERVER_URL}/filter`,filterOption,{
        headers:{'Content-Type':'application/json'},
        signal:controller.signal,  
      })
      .then(res=>{
        if(res.data.success){
          setFilterResult(res.data)
        }
      })
      .catch(e=>{
        if(e.name !== 'CanceledError')
          toast.error('Some Error occurred !');
      });
    }else if(filterOption.length === 0 && filterResult.length > 0){ // if no filters left then empty the filter result 
      setFilterResult([]);
      setFilterOption([]);
    }
    
    return ()=>controller.abort(); // cancel the previous request if a new one is made
  },[filterOption])
  
  const LoadMoreSettings = useRef({
    page:1
  })
  
  const LoadMore = ()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/books?page=${++(LoadMoreSettings.current.page)}`).
    then(res=>{
      if(res.data.success){
        setData(curr=>{
          return {...curr, booksList:[...curr.booksList , ...res.data.data]}} )
      }
    }).catch(e=>{
       toast.error("Some error occurred!");
    })
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center relative">
      <Search />
      <Hero/>
      <h1 data-aos = 'fade-up' className = 'w-full font-semibold text-4xl text-white md:text-black bg-black md:bg-transparent py-5 md:pt-6 text-center'>Browse Our Books</h1>
      {/* here the books will show up */}
      <div data-aos = 'fade-up' id="main" className="w-full h-fit flex flex-col items-center">
        <div className="w-full max-w-[1480px] flex flex-col md:flex-row 600 h-fit">
          {/* filters */}
          <div className="w-1/6 mt-0 md:mt-3 min-w-[200px] hidden text-sm select-none cursor-pointer md:flex md:flex-col bg-black text-white h-fit">
            <div className="w-full bg-gray-900 flex items-center gap-2 px-1 py-3 font-semibold">
              <SortIcon className="text-red-500" /> Filter Settings
            </div>
            <FilterAccordian
              filters={data.filters}
              setFilterOption={setFilterOption}
              filterOption={filterOption}
            />
          </div>
          <div className="relative w-full min-w-[200px]  md:hidden cursor-pointer bg-black text-white h-fit text-sm">
            <div onClick = {()=>setFilterMobileOpen(!filterMobileOpen)} className="flex justify-between items-center pt-2 pb-1 px-2 bg-gray-900">
              <span>
                <SortIcon className="text-red-400" /> Filter Settings
              </span>
              <DownIcon className={`text-red-400 scale-80 ${filterMobileOpen && 'rotate-180'}`} />
            </div>
            {filterMobileOpen && (
              <FilterAccordian
                filters={data.filters}
                setFilterOption={setFilterOption}
                filterOption={filterOption}
              />
            )}
          </div>

          {/* books drawer */}
          <div className="w-full text-white h-fit">
            {filterResult.length > 0 && filterOption.length > 0 ? (
              <div className="w-full p-5 flex flex-col gap-3">
                <div className="font-semibold text-md mg:text-lg text-black">
                  Filter Result
                </div>
                <div className="w-full h-fit flex flex-wrap gap-10">
                  {filterResult.map((each, index) => (
                    <Book
                      key={each.id || index}
                      title={each.title}
                      id={each.id}
                      image={each.image}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* TODO: provide book info through here */}
                {data.booksList.map((each, index) => {
                  return (
                    <BooksList
                      key={index}
                      title={each.heading}
                      list={each.books}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <button onClick = {LoadMore} className = 'w-full text-sm text-black flex flex-col items-center text-center pb-10 cursor-pointer select-none'>Load More<ArrowDownIcon/></button>
    </div>
  );
}

export default Books
