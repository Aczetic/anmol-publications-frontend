import { useState } from "react";
import { useSelector } from "react-redux";
import {Swiper , SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules"; // may be required for thumbnails below book img
import Loader1 from "../components/Loader1";
import CloseIcon from '@mui/icons-material/Close';
import gk1 from '../assets/front_covers/gk1.jpg';
import {amazon , facebook, flipkart, instagram, whatsapp, x} from '../assets/company_icons/images.js';

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
    "Ponder - aids the learners in pre-acquisition of concepts by setting the context, while preparing them to read the text with the aid of the glossary and in-text questions.",
    "Prepare - immerses the learners into the context and initiates holistic learning. It helps in the acquisition of newer perspectives through task-based activities.",
    "Practise - lays out the canvas for the stage of elaboration, in which the learners analyse and evaluate the text while applying their understanding of it.",
    "Perfect - aids memory encoding through drilling of vocabulary and grammar topics. It helps with incubation of concepts.",
    "Perform - functions as a confidence check for learners and ensures verification of their performative skills. This stage of summing up allows a functional integration of acquired concepts, leading to a celebration of learning.",
    "Integrates Task-based Language (TBL) Learning Approach",
    "Inculates NEP 2020 Skills",
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
  class: "1", // 0 means not meant for any class
  subject:"General Knowledge",
  language : "English",
  edition: 1,
  publishedBy: 'Anmol Educational Books',
  printedBy: "IMPRESSIONS PRINTING AND PACKAGING LTD",
  publishYear: "2025",
  isbn: "978-81-958453-6-1",
  nepYear: "2020",
  people: [
    {
      designation : "Content Developer",
      name: "Tarun Kumar Singh"
    },
  ],
  reviews: [
    {
    "stars": 5,
    "description": "This series excels beyond simple Q&A. It perfectly aligns with NEP and NCF guidelines, making general knowledge come alive with quizzes, activities, and life skills integration. The structure is comprehensive, covering everything from 'Me and My Surroundings' to 'Mental Maths.' A truly delightful and engaging study resource."
    },
    {
    "stars": 5,
    "description": "Knowledge Insights is a comprehensive co-scholastic treasure for classes 1-8. The division into seven fundamental units, like 'Exploring India and World' and 'Science and Technology,' ensures wide exposure. I especially appreciate the inclusion of eight pages of updated Current Affairs and the Yog section. Highly recommended for holistic development."
    },
    {
    "stars": 4,
    "description": "Finally, a General Knowledge series that focuses on active learning! The integration of verbal and non-verbal reasoning exercises, along with the mind aptitude unit, is rare and incredibly valuable. This approach ensures learning comes from the learner's initiative, making it exciting and closely related to their world. A fantastic educational tool."
    }
    ],
  images: [gk1], // TODO: book image upload
  tags: ['nep','gk' , 'english' , 'general knowledge'], // this helps in book search
  sampleBook: '', // a link to where the books is located
  // TODO: book upload
  buyLink : ''
};

const Search = () => {
    const [searchText , setSearchText] = useState('');
    const [searchResult , setSearchResult] = useState([]);
    return (
      <div
        id="search"
        className="w-full z-100 bg-black flex flex-col items-center justify-center h-fit p-3 relative top-1"
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
          <div className = 'w-full flex flex-col justify-center gap-2 text-gray'>
            {
              searchResult.length > 0 ? 
              searchResult.map((_,index)=><div className = 'w-full px-3'>{_}</div>)
              : <Loader1 className = 'w-20 m-auto'/>
            }
          </div>
        </div>}
      </div>
    );
  };

