import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {Swiper , SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules"; // may be required for thumbnails below book img
import Loader1 from "../components/Loader1";
import CloseIcon from '@mui/icons-material/Close';
import {BOOKS} from '../assets/front_covers/images.js';
import {amazon , facebook, flipkart, instagram, whatsapp, x} from '../assets/company_icons/images.js';
import BooksList from "../components/BooksList.jsx";
import Search from '../components/Search.jsx';
import BulletIcon from '@mui/icons-material/RadioButtonChecked';
import Rating from "@mui/material/Rating";
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackwardIcon from '@mui/icons-material/ArrowBackIosNew';
 
const {gk1 , gk2, gk3, gk4} = BOOKS;
// TODO : this must come from the db so remove it later
const BOOK_INFO ={
  name: "Knowledge Insights 1",
  bookDetail: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos iusto
  quasi totam molestiae voluptas vitae corrupti obcaecati
  repudiandae, nam modi sit, tenetur ullam blanditiis dicta. Ea iste
  corrupti consequuntur provident quia tempore odio eligendi!
  Reprehenderit velit libero accusantium pariatur et! Earum
  doloribus voluptas nulla fugit sapiente temporibus voluptates
  excepturi ut a eum numquam reprehenderit sed debitis, sit placeat
  repellendus laudantium asperiores soluta, error, nisi possimus
  consectetur. Ipsam eum illum ad quo nesciunt vitae, sapiente
  fugiat iure earum, voluptatem officiis natus iusto facilis.
  Impedit eligendi nemo reprehenderit accusantium consequuntur optio
  dolorem incidunt nesciunt, quas, error omnis. Ipsum maxime ut
  quisquam odit.`,
  seriesName: "Knowledge Insights",
  salientFeatures: [
    "The series guides learners through the seven stages of a brain-based approach to learning. Here is a preview of the various stages the learners are taken through in each chapter:",
    "**Ponder** - aids the **learners in** pre-acquisition of concepts by setting the context, while preparing them to read the text with the aid of the glossary and in-text questions.",
    "**Prepare** - immerses the learners into the context and initiates holistic learning. It helps in the acquisition of newer perspectives through task-based activities.",
    "**Practise** - lays out the canvas for the stage of elaboration, in which the learners analyse and evaluate the text while applying their understanding of it.",
    "**Perfect** - aids memory encoding through drilling of vocabulary and grammar topics. It helps with incubation of concepts.",
    "**Perform** - functions as a confidence check for learners and ensures verification of their performative skills. This stage of summing up allows a functional integration of acquired concepts, leading to a celebration of learning.",
    "**Integrates** Task-based Language (TBL) Learning Approach",
    "Inculates **NEP 2020** Skills",
    "Aligned to Sustainable Development Goals"
  ],
  supportingMaterial: [
    "Teacher’s Support Book",
    "I-book with interactive activities",
    "Fun animations",
    "User-friendly test generator",
    "Printable worksheets",
    "Step-wise detailed solutions",
    "Exciting games",
    "Extensive lesson plans"
  ],
  people : [
    {
      "name": "Evelyn Reed",
      "designation": "Senior Content Developer",
      "about": "A results-driven professional with 8+ years of experience in technical writing and content strategy. Holds a Master’s degree in Communications from Stanford University. Led the documentation team for the launch of three major B2B SaaS platforms. Specializes in transforming complex API documentation into user-friendly guides and tutorials."
    },
    {
      "name": "Marcus Chen",
      "designation": "Creative Writer",
      "about": "A published author and freelance copywriter known for developing engaging narrative content. Graduated Magna Cum Laude with a BA in English Literature. Has written over 50 short stories and contributed articles to several prominent digital magazines. Successfully completed a 12-month intensive fiction writing fellowship."
    },
    {
      "name": "Priya Sharma",
      "designation": "Technical Writer",
      "about": "Expert in developing detailed user manuals and internal process documentation for the financial technology (FinTech) sector. Completed a BSc in Computer Science and a Certification in Technical Writing. Has successfully streamlined documentation processes, reducing onboarding time for new users by 20%."
    },
    {
      "name": "Alexandr Volkov",
      "designation": "UX Content Strategist",
      "about": "Focuses on microcopy and in-app messaging to improve user flow and conversion rates. Holds a degree in Linguistics and Human-Computer Interaction (HCI). Previous roles include driving the voice and tone guidelines for a global e-commerce brand and optimizing CTA language based on A/B testing results."
    },
    {
      "name": "Dr. Sofia Al-Farsi",
      "designation": "Academic Writer",
      "about": "PhD in History with a specialization in 20th-century political movements. Published two peer-reviewed monographs and numerous journal articles. Currently works as a research editor and provides consultative services for academic publishing and grant applications."
    }
  ],
  class: "1", // 0 means not meant for any class
  subject:"General Knowledge",
  language : "English",
  edition: 1,
  publishedBy: 'Anmol Educational Books',
  printedBy: "IMPRESSIONS PRINTING AND PACKAGING LTD",
  publishYear: "2025",
  isbn: "978-81-958453-6-1",
  nepYear: "2020",
  reviews: [
    {
    "name": "Priya L.",
    "stars": 4.0,
    "review": "Outstanding series! It successfully moves beyond simple facts, serving as a true extension of NCF 2023 and NEP guidelines. The inclusion of life skills, quizzes, and stories truly brings general knowledge alive in the classroom. The unit on 'Me and My Surroundings' is perfect for younger grades."
    },
    {
    "name": "Rajesh K.",
    "stars": 4.5,
    "review": "Very impressed with the depth and relevance. The eight pages of updated 'Current Affairs' and the dedicated 'Yog page' are invaluable additions. It is one of the rare series to feature comprehensive verbal and non-verbal reasoning exercises, making it excellent for developing aptitude. Highly recommended for holistic learning."
    },
    {
    "name": "Aisha M.",
    "stars": 4.0,
    "review": "A truly comprehensive and co-scholastic resource. The seven basic units, especially 'Language and Literature' and 'Science and Technology,' are well-structured for the respective age groups. My only suggestion for improvement would be adding a third model test paper for more regular assessment opportunities."
    },
    {
    "name": "Vikas T.",
    "stars": 5.0,
    "review": "This series ensures learning at the initiative of the students, making the content interactive and highly engaging. The focus on connecting knowledge to the student’s life and world is evident in every unit. The 'Mental Maths and Reasoning' section is a powerful tool for cognitive development."
    }
    ],
  images: [gk1 , gk2, gk3 , gk4], // TODO: book image upload
  tags: ['nep','gk' , 'english' , 'general knowledge'], // this helps in book search
  sampleBook: '', // a link to where the books is located
  // TODO: book upload
  buyLink : ''
};



const ImagePresenter = ({ images = [], currentImage = 0, setCurrentImage }) => {
  useEffect(()=>{
    const timeout = setInterval(()=>{
      setCurrentImage(curr=>(curr+1)%images.length)
    },4000);
    return ()=>clearInterval(timeout);
  },[])
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full grow-1 flex items-center justify-center">
        {/* navigation */}
        <div className="absolute m-auto md:m-0 md:top-9/10 w-full flex justify-between md:justify-center md:gap-3">
          <ArrowBackwardIcon
            onClick={() => {
              setCurrentImage(
                (curr) => (curr - 1 + images.length) % images.length
              );
            }}
            className="cursor-pointer selet-none"
          />
          <ArrowForwardIcon
            onClick={() =>
              setCurrentImage((curr) => (curr + 1) % images.length)
            }
            className="cursor-pointer selet-none"
          />
        </div>
        {/* big image */}
        <img
          src={images[currentImage]}
          className="max-h-80 md:max-h-100 object-contain"
        />
      </div>
      <div className="w-full pb-1 flex gap-3 px-2 overflow-x-scroll items-center shrink-0 h-20">
        {images.map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`bg-black m-auto shrink-0 w-13 h-9/10 bg-cover ${currentImage === index && 'outline-4'}`}
              style={{ backgroundImage: `url(${_})` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};  

const FormattedText = ({text})=>{
  
  const ref = useRef(null);
  let textElem = document.createElement('p');
  const text2 = text?.replace(/\*{2}(.*?)\*{2}/g , '<b>$1</b>');
  
  // text = text.split(' ').map((e)=>{
    
  //   if(/^\*{2}.*\*{2}$/.test(e) ){ // if it contains both of them **
  //     console.log(e);  
  //     return '<b>'+e.slice(2,e.length-2)+'</b>'
    
  //   }else if( /^\*{2}/.test(e)){ // if the text starts with **
  //     return '<b>' + e.slice(2);

  //   }else if( /\*{2}$/.test(e) ){ // if the text ends with **
  //     return e.slice(0,e.length-2) + '</b>'
    
  //   }else{
  //     return e;
  //   }
    
  // }) // old logic

  textElem.innerHTML = text2;

  useEffect(()=>{
    ref.current.innerHTML = ''; // empty whatever is present in it already
    ref.current.appendChild(textElem);
  })

  return  <div ref = {ref} className = 'flex gap-2'><BulletIcon className = 'scale-70'/></div>
}

const BookDetails = ()=>{
  const [buyVisible , setBuyVisible] = useState(false);
  const [booksInfo , setBooksInfo] = useState(null); // this is where the books information will reside
  const [currentImage , setCurrentImage ] = useState(0);
  const [infoOption , setInfoOption] = useState('salientFeatures');
  const user = useSelector(state => state.user);
  const rating = (BOOK_INFO.reviews.reduce((a,b)=>{return {stars:a.stars+b.stars} })).stars / BOOK_INFO.reviews.length  

  useEffect(()=>{ // here will go the logic for getting the books details
    setTimeout(()=>{
      setBooksInfo({})
    },500)
  },[])

    return (
      <div className="w-full items-center h-fit min-h-screen flex flex-col">
        {!booksInfo ? (
          <Loader1 className="m-auto scale-[50%]" />
        ) : (
          <>
            {/* search */}
            <div data-aos="fade" className="w-full justify-center">
              <Search />
            </div>
            {/* book details */}
            <div
              data-aos="fade-up"
              className="w-full max-w-[1280px] h-fit flex flex-col md:flex-row gap-0 md:gap-2 py-2 px-1"
            >
              {/* left where the images will be shown*/}
              <div className="w-full md:w-1/3 h-screen max-h-130 flex flex-col">
                <ImagePresenter images = {BOOK_INFO.images} currentImage = {currentImage} setCurrentImage={setCurrentImage}/>
              </div>

              {/* right */}
              <div className="grow-1 text-sm md:text-md lg:text-[1rem] h-screen max-h-fit md:max-h-130 flex flex-col gap-5 md:gap-2 justify-between pt-4 px-3">
                {/* heading region */}
                <div>
                  <h1 className="font-bold text-3xl">Knowledge Insights</h1>
                  <Rating
                    name="half-rating"
                    readOnly
                    value={rating}
                    precision={0.5}
                    style={{ fontSize: "1.1rem" }}
                  />
                </div>

                {/* book details */}
                <p className="h-fit max-h-[7rem] overflow-y-scroll">
                  {BOOK_INFO.bookDetail}
                </p>

                {/* other infos in vertical form */}
                <div className="w-full md:w-2/3 py-2 h-fit max-h-60 overflow-y-scroll flex flex-col gap-2">
                  <div className="w-full grid grid-cols-2">
                    <p className="font-semibold">Subject</p>
                    <p>{BOOK_INFO.subject}</p>
                  </div>

                  <div className="w-full grid grid-cols-2">
                    <p className="font-semibold">Edition</p>
                    <p>
                      {BOOK_INFO.edition +
                        (BOOK_INFO.edition % 10 === 1
                          ? "st"
                          : BOOK_INFO.edition % 10 === 2
                          ? "nd"
                          : BOOK_INFO.edition % 10 === 3
                          ? "rd"
                          : "th")}
                    </p>
                  </div>

                  <div className="w-full grid grid-cols-2">
                    <p className="font-semibold">ISBN</p>
                    <p>{BOOK_INFO.isbn}</p>
                  </div>

                  {BOOK_INFO.people.map((e, i) => {
                    return (
                      <div className="w-full grid grid-cols-2" key={i}>
                        <p className="font-semibold">{e.designation}</p>
                        <p>{e.name}</p>
                      </div>
                    );
                  })}

                  <div className="w-full grid grid-cols-2">
                    <p className="font-semibold">Language</p>
                    <p>{BOOK_INFO.language}</p>
                  </div>

                  {BOOK_INFO.seriesName && (
                    <div className="w-full grid grid-cols-2">
                      <p className="font-semibold">Series</p>
                      <p>{BOOK_INFO.seriesName}</p>
                    </div>
                  )}

                  {BOOK_INFO.class && (
                    <div className="w-full grid grid-cols-2">
                      <p className="font-semibold">Class</p>
                      <p>
                        {BOOK_INFO.class +
                          (BOOK_INFO.class % 10 === 1
                            ? "st"
                            : BOOK_INFO.class % 10 === 2
                            ? "nd"
                            : BOOK_INFO.class % 10 === 3
                            ? "rd"
                            : "th")}
                      </p>
                    </div>
                  )}
                </div>

                {/* other buttons and social media apps buttons */}
                <div className="relative w-full mt-1 flex flex-col justify-around gap-2">
                  <div className="w-full md:w-fit flex gap-2">
                    {/* TODO: implement this button */}
                    <button className="py-2 px-4 text-sm w-full md:w-fit bg-black text-white rounded-sm cursor-pointer select-none">
                      Read Sample
                    </button>
                    {/* TODO: implement this button */}
                    {user?.subscribed && (
                      <button className="py-2 px-4 text-sm w-full md:w-fit bg-black text-white rounded-sm cursor-pointer select-none">
                        Read Full Book
                      </button>
                    )}
                  </div>

                  {/* buying and sharing links */}
                  <div className="w-full mt-2 grid md:grid-cols-[1fr_2fr] gap-4">
                    {/* TODO: these buttons should redirect to the amazon page if they have it  */}
                    <div className="w-full h-fit flex gap-4 items-center">
                      <b>Buy:</b>
                      <div className="w-10 h-10 ml-3 md:ml-0 p-2 bg-gray-100 overflow-hidden flex items-center select-none cursor-pointer rounded-full border-solid border-2 border-black">
                        <img src={amazon} className="w-full h-full" />
                      </div>
                      <div className="w-10 h-10 p-2 bg-gray-100 overflow-hidden flex items-center select-none cursor-pointer rounded-full border-solid border-2 border-black">
                        <img src={flipkart} className="w-full h-full" />
                      </div>
                    </div>

                    {/* TODO: implement how to do sharing   */}
                    <div className="w-full h-fit flex gap-4 items-center">
                      <b>Share:</b>
                      <div className="w-10 h-10 p-2 bg-gray-100 overflow-hidden flex items-center select-none cursor-pointer rounded-full border-solid border-2 border-black">
                        <img src={whatsapp} className="w-full h-full" />
                      </div>
                      <div className="w-10 h-10 p-2 bg-gray-100 overflow-hidden flex items-center select-none cursor-pointer rounded-full border-solid border-2 border-black">
                        <img src={x} className="w-full h-full" />
                      </div>
                      <div className="w-10 h-10 p-2 bg-gray-100 overflow-hidden flex items-center select-none cursor-pointer rounded-full border-solid border-2 border-black">
                        <img src={instagram} className="w-full h-full" />
                      </div>
                      <div className="w-10 h-10 p-2 bg-gray-100 overflow-hidden flex items-center select-none cursor-pointer rounded-full border-solid border-2 border-black">
                        <img src={facebook} className="w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*other information */}
            <div
              data-aos="fade-up"
              className="w-full max-w-[1280px] mt-10 bg-black flex flex-col gap-2 p-2 h-fit text-white "
            >
              {/* options list */}
              {/* TODO : implement this */}
              <div className="w-full justify-around h-10 flex gap-0 rounded-sm overflow-x-scroll">
                <p
                  onClick={() => setInfoOption("people")}
                  className={`w-full max-w-35 md:max-w-full h-full cursor-pointer shrink-0 md:shrink-1 select-none ${
                    infoOption === "people"
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                  } flex items-center justify-center`}
                >
                  About Author
                </p>
                <p
                  onClick={() => setInfoOption("reviews")}
                  className={`w-full max-w-35 md:max-w-full h-full cursor-pointer shrink-0 md:shrink-1 select-none ${
                    infoOption === "reviews"
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                  } flex items-center justify-center`}
                >
                  Reviews
                </p>
                <p
                  onClick={() => setInfoOption("salientFeatures")}
                  className={`w-full max-w-35 md:max-w-full h-full cursor-pointer shrink-0 md:shrink-1 select-none ${
                    infoOption === "salientFeatures"
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                  } flex items-center justify-center`}
                >
                  Salient Features
                </p>
                <p
                  onClick={() => setInfoOption("supportingMaterial")}
                  className={`w-full max-w-45 md:max-w-full h-full cursor-pointer shrink-0 md:shrink-1 select-none ${
                    infoOption === "supportingMaterial"
                      ? "bg-red-500 text-white"
                      : "bg-white text-black"
                  } flex items-center justify-center`}
                >
                  Supporting Material
                </p>
              </div>
              {/* options data */}
              <div className="flex overflow-y-scroll h-80 w-full bg-white text-black">
                <div className="w-full h-fit flex flex-col gap-3 list-disc list-inside p-3">
                  {infoOption === "people"
                    ? BOOK_INFO[infoOption].map((each, index) => (
                        <span key={index} className="flex flex-col gap-1">
                          <b>
                            {each.designation} - {each.name}
                          </b>
                          <FormattedText text={each.about} />
                        </span>
                      ))
                    : infoOption === "reviews"
                    ? BOOK_INFO[infoOption].map((each, index) => (
                        <span key={index} className="flex flex-col">
                          <b>
                            {each.name}
                          </b>
                          <Rating
                            name="half-rating"
                            readOnly
                            value={each.stars}
                            precision={0.5}
                            style={{ fontSize: "1rem" }}
                          />
                          <FormattedText text={each.review} />
                        </span>
                      ))
                    : BOOK_INFO[infoOption].map((each, index) => (
                        <span key={index} className="flex gap-2">
                          <BulletIcon className="scale-60" />
                          <FormattedText text={each} />
                        </span>
                      ))}
                </div>
              </div>
            </div>
            {/* TODO: implement this  */}
            {/* you may also like or similar */}
            <div
              data-aos="fade-up"
              className="w-full max-w-[1280px] mt-15 h-fit flex flex-col"
            >
              <BooksList title="Others in Series" />
              <BooksList title="Latest Releases" />
            </div>
          </>
        )}
      </div>
    );
}

export default BookDetails;