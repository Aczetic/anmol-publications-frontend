import { BrowserRouter, Route, Routes } from "react-router"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import Books from "./pages/Books"
import ContactUs from "./pages/ContactUs"
import Blogs from "./pages/Blogs"
import NotFound from "./pages/NotFound"
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Careers from "./pages/Careers"
// ..
AOS.init({
  duration:800,
  once:true,
  offset:100,
});


const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route element = {<Nav/>}>
        <Route index = {true} path = '/' element = {<Home/>}/>
        <Route path = '/home' element = {<Home/>}/> {/*this route will redirect to upper route from client side} */}
        <Route path = '/about-us' element = {<AboutUs/>}/>
        <Route path = '/books' element = {<Books/>}/> 
        <Route path = '/contact-us' element = {<ContactUs/>} />
        <Route path = '/blogs' element = {<Blogs/>} />
        <Route path = '/careers' element = {<Careers/>} />
        <Route path = '*' element = {<NotFound/>} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
