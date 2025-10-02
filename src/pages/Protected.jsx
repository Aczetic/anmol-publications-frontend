import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { setUser } from "../features/userSlice";


const Protected = ({children})=>{
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(()=>{  

       axios(`${import.meta.env.VITE_SERVER_URL}/auth/logged-in`, {
         withCredentials: true,
       })
         .then((res) => {
           if (!res.data.success) {
             dispatch(setUser(null));
             navigate("/login");
           }
         })
         .catch((e) => {
           if (!e.response.data.success) {
             dispatch(setUser(null)); 
             navigate("/login");
           }
         });
    });

    return <>
            <Outlet/>
          </>
}


export default Protected;