import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const user = useSelector(state=>state.user);
  const navigate = useNavigate();
  // to protect from unauthorized access if somebody tried doing /dashboard
    useEffect(()=>{
      if(!user || user.role !== 'principal'){
        navigate('/profile');
      }
    },[])


  return (
    <div className = 'w-full font-semibold text-md min-h-screen flex items-center justify-center'>
        This is dashboard screen
    </div>
  )
}

export default Dashboard
