import { useRef } from "react"


const Marquee = ({List , dir = 0 , width = '600px' , stopOnHover = false, gradientCover = false})=>{
     const animationDuration = 10000*(Math.ceil(List.length/6));
     const marqueeRef1 = useRef();
     const marqueeRef2 = useRef();

     const handleOnMouseEnter = (e)=>{
       marqueeRef1.current.style.animationPlayState = 'paused'; 
       marqueeRef2.current.style.animationPlayState = 'paused'; 
      
     }

     const handleOnMouseLeave = (e)=>{

       marqueeRef1.current.style.animationPlayState = 'running';
       marqueeRef2.current.style.animationPlayState = 'running';
     }

     return <div onMouseEnter = {handleOnMouseEnter} onMouseLeave = {handleOnMouseLeave}  id = 'marquee' style = {{maxWidth:width}} className = 'relative w-full max-w-[750px] m-auto flex flex-nowrap overflow-hidden' >
      <div ref = {marqueeRef1} id = 'marquee-child-1' style = {{animationDuration : `${animationDuration}ms`, animationName: (dir < 0) ? 'marqueeRev' : 'marquee'}} className = 'marquee-child w-fit min-w-100 h-fit flex gap-[2rem] px-5 shrink-0'>
        {
          List.map((each,index)=>{
            return <div className = 'w-fit h-fit' key = {index}>{each}</div>
          })
        }
      </div>
      <div ref = {marqueeRef2} id = 'marquee-child-2' style = {{animationDuration : `${animationDuration}ms`, animationName: (dir < 0) ? 'marqueeRev' : 'marquee'}}  className = 'marquee-child w-fit min-w-100 h-fit flex gap-[2rem] px-5 shrink-0'>
        {
          List.map((each,index)=>{
            return <div className = 'w-fit h-fit' key = {index}>{each}</div>
          })
        }
      </div>
      {
        gradientCover &&  
        <div className = 'w-full h-full absolute top-0 left-0 bg-red-500 scale-110 scale-y-125' style = {{background:'linear-gradient(90deg,rgba(255, 247, 247, 1) 0%, rgba(255, 249, 249, 1) 4%, rgba(255, 255, 255, 0) 22%, rgba(255, 255, 255, 0) 81%, rgba(255, 249, 249, 1) 96%, rgba(255, 247, 247, 1) 100%)'}}>
          {/* gradient cover */}
        </div>
      }
     </div>
  }
export default Marquee
