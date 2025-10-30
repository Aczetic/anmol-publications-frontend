import { useEffect, useRef } from "react";


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

  export default NumCard;