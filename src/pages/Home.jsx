import { NavLink } from 'react-router';
import heroImage from '../assets/hero.png';
import logo from '../assets/logo.png';
import BooksIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import Marquee from '../components/Marquee.jsx';
import nep_guidelines from '../assets/features/nep_guidelines.jpg';
import ai_powered from '../assets/features/ai_powered.jpg';
import everything from '../assets/features/everything.jpg';
import TestGeneratorIcon from '@mui/icons-material/PrecisionManufacturing';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BotIcon from '@mui/icons-material/SmartToy';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Testimonial from '../components/Testimonials.jsx';
import RightArrowIcon from '@mui/icons-material/East';



// swiper dependencies
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';

//images
import {
  cms,
  dav,
  dps,
  rlb,
  xavier,
  fatima,
  guru_nanak,
  gyandeep,
  holy_cross,
  merci_memorial,
  rose_buds,
  sant_pathik_vidyalaya,
  ss_public_school,
  st_anjani_public_school,
  st_dominic,
  st_francis,
  st_mary_convent,
  st_paul_college,
  st_thomas_college,

} from "../assets/school_logos/school_logos.js";
import contactImages from '../assets/contact_comp/images.js';
import BOOKS from '../constants/BOOKS.js';
import { useEffect, useRef } from 'react';



const School = ({src})=>{
  return <img src = {src} alt = "school-logo" title = "school" className = 'h-[3.5rem] md:h-[5rem]' style = {{mixBlendMode:'multiply'}} loading = "lazy"/>
}


const Features = () => {
  return (
    <div className="flex flex-col gap-10 p-2 w-full items-center overflow-hidden">
      <div data-aos="fade" className="flex flex-col gap-1 p-2">
        <h2 className="font-bold text-3xl text-center"> Features</h2>
        <h2 className="text-sm text-center"> Why we are ahead of others</h2>
      </div>
      <div className="flex flex-col gap-25 w-full p-1 max-w-[400px] md:max-w-[600px] lg:max-w-[800px] items-center">
        <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
          <img
            data-aos="fade-right"
            src={nep_guidelines}
            className="w-full h-50 md:w-45 md:h-55 md:mt-2"
            style={{ objectFit: "cover" }}
            alt="NEP certified books"
            loading="lazy"
          />
          <div className="flex flex-col gap-3 px-2">
            <div data-aos="zoom-out" className="flex flex-col">
              <h2
                data-aos-offset="50"
                className="font-bold text-[1.5rem] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent inline-block"
              >
                NEP-Certified Quality
              </h2>
              <h2 data-aos-offset="50" className="text-sm font-bold">
                Raising the bar with nationally backed education standards.
              </h2>
            </div>
            <div className="flex flex-col gap-3 md:max-w-[450px]">
              <p data-aos="zoom-out" className="text-sm">
                {"We adhere rigorously to India's "} <b>NEP 2020</b> {" standards, ensuring modern, inclusive, and future-ready education."}
              </p>
              {/* the below part is different for every feature */}
              <div data-aos="zoom-out" className="flex flex-col gap-1 w-full">
                <div className="flex gap-1 text-sm">
                  <CheckCircleIcon className="text-green-400" />
                  <p>Learner-centric approach</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <CheckCircleIcon className="text-green-400" />
                  <p>Holistic Education</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <CheckCircleIcon className="text-green-400" />
                  <p>Multilingual Learning</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <CheckCircleIcon className="text-green-400" />
                  <p>Digital Integration</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <CheckCircleIcon className="text-green-400" />
                  <p>5+3+3+4 curriculum structure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* feature 1 ends here  */}
        <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
          <img
            data-aos="fade-left"
            src={ai_powered}
            className="order-0 md:order-2 w-full h-50 md:w-45 md:h-55 md:mt-2"
            style={{ objectFit: "cover" }}
            alt="NEP certified books"
            loading="lazy"
          />
          <div className="flex flex-col gap-3 px-2 md:max-w-[450px]">
            <div data-aos="zoom-out" className="flex flex-col">
              <h2
                data-aos-offset="50"
                className="font-bold text-[1.5rem] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent inline-block"
              >
                Beyond Books: Full Learning Suite
              </h2>
              <h2 data-aos-offset="50" className="text-sm font-bold">
                Everything students need, under one roof.
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <p data-aos="zoom-out" className="text-sm">
                We deliver an advanced, unconventional learning suite blending
                AI tools, digital content, and interactive resources for
                unmatched educational innovation.
              </p>
              {/* the below part is different for every feature */}
              <div data-aos="zoom-out" className="flex flex-col gap-1 w-full">
                <div className="flex gap-1 text-sm">
                  <BooksIcon className="text-green-400" />
                  <p>Textbook – NEP-aligned printed content</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <TestGeneratorIcon className="text-green-400" />
                  <p>AI powered test paper generator</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <BotIcon className="text-green-400" />
                  <p>Chapter-wise chatbot support</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <LaptopChromebookIcon className="text-green-400" />
                  <p>E-book access – Study anywhere</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <CastForEducationIcon className="text-green-400" />
                  <p>LMS app – Track and manage learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* feature 2 ends here */}
        <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
          <img
            data-aos="fade-right"
            src={everything}
            className="w-full h-50 md:w-45 md:h-55 md:mt-2"
            style={{ objectFit: "cover" }}
            alt="NEP certified books"
            loading="lazy"
          />
          <div className="flex flex-col gap-3 px-2 md:max-w-[450px]">
            <div data-aos="zoom-out" className="flex flex-col">
              <h2
                data-aos-offset="50"
                className="font-bold text-[1.5rem] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent inline-block"
              >
                Teacher’s Ally, Classroom Ready
              </h2>
              <h2 data-aos-offset="50" className="text-sm font-bold">
                Tools that empower educators, effortlessly.
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <p data-aos="zoom-out" className="text-sm">
                We empower teachers with customizable content, ready-made
                resources, and practical strategies to deliver engaging,
                NEP-aligned lessons effortlessly.
              </p>
              {/* the below part is different for every feature */}
              <div data-aos="zoom-out" className="flex flex-col gap-1 w-full">
                <div className="flex gap-1 text-sm">
                  <DoneAllIcon className="text-green-400" />
                  <p>Comprehensive Content</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <DoneAllIcon className="text-green-400" />
                  <p>Engaging Illustrations</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <DoneAllIcon className="text-green-400" />
                  <p>Critical Thinking Exercises</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <DoneAllIcon className="text-green-400" />
                  <p>Model Test Papers</p>
                </div>
                <div className="flex gap-1 text-sm">
                  <DoneAllIcon className="text-green-400" />
                  <p>Extra Resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* feature 3 ends here */}
      </div>
    </div>
  );
};