const ImagePresenter = ({images = []})=>{
    const [currentImage , setCurrentImage ] = useState(0);

    return <div className = 'w-full h-full flex flex-col'>
       <div className = ' w-full grow-1 flex items-center justify-center'>
          <img src = {gk1}  className = 'max-h-80 md:max-h-100 object-contain'/>
       </div>
       <div className = 'bg-red-500 w-full flex gap-3 overflow-x-scroll justify-center items-center shrink-0 h-20'>
         {
          new Array(10).fill(0).map((_,index)=>{
            return <div className = 'bg-black shrink-0 w-10 h-15'></div>
          })
         }
       </div>
    </div>

}  

const BookDetails = ()=>{
  const [buyVisible , setBuyVisible] = useState(false);
  const [infoOption , setInfoOption] = useState('Reviews');
  const user = useSelector(state => state.user);
    
    return (
      <div className="w-full items-center h-fit min-h-screen flex flex-col">
        {/* search */}
        <div className="w-full justify-center">
          <Search />
        </div>
        {/* book details */}
        <div className="w-full max-w-[1280px] h-fit flex flex-col md:flex-row gap-0 md:gap-2 py-2">
          {/* left where the images will be shown*/}
          <div className="w-full md:w-1/3 h-screen max-h-130 flex flex-col">
            <ImagePresenter />
          </div>
          {/* right */}
          <div className="grow-1 text-sm md:text-md lg:text-[1rem] h-screen max-h-fit md:max-h-130 flex flex-col gap-5 md:gap-0 justify-between pt-4 px-3">
            {/* heading region */}
            <div>
              <h1 className="font-bold text-3xl">Knowledge Insights</h1>
              <div>{/* here will go the reviews / stars */}</div>
            </div>
            {/* book details */}
            <p className="h-fit max-h-[8rem] overflow-y-scroll">
              {BOOK_INFO.bookDetail}
            </p>
            {/* other infos in vertical form */}
            <div className="w-full md:w-2/3 h-fit max-h-60 overflow-y-scroll flex flex-col gap-2">
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
            <div className="relative w-full flex flex-col gap-3">
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
        {/*other options */}
        <div className="w-full max-w-[1280px] mt-10 bg-black mb-10 flex flex-col gap-2 p-2 h-fit text-white ">
          {/* options list */}
          {/* TODO : implement this */}
          <div className="w-full justify-around h-10 flex gap-0 rounded-sm overflow-x-scroll">
            <p
              onClick={() => setInfoOption("About Author")}
              className={`w-full max-w-35 md:max-w-full h-full cursor-pointer shrink-0 md:shrink-1 select-none ${
                infoOption === "About Author"
                  ? "bg-red-500 text-white"
                  : "bg-white text-black"
              } flex items-center justify-center`}
            >
              About Author
            </p>
            <p
              onClick={() => setInfoOption("Reviews")}
              className={`w-full max-w-35 md:max-w-full h-full cursor-pointer shrink-0 md:shrink-1 select-none ${
                infoOption === "Reviews"
                  ? "bg-red-500 text-white"
                  : "bg-white text-black"
              } flex items-center justify-center`}
            >
              Reviews
            </p>
            <p
              onClick={() => setInfoOption("Salient Features")}
              className={`w-full max-w-35 md:max-w-full h-full cursor-pointer shrink-0 md:shrink-1 select-none ${
                infoOption === "Salient Features"
                  ? "bg-red-500 text-white"
                  : "bg-white text-black"
              } flex items-center justify-center`}
            >
              Salient Features
            </p>
            <p
              onClick={() => setInfoOption("Supporting Material")}
              className={`w-full max-w-45 md:max-w-full h-full cursor-pointer shrink-0 md:shrink-1 select-none ${
                infoOption === "Supporting Material"
                  ? "bg-red-500 text-white"
                  : "bg-white text-black"
              } flex items-center justify-center`}
            >
              Supporting Material
            </p>
          </div>
          {/* options data */}
          <div className="flex justify-center items-center h-80 w-full bg-green-500">
            {infoOption}
          </div>
        </div>
        {/* TODO: implement this  */}
        {/* you may also like or similar */}
        <div className="w-full"></div>
      </div>
    );
}

export default BookDetails;