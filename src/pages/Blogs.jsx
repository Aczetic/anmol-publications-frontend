import React, { useEffect, useRef } from 'react'
import coming_soon_img from '../assets/coming_soon.jpeg';
import coming_soon_mobile_img from '../assets/coming_soon_mobile.jpeg';

const Blogs = () => {
  const ref = useRef(null);
  const listener = ()=>{
    const img = window.innerHeight > window.innerWidth ? coming_soon_mobile_img : coming_soon_img;
    ref.current.style.backgroundImage = `url(${img})`;
  }
  useEffect(()=>{
    window.addEventListener('resize', listener);
    listener();
    return ()=>{
      window.removeEventListener('resize', listener);
    }
  },[])
  return (
    <div ref = {ref}  className = 'w-full min-h-screen bg-cover bg-center'>
      
    </div>
  )
}

export default Blogs
