import { useState } from "react";
import {Swiper , SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import Loader1 from "../components/Loader1";
import CloseIcon from '@mui/icons-material/Close';
import SortIcon from '@mui/icons-material/Sort';
import DownIcon from '@mui/icons-material/ExpandCircleDown';
import { NavLink } from "react-router";
import BooksList from "../components/BooksList";
import Search from "../components/Search";


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
