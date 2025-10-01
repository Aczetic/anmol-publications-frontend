import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";



const Protected = ({children})=>{

    const navigate = useNavigate();

    useEffect(()=>{  

       axios(`${import.meta.env.VITE_SERVER_URL}/auth/logged-in`, {
         withCredentials: true,
       })
         .then((res) => {
           if (!res.data.success) {
             navigate("/login");
           }
         })
         .catch((e) => {
           if (!e.response.data.success) {
             navigate("/login");
           }
         });
    });

    return <>
            <Outlet/>
          </>
}


export default Protected;