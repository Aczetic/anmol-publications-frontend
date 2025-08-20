import React from 'react'
import notFound from '../assets/not_found.png';

const NotFound = () => {
  return (
    <div className = 'w-full min-h-[100vh]' style = {{backgroundImage : `url(${notFound})`, backgroundSize:'cover', backgroundPosition:'50% 45%'}}>
    </div>
  )
}

export default NotFound
