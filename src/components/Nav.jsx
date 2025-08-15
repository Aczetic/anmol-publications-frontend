import { useCallback, useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AccountIcon from '@mui/icons-material/AccountCircle';
import logo from '../assets/logo.png';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Nav = () => {
  const [drawerOpen , setDrawerOpen] = useState(false);
  const drawerRef = useRef();

  const authenticated = false;  // TODO : set this up


  const handleClose = useCallback(()=>{
      drawerRef.current.style.transform = 'translateX(100%)';
      setDrawerOpen(!drawerOpen);
  },[drawerOpen])
  const handleOpen = useCallback(()=>{
    drawerRef.current.style.transform = 'translateX(0)';
    setDrawerOpen(!drawerOpen);
},[drawerOpen])
  return (
    <>
      <header
        className="z-9999 fixed top-0 w-full bg-red-50 h-18 backdrop-blur-sm flex justify-between p-2 align-center">

        <NavLink to = '/' className = 'flex gap-2 px-2' > 
          <img src = {logo} alt = 'Anmol Publications logo' className = 'w-15 h-full'/>
          <span className = 'flex flex-col justify-center leading-0'>
            <p className = 'font-bold text-xl'>ANMOL</p>
            <p className = 'font-bold text-sm'>Publications</p>
          </span>
        </NavLink>
        <div className='hidden w-fit h-full margin-auto lg:flex gap-4 items-center'>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''} to="/"> Home </NavLink>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''}  to="/books"> Books </NavLink>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''} to="/blogs"> Blogs </NavLink>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''} to="/contact-us"> Contact Us </NavLink>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''} to="/about-us"> About Us </NavLink>
        </div>

        {/* hamburger and btns are kept together */}
        <div className = 'flex'>
          {

            authenticated ?
            <div className = 'px-3 self-center'>
               <AccountIcon className = 'flex self-center cursor-pointer select-none' style = {{fontSize:'2rem'}}/>
            </div>
            :<div className = 'hidden sm:flex w-fit gap-1 items-center px-5'>
              <button className = 'btn-primary'> Login</button>
              <button className = 'btn-secondary'> Sign Up</button>
            </div>
          }
          
          <div className = 'flex p-2 text-xl lg:hidden items-center' onClick = {handleOpen}>
            <MenuIcon style = {{fontSize:'2rem'}}/>
          </div>
        </div>
        
        
        {
          drawerOpen && <div className = 'block lg:hidden fixed w-[100vw] h-[100vh] top-0 left-0 z-998 bg-[#3e2f2f91]' onClick = {handleClose}>
          {/* overlay clicking on it will also close*/}
        </div>
        }
        
        <div ref = {drawerRef} className = 'block duration-200 absolute z-999 lg:hidden right-0 top-0 w-[12rem] h-[100vh] bg-[#fde7e7]' style = {{transform:'translateX(100%)'}}>
          
          <CloseIcon className = 'p-1 relative left-1 top-2 text-xl cursor-pointer select-none' style = {{width:'2rem' , height:'2rem'}} onClick = {handleClose}/>
          
          <div className='flex flex-col w-full h-fit margin-auto gap-4 items-start px-3 py-3'>
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''} to="/"> Home </NavLink>
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''}  to="/books"> Books </NavLink>
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''} to="/blogs"> Blogs </NavLink>
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''} to="/contact-us"> Contact Us </NavLink>
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''} to="/about-us"> About Us </NavLink>
          </div>
          {
            authenticated?  
            <div title = 'Profile' className = 'flex items-center h-10 w-fit gap-1 cursor-pointer select-none'>
              {/* TODO:implement this  */}
              <AccountIcon title = 'profile' className = 'flex self-center relative' style = {{fontSize:'2rem'}}/> Profile
            </div> 
            : <div className = 'flex flex-col w-fit gap-3 top-5 relative items-start px-3'>
              <button className = 'btn-primary text-md md:px-3 '> Login</button>
              <button className = 'btn-secondary text-md md:px-3'> Sign Up</button>
            </div>
          }
        </div>
      </header>
      <main className = 'w-full h-fit relative z-0 top-16'><Outlet/></main>

      {/* TODO: implement the email and phone to open mail app and phone app */}
      <footer className = 'w-full h-fit  flex flex-col md:flex-row gap-5 md:grid md:grid-cols-2 lg:flex md:gap-0 p-3 py-10 justify-around relative top-16 bg-black text-xs md:text-sm'>
        <div className = 'w-full max-w-100 flex flex-col gap-4 p-4'> 
          <NavLink to = '/' className = 'flex gap-2 px-2' > 
            <img src = {logo} alt = 'Anmol Publications logo' className = 'w-15 h-full'/>
            <span className = 'flex flex-col justify-center leading-0'>
              <p className = 'font-bold text-xl text-white'>ANMOL</p>
              <p className = 'font-bold text-sm text-white'>Publications</p>
            </span>
          </NavLink>
          <p className = 'text-white w-full'>We offer NEP-certified, high-quality educational solutions for Indian schools. Our textbooks come with AI-powered digital services that extend learning beyond the classroom and enhance teaching outcomes.</p>
          <div className = 'flex flex-col gap-2'>
            <p className = 'text-white flex gap-2'><EmailIcon className = 'text-white' />contact@anmolpublications.com</p>
            <p className = 'text-white flex gap-2'><LocalPhoneIcon className = 'text-white' />+91 1234567890</p>
            <div className = 'text-white flex gap-3'>
              <a href = 'https://facebook.com'><FacebookIcon /></a>
              <a href = 'https://instagram.com'><InstagramIcon /></a>
              <a href = 'https://x.com'><XIcon /></a>
              <a href = 'https://linkedin.com'><LinkedInIcon /></a>
            </div>
          </div>
        </div>
        <div className = 'text-white w-fit h-fit p-4 flex flex-col gap-4 relative top-10 '>
          <h1 className = 'font-bold'>Company</h1>
          <NavLink className = 'text-red-50' to = '/home' > Home </NavLink>  
          <NavLink className = 'text-red-50' to = '/about-us' > About Us </NavLink>  
          <NavLink className = 'text-red-50' to = '/our-mission' > Our Mission </NavLink>  
          <NavLink className = 'text-red-50' to = '/contact-us' > Contact Us </NavLink>  
        </div>
        {/* TODO: connect these links */}
        <div className = 'text-white w-fit h-fit p-4 flex flex-col gap-4 relative top-10'>
          <h1 className = 'font-bold'>Product / Resources</h1>
          <NavLink className = 'text-red-50' to = '/books' > Books </NavLink>  
          <NavLink className = 'text-red-50' to = '/testpaper-generator' > Testpaper Generator </NavLink>  
          <NavLink className = 'text-red-50' to = '/home' >Support</NavLink>  
          <NavLink className = 'text-red-50' to = '/home' > NEP Guidelines</NavLink>  
        </div>
        {/* TODO: connect these links */}
        <div className = 'text-white w-fit h-fit p-4 flex flex-col gap-4 relative top-10'>
          <h1 className = 'font-bold'>Discover</h1>
          <NavLink className = 'text-red-50' to = '/home' > Blogs </NavLink>  
          <NavLink className = 'text-red-50' to = '/home' > Careers </NavLink>  
          <NavLink className = 'text-red-50' to = '/home' > Terms and Conditions </NavLink>  
          <NavLink className = 'text-red-50' to = '/faq' > FAQs </NavLink>  
        </div>
      </footer>
    </>
  );
}

export default Nav
