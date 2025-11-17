
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '../features/profileSlice';

const Profile = () => {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/profile`,{
      withCredentials:true
    }).then(
      res=>{
        if(res.data.success){
          dispatch(setProfile(res.data.user)); // when the data comes set it to store
        }
      }
    ).catch(e=>{
      console.log(e);
      toast.error('Some error occurred!');
    })
  },[])
  return (
    <div className = 'w-full min-h-screen flex items-center justify-center'>
        This is the profile page
    </div>
  )
}

export default Profile