const Book = ({data})=>{
  // TODO: implement the button
   return <div className = 'w-30 h-42 md:w-35 md:h-52 flex flex-col gap-2 p-1'>
        <div className = 'w-full h-35 flex justify-center items-center'>
          <img src = {data.img} alt = {data.name} className = 'w-20 md:w-25 h-full' style = {{objectFit : 'cover', objectPosition:'5% 0'}} loading = "lazy"/>
        </div>
        <div className = 'w-full flex flex-col justify-center items-center gap-1 px-2'>
          <p className = 'text-xs font-bold md:text-sm text-center'>{data.name}</p>
          <button className = 'w-full text-xs md:text-sm py-1 text-white bg-red-500 cursor-pointer select-none rounded-sm'>Read</button>
        </div>
   </div>
}

const OurBooks = ()=>{
  return <div data-aos = 'fade-up' className = 'w-full h-fit mt-[5rem] flex flex-col gap-4'>
      <div data-aos = 'fade' className = 'flex flex-col gap-1 p-2'>
          <h2 className = 'font-bold text-3xl text-center'> Our Books</h2>
          <h2 className = 'text-sm text-center'> Try some books</h2>
      </div>
    <div className = 'w-full flex flex-col gap-15'>
      <Marquee width = '1100px' pauseOnHover = {true}  List = {BOOKS.map((book)=> <Book key = {book.id} data = {book}/> )}/>
      <Marquee width = '1100px' pauseOnHover = {true}  List = {BOOKS.map((book)=> <Book key = {book.id} data = {book}/> )} dir = {-1}/>
    </div>
  </div>
}

const Contact = ()=>{
  const LINES = ["Ugrade your school's learning experience with us" , 
    "Your School. Our Resources. Limitless Potential",
    "Teaching Made Simple. Learning Made Fun",
    "Partner With Us for Academic Excellence",
    "Take the First Step Towards Future-Ready Education"
  ]

   return (
     <div
       data-aos="fade-up"
       className="w-full h-fit mt-[5rem] flex flex-col gap-3"
     >
       <div data-aos="fade" className="flex flex-col gap-1 p-2">
         <h2 className="font-bold text-3xl text-center"> Contact Us</h2>
         <h2 className="text-sm text-center"> Connect With Us</h2>
       </div>
       <div className="w-full bg-red-50 h-150 relative flex items-center justify-center">
         <Swiper
           slidesPerView={1}
           spaceBetween={30}
           effect={"fade"}
           loop={true}
           navigation={false}
           allowTouchMove={false}
           speed={1000}
           autoplay={{
             delay: 4000,
             disableOnInteraction: false,
           }}
           modules={[Autoplay, EffectFade]}
           className="mySwiper w-full h-full overflow-x-hidden m-auto"
         >
           {Object.values(contactImages).map((t, index) => (
             <SwiperSlide
               key={index}
               className="flex items-center justify-center"
             >
               <img
                 src={t}
                 className="w-full h-full"
                 style={{ objectFit: "cover", objectSize: "120%" }}
                 loading="lazy"
                 alt = "CTA background image"
               />
               <div className="w-full z-1000 h-full bg-[#00000095] absolute top-0 left-0 flex justify-center flex-col items-center">
                 <h2
                   data-aos="zoom-out"
                   className="text-white font-bold px-4 md:px-4 text-4xl md:text-6xl w-full lg:w-200 text-center relative bottom-10"
                 >
                   {LINES[index]}
                 </h2>
               </div>
             </SwiperSlide>
           ))}
         </Swiper>
         <button
           data-aos="zoom-in"
           className="breathing bg-black rounded-md text-white px-3 py-1 text-xl absolute bottom-50 z-1000"
         >
           <NavLink to="/contact-us" className="flex items-center gap-1">
             Get In Touch{" "}
             <RightArrowIcon className="right-arrow-nudge scale-[0.8]" />
           </NavLink>
         </button>
       </div>
     </div>
   );
}

