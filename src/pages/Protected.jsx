import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { withRedirect } from "../utils/redirect";
import { setUser } from "../features/userSlice";
import Loader1 from "../components/Loader1";
import { toast } from "react-toastify";


const Protected = ({children})=>{
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const location = useLocation();
    // after login the user is sent back to the page they were trying to open
    const loginPath = withRedirect("/login", location.pathname + location.search);
    useEffect(()=>{  

       axios(`${import.meta.env.VITE_SERVER_URL}/auth/logged-in`, {
         withCredentials: true,
       })
         .then((res) => {
           if (!res.data.success) {
             dispatch(setUser(null));
             navigate(loginPath, {replace: true});
           }
         })
         .catch((e) => {
          if(e.message === 'Network Error')
            toast.error(e.message)
          
          else if (!e.response?.data.success) {
             dispatch(setUser(null)); 
             navigate(loginPath, {replace: true});
           }
         });
    });

    return <>
            {user ? <Outlet/> : <div className = 'w-screen h-screen flex justify-center items-center'><Loader1 className = 'relative top-[-2rem] scale-70 w-20 md:w-30'/></div>}
          </>
}


export default Protected;