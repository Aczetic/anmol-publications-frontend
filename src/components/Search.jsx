import { useState } from "react";
import Loader1 from "../components/Loader1";
import CloseIcon from '@mui/icons-material/Close';


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

  export default Search;