const NumCard = ({target , style = {} , className = ''})=>{
  const elemRef = useRef();
  const intervalRef = useRef(null);
  const handleScroll = ()=>{

    const rect = elemRef.current.getBoundingClientRect();
    
    if(rect.top <= window.innerHeight){
      
      window.removeEventListener( 'scroll' , handleScroll); // remove after the element is visible

      let val = 0;
          intervalRef.current = setInterval(()=>{ // start the counter
          val += 1;

          if(val >= target){
             elemRef.current.innerText = target+'+';
             clearInterval(intervalRef.current); // stop the interval
             return;
          }

          elemRef.current.innerText = val;

      },Math.ceil(2000/target))
    }
  }
  useEffect(()=>{
      window.addEventListener('scroll' , handleScroll);
      handleScroll(); // call it when the component has mounted because the top most element cant' detect scroll
      return ()=>{
        clearInterval(intervalRef.current); // this is done to stop the counter when the comp is unmounted before completion
        window.removeEventListener('scroll' , handleScroll);
      }
  })
  return <p ref = {elemRef} className = {className} style = {{style}}></p>
}

const SchoolList = [
  dps, 
  fatima,
  guru_nanak,
  gyandeep,
  holy_cross,
  merci_memorial,
  rose_buds,
  sant_pathik_vidyalaya,
  ss_public_school,
  st_anjani_public_school,
  st_dominic,
  st_francis,
  st_mary_convent,
  st_paul_college,
  st_thomas_college
];

const Home = () => {

  return <>
    <section role = 'banner' id = 'hero' data-aos = 'fade' data-aos-delay = '300' className = 'w-full min-h-[820px] flex flex-col items-center justify-start overflow-x-hidden' style = {{backgroundImage:`url(${heroImage})` , backgroundSize:'cover' , backgroundPosition:'50% 60%'}}>
      
      <div className = 'w-full flex flex-col gap-1 items-center relative border-box top-[4rem] md:top-[5rem]'>
        <h1 data-aos = 'zoom-in' className = 'text-[#ff4141] text-4xl leading-9 md:leading-18 sm:text-[3rem] break-words md:text-[4rem] px-2 text-center'>Anmol Educational Books</h1>
        <h2 data-aos = 'zoom-in' className = 'text-white text-2xl sm:text-[2rem] font-light leading-6 md:leading-8 text-center p-4 md:p-2'>Where Education Meets Excellence</h2>
        <img data-aos = 'fade-up' src = {logo} aria-label = 'Anmol Educational Books logo' alt = 'Anmol Educational Books Logo' className = 'w-18 h-18 md:w-30 md:h-30' loading = "lazy"/>
      </div>
      <div data-aos = 'zoom-out' className = 'w-full text-sm md:text-md max-w-[300px] md:max-w-[500px] h-10 p-2 text-white relative top-[5rem] md:top-[5rem] flex justify-around'> 
        <div className = 'flex flex-col gap-1 text-center'>
          <BooksIcon className = 'm-auto'/>
          <NumCard target = {50} />
          <p className = 'font-extralight'>Books</p>
        </div>
        <div className = 'flex flex-col gap-1 text-center'>
          <SchoolIcon className = 'm-auto'/>
          <NumCard target = {100} />
          <p className = 'font-extralight'>Schools</p>
        </div>
        <div className = 'flex flex-col gap-1 text-center'>
          <SubjectIcon className = 'm-auto'/>
          <NumCard target = {15}/>
          <p className = 'font-extralight'>Subjects</p>
        </div>
      </div>
    </section>
    <div  data-aos = 'fade-up' className = 'w-full min-h-[10rem] h-fit flex flex-col gap-4 mt-[2rem] pt-[2rem] overflow-x-hidden'>
        <div className = 'flex flex-col gap-1 p-2'>
          <h2 className = 'font-bold text-3xl text-center'> Our Partners</h2>
          <h2 className = 'text-sm text-center'> Schools running our books</h2>
        </div>
        {/* todo: attach a hyperlink to the school images to navigate to the school site if it exists or open a google search with school's name */}
          <Marquee gradientCover = {true} List = {SchoolList.map((school,index)=><School key = {index} src = {school}/>)}/>
    </div>
    <div className = 'flex flex-col gap-4 mt-20 px-2'>
    <Features/>
    </div>
    <Testimonial/>
    <OurBooks/>
    <Contact/>
  </>
}

export default Home
