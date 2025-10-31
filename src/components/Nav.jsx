import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AccountIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../assets/logo.png';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AddressIcon from '@mui/icons-material/Business';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LogoutIcon from '@mui/icons-material/Logout';
import { Slide, toast, ToastContainer} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/userSlice';
import axios from 'axios';



const Nav = () => {
  const [drawerOpen , setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const drawerRef = useRef();
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch()

  const authenticated = user?true:false

  useEffect(()=>{
    window.scrollTo({top:0}); // scroll to top every time the url changes
    if(location.pathname.includes('/home')){
      navigate('/');
    }
  },[location.pathname])
  
  const handleClose = useCallback(()=>{
      drawerRef.current.style.transform = 'translateX(100%)';
      setDrawerOpen(false);
  },[])

  const handleOpen = useCallback(()=>{
    drawerRef.current.style.transform = 'translateX(0)';
    setDrawerOpen(true);
},[])

  const handleLogout = ()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/auth/logout`,{
      withCredentials:true 
    }).then(res=>{
     
      if(res.data.success){
        window.localStorage.removeItem('user');
        handleClose(); // close the overlay
        dispatch(setUser(null));
        toast.info('Logged out')
        navigate('/login');
      }
    }).catch(e=>{
      console.log(e);
      toast.error('Some error occurred !')
    })
  }

  return (
    <>
    {/* todo: show up a logo at the top to take back to home */}
      {
        // show nav bar when not on auth page
        (location.pathname !== '/login' && location.pathname !== '/sign-up') &&<header
        className="z-9999 fixed top-0 w-full min-w-[300px] bg-red-50 h-18 backdrop-blur-sm flex justify-between p-2 align-center">

        <NavLink to = '/' className = 'flex gap-2 px-2' > 
          <img src = {logo} alt = 'Anmol Educational Books logo' className = 'w-13 h-full' loading = 'lazy'/>
          <span className = 'flex flex-col justify-center leading-0 gap-0'>
            <p className = 'font-bold text-xs leading-4'>Anmol</p>
            <p className = 'font-bold text-xs leading-4'>Educational</p>
            <p className = 'font-bold text-xs leading-4'>Books</p>
          </span>
        </NavLink>
        <div className='hidden w-fit h-full margin-auto lg:flex gap-8 items-center'>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''} to="/"> Home </NavLink>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''}  to="/books"> Books </NavLink>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''} to="/blogs"> Blogs </NavLink>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''} to="/contact-us"> Contact Us </NavLink>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''} to="/about-us"> About Us </NavLink>
          <NavLink className = {({isActive})=>isActive? 'font-bold':''} to="https://wa.me/917905401629">WhatsApp </NavLink>
        </div>

        {/* hamburger and btns are kept together */}
        <div className = 'flex gap-1'>
          {

            authenticated ?
            <div className = 'px-3 self-center flex items-center' title = {user?.role!=='principal' && user.role !== 'admin'?'profile':'dashboard'}>
                { (user.role!=='principal')?
                  <NavLink to = '/profile'  className = {({isActive})=>isActive ? 'font-semibold':'' + 'flex gap-1'} >
                    <AccountIcon title = 'profile' style = {{fontSize:'1.5rem'}}/> Profile
                  </NavLink>:
                  <NavLink to = '/dashboard'  className = {({isActive})=>isActive ? 'font-bold':'' + 'flex gap-1'} >
                    <DashboardIcon title = 'dashboard' className = {`${({isActive})=>isActive ? 'font-semibold':''} flex gap-1`} style = {{fontSize:'1.5rem'}}/> Dashboard
                  </NavLink>
                }     
               <button onClick = {handleLogout} className = 'relative top-[-0.2rem] hidden md:block select-none cursor-pointer py-[0.4rem] px-2 rounded-sm text-xs md:text-sm md:px-3 bg-black text-white ml-2 mt-2'> 
                  Logout <LogoutIcon className = 'scale-70'/>
               </button>       
            </div>
            
            :<div className = 'hidden md:flex w-fit gap-1 items-center px-5'>
              <Link to = '/login'><button onClick = {handleClose} className = 'btn-primary'> Login</button></Link>
              <Link to = '/sign-up'><button onClick = {handleClose} className = 'btn-secondary'> Sign Up</button></Link>
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
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''} onClick = {handleClose} to="/"> Home </NavLink>
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''} onClick = {handleClose} to="/books"> Books </NavLink>
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''} onClick = {handleClose} to="/blogs"> Blogs </NavLink>
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''} onClick = {handleClose} to="/contact-us"> Contact Us </NavLink>
            <NavLink className = {({isActive})=>isActive ? 'font-bold':''} onClick = {handleClose} to="/about-us"> About Us </NavLink>
            <NavLink className = {({isActive})=>isActive? 'font-bold':''}  onClick = {handleClose} to="https://wa.me/917905401629">WhatsApp </NavLink>

          </div>
          {
            authenticated?  
            <div title = {user.role!=='principal'?'profile':'dashboard'} className = 'flex px-2 items-center h-10 w-fit gap-1 cursor-pointer select-none'>
            { user.role!=='principal'?
              <NavLink to = '/profile'  className = {({isActive})=>isActive ? 'font-bold':'' + 'flex gap-1'} >
                <AccountIcon title = 'profile' style = {{fontSize:'1.5rem'}}/> Profile
              </NavLink>:
              <NavLink to = '/dashboard'  className = {({isActive})=>isActive ? 'font-bold':'' + 'flex gap-1'} >
                <DashboardIcon title = 'dashboard' className = {`${({isActive})=>isActive ? 'font-bold':''} flex gap-1`} style = {{fontSize:'1.5rem'}}/> Dashboard
              </NavLink>
            }
            </div> 
            : <div className = 'flex flex-col w-fit gap-3 top-5 relative items-start px-3'>
              <Link to = '/login'><button onClick = {handleClose} className = 'btn-primary text-xs md:text-sm md:px-3 '> Login</button></Link>
              <Link to = '/sign-up'><button onClick = {handleClose} className = 'btn-secondary text-xs md:text-sm  md:px-3'> Sign Up</button></Link>
            </div>
          }
          {
            authenticated && 
            <button onClick = {handleLogout} className = 'select-none cursor-pointer py-1 px-2 rounded-sm text-xs md:text-sm md:px-3 bg-black text-white ml-2 mt-2'> 
              Logout <LogoutIcon className = 'scale-70'/>
            </button>              
          }
        </div>
      </header>
      }
      {/* when not on login or sign up page */}
      {(location.pathname !== '/login' && location.pathname !== '/sign-up') && <main className = 'w-full min-w-[300px] h-fit mt-16 relative z-2'><Outlet/></main>}
       {/* when on login or sign up page */}
      {(location.pathname === '/login' || location.pathname === '/sign-up') && <main className = 'w-full min-w-[300px] h-fit relative z-2'><Outlet/></main>}
      <ToastContainer 
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
        transition={Slide}/>
      {/* TODO: connect the social media links only facebook is connected and ask to change the contact info in those pages to match correctly not gmail */}
      {(location.pathname !== '/login' && location.pathname !== '/sign-up') && <footer data-aos = 'fade' className = 'w-full h-fit min-w-[300px] flex flex-col md:flex-row gap-5 md:grid md:grid-cols-2 lg:flex md:gap-0 p-3 py-12 justify-around bg-black text-xs md:text-sm'>
        <div className = 'w-full max-w-100 flex flex-col gap-4 p-4'> 
          <NavLink to = '/' className = 'flex gap-2 px-2' > 
            <img src = {logo} alt = 'company-logo' className = 'w-15 h-full' loading = "lazy"/>
            <span className = 'flex flex-col justify-center leading-0 gap-0 text-white'>
              <p className = 'font-bold text-xs leading-4'>Anmol</p>
              <p className = 'font-bold text-xs leading-4'>Educational</p>
              <p className = 'font-bold text-xs leading-4'>Books</p>
          </span>
          </NavLink>
          <p className = 'text-white w-full'>We offer NEP-certified, high-quality educational solutions for Indian schools. Our textbooks come with AI-powered digital services that extend learning beyond the classroom and enhance teaching outcomes.</p>
          <div className = 'flex flex-col gap-2'>
              <a target = '_blank' href = 'https://google.com/maps?q=8/276, Sitapur Rd, Sector 8, Sector 9, Jankipuram Vistar, Khargapur Jagir, Lucknow, Uttar Pradesh 226021' className = 'text-white flex gap-2'>
                <AddressIcon className = 'text-white' />Plot No. 95/3, S.N. Villa, New Friends Colony, Sector-6 Jankipuram Vistar, 226021, Lucknow UP
              </a>
            <a target = "_blank" href = 'mailto:contact@anmoleducationalbooks.com' className = 'text-white flex gap-2'><EmailIcon className = 'text-white' />contact@anmoleducationalbooks.com</a>
            <p className = 'text-white flex gap-2'><LocalPhoneIcon className = 'text-white' /><a href = 'tel:+919839314703'>+91 9839314703</a>  &nbsp; <a href = 'tel:+917905401629'>+91 7905401629</a></p>
            <div className = 'text-white flex gap-3'>
              <a target = '_blank' href = 'https://www.facebook.com/p/Anmol-Educational-Books-100064159837773/'><FacebookIcon /></a>
              <a target = '_blank' href = 'https://www.instagram.com/anmoleducationalbooks/'><InstagramIcon /></a>
              <a target = '_blank' href = 'https://x.com/AnmolBooks'><XIcon /></a>
              <a target = '_blank' href = 'https://linkedin.com'><LinkedInIcon /></a>
              <a href="https://wa.me/917905401629" target="_blank" ><WhatsAppIcon/></a>
            </div>
          </div>
        </div>
        <div className = 'text-white w-fit h-fit p-4 flex flex-col gap-4 relative top-10 '>
          <h1 className = 'font-bold'>Company</h1>
          <NavLink className = 'text-red-50' to = '/' > Home </NavLink>  
          <NavLink className = 'text-red-50' to = '/about-us' > About Us </NavLink>  
          <NavLink className = 'text-red-50' to = '/our-mission' > Our Mission </NavLink>  
          <NavLink className = 'text-red-50' to = '/contact-us' > Contact Us </NavLink>  
        </div>
        {/* TODO: connect these links */}
        <div className = 'text-white w-fit h-fit p-4 flex flex-col gap-4 relative top-10'>
          <h1 className = 'font-bold'>Product / Resources</h1>
          <NavLink className = 'text-red-50' to = '/books' > Books </NavLink>  
          <NavLink className = 'text-red-50' to = '/testpaper-generator' > Testpaper Generator </NavLink>  
          <NavLink className = 'text-red-50' to = '/support' >Support</NavLink>  
          <NavLink className = 'text-red-50' to = 'https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf' > NEP Guidelines</NavLink>  
        </div>
        {/* TODO: connect these links */}
        <div className = 'text-white w-fit h-fit p-4 flex flex-col gap-4 relative top-10'>
          <h1 className = 'font-bold'>Discover</h1>
          <NavLink className = 'text-red-50' to = '/blogs' > Blogs </NavLink>  
          <NavLink className = 'text-red-50' to = '/careers' > Careers </NavLink>  
          <NavLink className = 'text-red-50' to = '/terms-and-conditions' > Terms and Conditions </NavLink>  
          <NavLink className = 'text-red-50' to = '/faqs' > FAQs </NavLink>  
        </div>
      </footer>}
      {(location.pathname === '/login' || location.pathname === '/sign-up') && <footer data-aos = 'fade' className = 'w-full h-fit min-w-[300px] flex flex-col md:flex-row gap-5 md:grid md:grid-cols-2 lg:flex md:gap-0 p-3 py-12 justify-around relative bg-black text-xs md:text-sm'>
        <div className = 'w-full max-w-100 flex flex-col gap-4 p-4'> 
          <NavLink to = '/' className = 'flex gap-2 px-2' > 
            <img src = {logo} alt = 'company-logo' className = 'w-15 h-full' loading = "lazy"/>
            <span className = 'flex flex-col justify-center leading-0 gap-0 text-white'>
              <p className = 'font-bold text-xs leading-4'>Anmol</p>
              <p className = 'font-bold text-xs leading-4'>Educational</p>
              <p className = 'font-bold text-xs leading-4'>Books</p>
          </span>
          </NavLink>
          <p className = 'text-white w-full'>We offer NEP-certified, high-quality educational solutions for Indian schools. Our textbooks come with AI-powered digital services that extend learning beyond the classroom and enhance teaching outcomes.</p>
          <div className = 'flex flex-col gap-2'>
              <a target = '_blank' href = 'https://google.com/maps?q=8/276, Sitapur Rd, Sector 8, Sector 9, Jankipuram Vistar, Khargapur Jagir, Lucknow, Uttar Pradesh 226021' className = 'text-white flex gap-2'>
                <AddressIcon className = 'text-white' />Plot No. 95/3, S.N. Villa, New Friends Colony, Sector-6 Jankipuram Vistar, 226021, Lucknow UP
              </a>
            <a target = "_blank" href = 'mailto:contact@anmoleducationalbooks.com' className = 'text-white flex gap-2'><EmailIcon className = 'text-white' />contact@anmoleducationalbooks.com</a>
            <p className = 'text-white flex gap-2'><LocalPhoneIcon className = 'text-white' /><a href = 'tel:+919839314703'>+91 9839314703</a>  &nbsp; <a href = 'tel:+917905401629'>+91 7905401629</a></p>
            <div className = 'text-white flex gap-3'>
              <a target = '_blank' href = 'https://www.facebook.com/p/Anmol-Educational-Books-100064159837773/'><FacebookIcon /></a>
              <a target = '_blank' href = 'https://www.instagram.com/anmoleducationalbooks/'><InstagramIcon /></a>
              <a target = '_blank' href = 'https://x.com/AnmolBooks'><XIcon /></a>
              <a target = '_blank' href = 'https://linkedin.com'><LinkedInIcon /></a>
              <a href="https://wa.me/917905401629" target="_blank" ><WhatsAppIcon/></a>
            </div>
          </div>
        </div>
        <div className = 'text-white w-fit h-fit p-4 flex flex-col gap-4 relative top-10 '>
          <h1 className = 'font-bold'>Company</h1>
          <NavLink className = 'text-red-50' to = '/' > Home </NavLink>  
          <NavLink className = 'text-red-50' to = '/about-us' > About Us </NavLink>  
          <NavLink className = 'text-red-50' to = '/our-mission' > Our Mission </NavLink>  
          <NavLink className = 'text-red-50' to = '/contact-us' > Contact Us </NavLink>  
        </div>
        {/* TODO: connect these links */}
        <div className = 'text-white w-fit h-fit p-4 flex flex-col gap-4 relative top-10'>
          <h1 className = 'font-bold'>Product / Resources</h1>
          <NavLink className = 'text-red-50' to = '/books' > Books </NavLink>  
          <NavLink className = 'text-red-50' to = '/testpaper-generator' > Testpaper Generator </NavLink>  
          <NavLink className = 'text-red-50' to = '/support' >Support</NavLink>  
          <NavLink className = 'text-red-50' to = 'https://www.education.gov.in/sites/upload_files/mhrd/files/NEP_Final_English_0.pdf' > NEP Guidelines</NavLink>  
        </div>
        {/* TODO: connect these links */}
        <div className = 'text-white w-fit h-fit p-4 flex flex-col gap-4 relative top-10'>
          <h1 className = 'font-bold'>Discover</h1>
          <NavLink className = 'text-red-50' to = '/blogs' > Blogs </NavLink>  
          <NavLink className = 'text-red-50' to = '/careers' > Careers </NavLink>  
          <NavLink className = 'text-red-50' to = '/terms-and-conditions' > Terms and Conditions </NavLink>  
          <NavLink className = 'text-red-50' to = '/faqs' > FAQs </NavLink>  
        </div>
      </footer>}
      {(location.pathname !== '/login' && location.pathname !== '/sign-up') && <div  className = 'relative z-1 w-full text-center h-fit p-1 bg-black text-red-50 text-xs sm:text-sm'>© 2025 Anmol Educational Books.{<br className = 'block sm:hidden'/>} All Rights Reserved.</div>}
      {(location.pathname === '/login' || location.pathname === '/sign-up') && <div  className = 'relative z-1 w-full text-center h-fit p-1 bg-black text-red-50 text-xs sm:text-sm'>© 2025 Anmol Educational Books.{<br className = 'block sm:hidden'/>} All Rights Reserved.</div>}
    </>
  );
}

export default Nav
