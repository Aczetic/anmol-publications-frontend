import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';


const Dashboard = () => {
  const user = useSelector(state=>state.user);
  const navigate = useNavigate();
  // to protect from unauthorized access if somebody tried doing /dashboard
  //TODO: later use redux thunk this is very ugly
    useEffect(()=>{
      if(user && user.role !== 'principal'){
        setTimeout(()=> navigate('/profile'),1000);
      }else if (user && user.role == 'principal'){
        navigate('/dashboard') // I know this is some weird logic but that user up there is getting 
                               // null for a split second then getting actually value which is being set by app.jsx
      }else {
        setTimeout(()=>navigate('/login'),500);
      }
    },[user])


  return (
    <div className = 'w-full font-semibold text-md min-h-screen flex items-center justify-center'>
        This is dashboard screen
    </div>
  )
}

export default Dashboard
