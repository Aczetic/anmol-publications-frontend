import { NavLink } from "react-router";
import BookIcon from '@mui/icons-material/MenuBook';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useRef } from "react";

const BookTitleMarquee = ({title = '' , offset = 15 , speed = 5 , className = ''})=>{ // offset is the trigger for when to animate ( in char count)
    const isAnimated = title.length > offset;
  
    return <div id = 'btm' className="w-full flex text-nowrap overflow-x-hidden shrink-0">
      
       {
       isAnimated ? <>
        <p className = "marquee-title px-3" style = {{animationDuration:speed+'s'}} >{title}</p>
        <p className = "marquee-title px-3" style = {{animationDuration:speed+'s'}} >{title}</p>
       </> : <>
        <p className = {className || "w-full text-center"} >{title}</p>
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
    const ref = useRef(null);
    const scrollLeft = ()=>{
      const scrollTo = window.innerWidth + ref.current.scrollLeft - 200;
      ref.current.scroll(scrollTo,0);
    }
    const scrollRight = ()=>{
      const scrollTo = ref.current.scrollLeft - window.innerWidth + 200;
      ref.current.scroll(scrollTo,0);
    }
    return (
      <div className="w-full md:max-w-[calc(100vw_-_240px)] h-fit p-2 md:pl-5 pt-0 pb-3 flex flex-col gap-1">
        <div className="text-xl flex items-center gap-4 py-2 w-full font-bold text-black">
          {title}
          {window.innerWidth > window.innerHeight && (
            <>
              <ArrowCircleLeftIcon onClick={scrollRight}/>
              <ArrowCircleRightIcon onClick={scrollLeft}/>
            </>
          )}
        </div>
        {/* book list container */}
        <div
          ref={ref}
          className="w-full flex gap-6 md:gap-10 overflow-x-scroll pb-3 scroll-smooth"
        >
          {list.map((each, index) => {
            return (
              <Book
                key={each.id || index}
                img={each.image}
                title={each.title}
                id={each.id}
              />
            );
          })}
        </div>
      </div>
    );
  }

  export {BookTitleMarquee , Book}
  export default BooksList;