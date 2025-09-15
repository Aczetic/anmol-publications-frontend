import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import Rating from '@mui/material/Rating';
import TESTIMONIALS from '../constants/TESTIMONIALS.js';
import PrevIcon from '@mui/icons-material/ArrowBackIosNew';
import NextIcon from '@mui/icons-material/ArrowForwardIos';


const Testimonial = ({data})=>{
    return <div className = 'border-3 border-solid border-red-100 rounded-sm w-full max-w-[600px] h-fit m-auto cursor-grabbing'>
        <div className = 'w-full h-full min-h-55 flex flex-col justify-between'>
            <div className = 'flex gap-2 w-full bg-red-100 h-[5rem] px-3 py-1 justify-start items-center'>
                <img src = {data.img} className = 'w-10 h-10 rounded-full border-solid border-3 border-red-400' style = {{objectFit : 'cover'}}/>
                <div className = 'flex flex-col text-xs'>
                    <div className = 'flex gap-1'>
                        <p className = 'font-bold'>{data.name},</p>
                        <p>{data.designation}</p>
                    </div>
                    <p className = 'italic'>{data.location}</p>
                </div>
            </div>
            <p className = 'text-sm p-3 bg-red-50 grow-1'>
                {data.review}
            </p>
            <div className = 'w-full p-2 text-sm bg-red-50'>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} style = {{fontSize:'1.1rem'}}/>
            </div>
        </div>
    </div>
}

function Testimonials() {
    //TODO:this should come from an api request
  return (
    <>
    <div data-aos = 'fade-up' className = 'w-full h-fit flex flex-col gap-4 px-2 mt-25'>
        <div data-aos = 'fade' className = 'flex flex-col gap-1 p-2'>
            <h1 className = 'font-bold text-3xl text-center'> Testimonials</h1>
            <h2 className = 'text-sm text-center'> {"Don't Listen to us. See what our clients are saying"}</h2>
        </div>
        <div className = 'w-full h-fit'>
            <Swiper
        
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
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
                className="mySwiper w-full max-w-[600px] overflow-x-hidden m-auto"
            >
                {
                    TESTIMONIALS.map((t)=><SwiperSlide key = {t.id} >
                        <Testimonial data = {t}/>
                    </SwiperSlide>)
                }
            </Swiper>
            <div className = 'flex gap-2 w-full justify-center p-3'>
                <button className = 'test-prev text-red-300 bg-red-50 rounded-full p-2 border-1 border-solid border-red-400 cursor-pointer'><PrevIcon/></button>
                <button className = 'test-next text-red-300 bg-red-50 rounded-full p-2 border-1 border-solid border-red-400 cursor-pointer'><NextIcon/></button>
            </div>
        </div>
    </div>
    </>
  );
}

export default Testimonials;
