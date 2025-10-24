import { useState } from "react";
import {Swiper , SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import Loader1 from "../components/Loader1";
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import DownIcon from '@mui/icons-material/ExpandCircleDown';
import { NavLink } from "react-router";
import BooksList from "../components/BooksList";

// const BookTitleMarquee = ({title = ''})=>{
//   const isAnimated = title.length > 15;

//   return <div id = 'btm' className="w-full flex text-nowrap overflow-x-hidden">
    
//      {
//      isAnimated ? <>
//       <p className = "marquee-title px-3">{title}</p>
//       <p className = "marquee-title px-3" >{title}</p>
//      </> : <>
//       <p className = "w-full text-center">{title}</p>
//      </>
    
//     }
    
//   </div>
// }

// const Book = ({title = ''}) => {
//   return (
//     <NavLink to="/book-details/123232">
//       <div className="bg-white w-15 min-w-25 h-45 md:w-35 md:min-w-35 md:h-60 text-xs lg:text-sm flex flex-col gap rounded-sm overflow-hidden cursor-pointer">
//         <div
//           className="w-full h-full bg-cover bg-no-repeat bg-center"
//           style={{ backgroundImage: `url(${gk1})` }}
//         ></div>
//         <div className="w-full h-10 bg-black truncate px-2 text-center flex items-center">
//           {<BookTitleMarquee title={title} />}
//         </div>
//         <button className="w-full h-fit bg-red-500 text-white p-1 select-none cursor-pointer">
//           Know More
//         </button>
//       </div>
//     </NavLink>
//   );
// };

// const BookList = ()=>{
//   return (
//     <div className="w-full h-fit p-2 md:pl-5 py-3 flex flex-col gap-1 bg-pink-400">
//       <div className="text-xl py-2 w-full font-bold">List heading</div>
//       {/* book list container */}
//       <div className="w-full flex gap-6 md:gap-10 overflow-x-scroll pb-3">
//         <Book title = "Knowledge Insights Class 1"/>
//         <Book title = "Knowledge Insights Class 2"/>
//         <Book title = "Knowledge Insights Class 3"/>
//       </div>
//     </div>
//   );
// }

const Search = () => {
  const [searchText , setSearchText] = useState('');
  const [searchResult , setSearchResult] = useState([]);
  return (
    <div
      id="search"
      className="w-full bg-black flex flex-col items-center justify-center h-fit p-3 relative top-1"
    >
      {/* search form */}
      <form className="w-full max-w-[1280px] flex gap-3 relative text-xs md:text-sm">
        <input
          value = {searchText}
          onChange = {(e)=>setSearchText(e.target.value)}
          className="w-full bg-red-100 px-2 truncate md:px-3 rounded-sm outline-0 focus:outline-3 focus:outline-red-500"
          placeholder="Search book by Title , Subject , Class"
        />
        {searchText && <CloseIcon onClick = {()=>setSearchText('')} className = 'text-red-800 absolute right-22 md:right-24 self-center scale-70'/>}
        <button className="px-5 py-1 bg-red-500 text-white rounded-sm cursor-pointer select-none">
          Search
        </button>

      </form>
      {/* search results */}
      {searchText && <div className = ' absolute top-[54px] z-100 w-full max-w-[1280px] bg-red-50 h-fit flex shadow-2xl'>
        <div className = 'w-full flex justify-center items-center text-white'>
          {
            searchResult.length > 0 ? 
            searchResult.map((_,index)=><p>"dfd"</p>)
            : <Loader1 className = 'w-20'/>
          }
        </div>
      </div>}
    </div>
  );
};

const Hero = ()=>{
  return (
    <>
       <div
        id="hero-parent"
        className="w-full h-full bg-red-50 flex justify-center relative top-1"
      >
        <div className="w-full max-w-[1280px] bg-orange-300 h-full flex items-center">
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
              new Array(5).fill(5).map((_,index)=>{
                return <SwiperSlide key = {index} className="bg-red-500 w-full">
                <div className="w-full h-full text-white flex justify-center items-center">
                  Slide {index+1}
                </div>
              </SwiperSlide>
              })
            }
          </Swiper>
        </div>
      </div>
    </>
  );
}

const Books = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center relative">
      <Search />
      <Hero/>
      {/* here the books will show up */}
      <div id="main" className="w-full h-fit flex flex-col items-center ">
        <div className="w-full max-w-[1480px] flex flex-col md:flex-row bg-orange-600 h-fit">
          {/* filters */}
          <div className = 'w-1/6 min-w-[200px] hidden md:flex bg-blue-500 h-100'></div>
          <div className = 'relative w-full min-w-[200px]  md:hidden bg-red-50 h-fit p-2 flex justify-between items-center text-sm gap-1'>
            <div><SortIcon className = 'text-red-500'/> Filter Settings</div>
            <DownIcon className = 'text-red-400 scale-80'/>
          </div>

          {/* books drawer */}
          <div className ='w-full text-white md:w-5/6 bg-black h-fit'>
          {/* TODO: provide book info through here */}
           <BooksList/>
           <BooksList/>
           <BooksList/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books
