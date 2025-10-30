import { NavLink } from "react-router";
import gk1 from '../assets/front_covers/gk1.jpg'; // TODO: the image needs to be fed through api 
import BookIcon from '@mui/icons-material/MenuBook';

const BookTitleMarquee = ({title = '' })=>{
    const isAnimated = title.length > 15;
  
    return <div id = 'btm' className="w-full flex text-nowrap overflow-x-hidden">
      
       {
       isAnimated ? <>
        <p className = "marquee-title px-3">{title}</p>
        <p className = "marquee-title px-3" >{title}</p>
       </> : <>
        <p className = "w-full text-center">{title}</p>
       </>
      
      }
      
    </div>
  }
  // TODO: empty this later
  const Book = ({title = 'Book Title' , id = '', img = null}) => {
    return (
      <NavLink to={"/book-details/"+id}>
        <div className="bg-white w-15 min-w-25 h-45 md:w-35 md:min-w-35 md:h-60 text-xs lg:text-sm flex flex-col gap rounded-sm overflow-hidden cursor-pointer">
          <div
            className="w-full text-white bg-red-200 flex items-center justify-center h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${img})` }}
          >{img || <BookIcon className = 'm-auto'/>}</div>
          <div className="w-full h-10 bg-black text-white truncate px-2 text-center flex items-center">
            {<BookTitleMarquee title={title} />}
          </div>
          <button className="w-full h-fit bg-red-500 text-white p-1 select-none cursor-pointer">
            Know More
          </button>
        </div>
      </NavLink>
    );
  };
  
  const BooksList = ({list = [] , title = 'List Heading'})=>{
    return (
      <div className="w-full h-fit p-2 md:pl-5 pt-0 pb-3 flex flex-col gap-1">
        <div className="text-xl py-2 w-full font-bold text-black">{title}</div>
        {/* book list container */}
        <div className="w-full flex gap-6 md:gap-10 overflow-x-scroll pb-3">
          {
            list.map((each,index)=>{
              return <Book key = {each.id||index} img = {each.image} title = {each.title} id = {each.id}/>
            })
          }
        </div>
      </div>
    );
  }

  export {BookTitleMarquee , Book}
  export default BooksList;