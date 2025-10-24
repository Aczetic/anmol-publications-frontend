import { NavLink } from "react-router";
import gk1 from '../assets/front_covers/gk1.jpg'; // TODO: the image needs to be fed through api 

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
  
  const Book = ({title = '' , id = '2123456', img = gk1 || ''}) => {
    return (
      <NavLink to={"/book-details/"+id}>
        <div className="bg-white w-15 min-w-25 h-45 md:w-35 md:min-w-35 md:h-60 text-xs lg:text-sm flex flex-col gap rounded-sm overflow-hidden cursor-pointer">
          <div
            className="w-full h-full bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
          <div className="w-full h-10 bg-black truncate px-2 text-center flex items-center">
            {<BookTitleMarquee title={title} />}
          </div>
          <button className="w-full h-fit bg-red-500 text-white p-1 select-none cursor-pointer">
            Know More
          </button>
        </div>
      </NavLink>
    );
  };
  
  const BooksList = ({list = []})=>{
    return (
      <div className="w-full h-fit p-2 md:pl-5 py-3 flex flex-col gap-1 bg-pink-400">
        <div className="text-xl py-2 w-full font-bold">List heading</div>
        {/* book list container */}
        <div className="w-full flex gap-6 md:gap-10 overflow-x-scroll pb-3">
          <Book title = "Knowledge Insights Class 1"/>
          <Book title = "Knowledge Insights Class 2"/>
          <Book title = "Knowledge Insights Class 3"/>
        </div>
      </div>
    );
  }

  export {BookTitleMarquee , Book}
  export default BooksList;