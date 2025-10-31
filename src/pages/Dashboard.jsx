import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';


const Dashboard = () => {
  const user = useSelector(state=>state.user);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  // to protect from unauthorized access if somebody tried doing /dashboard
  //TODO: later use redux thunk this is very ugly
    useEffect(() => {
      clearTimeout(timeoutRef.current);
      if (user && (user.role === "principal" || user.role === 'admin')) {
        navigate("/dashboard"); // I know this is some weird logic but that user up there is getting
        // null for a split second then getting actually value which is being set by app.jsx
      } else if (user && user.role !== "principal" && user.role !== "admin") {
        timeoutRef.current = setTimeout(() => navigate("/profile"), 200);
      } else {
        timeoutRef.current = setTimeout(() => navigate("/login"), 200);
      }
    }, [user]);


  return (
    <div className = 'w-full font-semibold text-md min-h-screen flex items-center justify-center'>
        This is dashboard screen
    </div>
  )
}

export default Dashboard
