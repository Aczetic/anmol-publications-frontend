import { useEffect, useRef, useState } from "react";
import Loader1 from "../components/Loader1";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { toast } from "react-toastify";
import {BOOKS} from '../assets/front_covers/images.js';
import { BookTitleMarquee } from "./BooksList";
import { NavLink } from "react-router";

const SearchResultsSchema = [
  {
    id:'234324',
    name:'General Knowledge Book hello world h',
    bookDetail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos debitis temporibus esse provident. Nobis cupiditate eligendi error ex enim modi! Qui recusandae, provident beatae doloremque delectus molestias veritatis dolores, repellendus eveniet labore praesentium illo aperiam nisi rerum perferendis consectetur voluptate unde! Dolorem maiores earum dolores obcaecati rerum porro beatae.',
    subject:"General Knowledge",
    language:"English",
    edition:1,
    class:8,
    image:BOOKS.gk1
  },
  {
    id:'2343224',
    name:'General Knowledge Book hello world h',
    bookDetail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos debitis temporibus esse provident. Nobis cupiditate eligendi error ex enim modi! Qui recusandae, provident beatae doloremque delectus molestias veritatis dolores, repellendus eveniet labore praesentium illo aperiam nisi rerum perferendis consectetur voluptate unde! Dolorem maiores earum dolores obcaecati rerum porro beatae.',
    subject:"General Knowledge",
    language:"English",
    edition:1,
    class:8,
    image:BOOKS.gk2
  }
] // todo: remove it later

const ResultCard = ({data = {

} , onClick = null})=>{
  const [update, setUpdate] = useState(false);// ---------------------------------------------
  useEffect(()=>{                                                                        //  |
    const EL = ()=>{setUpdate(!update)};                                                 //  | This is to for setting the title text in 
    window.addEventListener('resize' , EL);                                              //  | result card animated or static on resize
    return ()=>window.removeEventListener('resize',EL);                                  //  |                  
  },[])//-------------------------------------------------------------------------------------

  return <NavLink onClick = {onClick} to = {'/book-details/'+data.id} className = 'w-full h-fit bg-red-50 flex gap-2 p-2 md:px-4 cursor-pointer'>
      <div className = 'w-20 shrink-0 h-full'>
        <img src = {data.image} className = 'h-full'/>
      </div>
      <div className = 'flex flex-col w-[90%] font-semibold text-black overflow-x-hidden'>
        <BookTitleMarquee title = {data.name} offset = {window.innerWidth / 12} speed = {10} className = 'w-full truncate'/>
        <p className = 'w-full text-xs md:text-sm text-nowrap truncate shrink-0 font-normal'>{data.bookDetail}</p>
        <div className = 'w-full h-full text-black flex flex-col'>
          <span className = 'text-xs md:text-sm grid grid-cols-[10%_2%_88%]'>
            <p className = 'font-semibold'>Subject</p>:<p className = 'font-normal'>{data.subject}</p>
            <p className = 'font-semibold'>Language</p>:<p className = 'font-normal'>{data.language}</p>
            <p className = 'font-semibold'>Class</p>:<p className = 'font-normal'>{data.class}</p>
          </span>
        </div>
      </div>
  </NavLink>
}


const Search = () => {
    const [searchText , setSearchText] = useState('');
    const [searchResult , setSearchResult] = useState([]);
    const [inFocus , setInFocus] = useState(false);

    const handleSearch = ()=>{
      axios.get(`${import.meta.env.VITE_SERVER_URL}/books/search?q=${searchText}`).
      then(res=>{
          if(res.data.success){
              setInFocus(true);
              setSearchResult(res.data.data);
            }
          }).catch(e=>{
            toast.error('Some error occurred');
            setSearchText('');
          })
    }

    useEffect(()=>{
      let timeout = null;

      if(searchText !== ''){

        timeout = setTimeout(()=>{

          axios.get(`${import.meta.env.VITE_SERVER_URL}/books/search?q=${searchText}`).
         
          then(res=>{
            if(res.data.success){
              setSearchResult(res.data.data);
            }
          }).catch(e=>{
            toast.error('Some error occurred');
            setSearchText('');
          })

        },500)
      }else{
        setSearchResult([]);
      }

      return ()=>{clearTimeout(timeout)}
    },[searchText])

    return (
      <div
        data-aos="fade"
        id="search"
        className="w-full bg-black flex flex-col items-center justify-center h-fit p-3 relative top-1 z-500"
      >
        {/* search form */}
        <form onSubmit = {(e)=>{e.preventDefault();handleSearch()}} className="w-full max-w-[1280px] flex gap-3 relative text-xs md:text-sm">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setInFocus(true)}
            onBlur={() => setTimeout(() => setInFocus(false), 100)}
            // a slight delay in blurring is done so that the link click can happen otherwise the blur is triggering before the click
            className="w-full bg-red-100 px-2 truncate md:px-3 rounded-sm outline-0 focus:outline-3 focus:outline-red-500"
            placeholder="Search book by Title , Subject , Class"
          />
          {searchText && (
            <CloseIcon
              onClick={() => setSearchText("")}
              className="text-red-800 absolute right-22 md:right-24 self-center scale-70"
            />
          )}
          <button className="px-5 py-1 bg-red-500 text-white rounded-sm cursor-pointer select-none">
            Search
          </button>
        </form>
        {/* search results */}
        {searchText && (
          <div className=" absolute top-[54px] z-3000 w-full max-w-[1280px] bg-red-50 h-fit flex shadow-2xl">
            <div className="w-full flex flex-col justify-center items-center text-white bg-white gap-[0.2rem]">
              {searchResult.length > 0 ? (
                inFocus &&
                searchResult.map((data, index) => (
                  <ResultCard
                    onClick={() => {
                      setSearchText("");
                    }}
                    key={data.id}
                    data={data}
                  />
                ))
              ) : (
                <Loader1 className="w-20" />
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Search;