import { BrowserRouter, Route, Routes } from "react-router"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import Books from "./pages/Books"
import ReadBook from './pages/ReadBook.jsx'
import ReadSample from './pages/ReadSample.jsx'
import ContactUs from "./pages/ContactUs"
import Blogs from "./pages/Blogs"
import NotFound from "./pages/NotFound"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Careers from "./pages/Careers"
import Faqs from "./pages/Faqs"
import Support from "./pages/Support"
import OurMission from "./pages/OurMission"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import TestpaperGenerator from "./pages/TestpaperGenerator"
import Dashboard from "./pages/Dashboard"
import { useDispatch, useSelector } from "react-redux"
import {setUser} from './features/userSlice.js';
import { useEffect } from "react"
import axios from "axios"
import Profile from "./pages/Profile.jsx"
import Protected from "./pages/Protected.jsx"
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import BookDetails from "./pages/BookDetails.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"

// ..
AOS.init({
  duration:800,
  once:true,
  offset:100,
});


const App = () => {
  const dispatch = useDispatch();
  //get the logged in state locally and verify first through api
  useEffect(()=>{
   
    axios.get( `${import.meta.env.VITE_SERVER_URL}/auth/logged-in`,{
      withCredentials:true,
    }).then(res=>{
      
      if(!res.data.success){ // if session not active
        window.localStorage.removeItem('user');
        dispatch(setUser(null))

      }else if(res.data.success){ // if session is active then overwrite the user info and data in session storage
        dispatch(setUser(res.data.user));
        window.localStorage.setItem('user',JSON.stringify(res.data.user));
      }

    }).catch(e=>{
      console.log(e);
       // here will show any errors right now I don't have any in mind that needs to toasted
       if(e.response?.data?.message === 'UNAUTHORIZED') return;
       if(!e.response?.data?.success){
          dispatch(setUser(null));
       }
    })
    
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route index={true} path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />{" "}
          {/*this route will redirect to upper route from client side} */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/books" element={<Books />} />
          <Route path="/read-sample/:id" element={<ReadSample />} />
          <Route path="/read-book/:id" element={<ReadBook />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/our-mission" element={<OurMission />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path ='/book-details/:id' element = {<BookDetails/>}/>
          <Route path = '/terms-and-conditions' element = {<TermsAndConditions/>} />
          <Route path = '/forgot-password' element = {<ForgotPassword/>} />
          <Route element={<Protected />}>
            <Route path="/testpaper-generator" element={<TestpaperGenerator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
