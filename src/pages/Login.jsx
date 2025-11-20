import { NavLink, useNavigate } from 'react-router';
import EmailIcon from '@mui/icons-material/Email';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo.png';
import { useEffect, useRef, useState } from 'react';
import auth_ss from '../assets/contact_comp/it_all_starts_with_a_book.jpg';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import Loader1 from '../components/Loader1';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {setUser} from '../features/userSlice.js';
import Otp from '../components/Otp.jsx';

const authvidc = 'https://frwqfqelivvjucqh.public.blob.vercel-storage.com/authvidc-vfLNjW2yIgKQnjZcoo6WYiW6GuPQlz.mp4' // auth video 

const ForgotPasswordEmail = z.object({
  email: z.email('Enter a valid email')
})
const User = z.object({
   email : z.email("Enter a valid email"),
   password : z.string()
            .min( 8 , {error: "Atleast 8 characters"})
            .refine( value=>/[a-z]/.test(value) , {error:'Missing a lower case letter'})
            .refine( value => /[A-Z]/.test(value) , {error: "Missing an upper case letter"})
            .refine( value => /[0-9]/.test(value) , {error: "Missing a number" })
            .refine( value => /[*\.!@#$%^&*=\-_+]/.test(value) , {error: "Missing *.!@#$%^&*=-_+"}),
    })

const UserMobile = z.object({
  "email-mobile" : z.email("Enter a valid email"),
  "password-mobile" : z.string()
            .min( 8 , {error: "Atleast 8 characters"})
            .refine( value=>/[a-z]/.test(value) , {error:'Missing a lower case letter'})
            .refine( value => /[A-Z]/.test(value) , {error: "Missing an upper case letter"})
            .refine( value => /[0-9]/.test(value) , {error: "Missing a number" })
            .refine( value => /[*\.!@#$%^&*=\-_+]/.test(value) , {error: "Missing *.!@#$%^&*=-_+"}),
    })


const Login = () => {
  const [passwordVisible ,setPasswordVisible] = useState(false);
  const videoRef = useRef(null);
  const videoLoaderRef = useRef(null);
  const [logging , setLogging ] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const [otpFormVisible , setOtpFormVisible] = useState(false);
  const [forgotPassword, openForgotPassword] = useState(false);
  const [sendingLink , setSendingLink] = useState(false);
  

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState:{errors}
  } = useForm({
    resolver: zodResolver(User)
  })

  const {
    register : registerMobile,
    handleSubmit : handleSubmitMobile,
    watch : watchMobile,
    setValue:setValueMobile,
    formState: {errors:errorsMobile}
  } = useForm({
    resolver: zodResolver(UserMobile)
  })

  const watchEmail = watch('email');
  const watchEmailMobile = watchMobile('email-mobile')

  const onSubmit = (data)=>{
    if(logging){
      return; // to prevent sending duplicate sign up requests
    }
    setLogging(true); // start loader on button

    axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`,data,{
        withCredentials:true,
        headers:{
          'Content-Type':'application/json',
        }
     }).then(res=>{
        
        if(res.data.message === 'ENTER_OTP'){
          setOtpFormVisible(true);

        }else if( res.data.message === 'SIGN_UP'){
          toast.info("Please sign up");
        
        }else if( res.data.message === 'OTP_EXHAUSTED'){
          toast.error("OTP Chances exhausted ! Try again later.")

        }else if( res.data.message === 'INVALID_PASSWORD'){
          
          toast.error('Enter correct password !')
          setValue('password','');
          setValueMobile('password-mobile','');
        }
        
        setLogging(false); // stop the loader animation

      }).catch(e=>{
        console.log(e);
        toast.error("Some error occurred")
        setLogging(false) // stop the loader animation

     })
  }
  const onSubmitMobile = (data)=>{
    if(logging){
      return; // to prevent sending duplicate sign up requests
    }
    setLogging(true); // start loader on button
    //this config below is because in mobile form "-mobile" is present in every field so this removes it
    // I could have gone creating 2 form components with local zods but I lazied out  
    const dataToPass = {};
    Object.entries(data).forEach(e=>{
      dataToPass[e[0].slice(0,e[0].lastIndexOf('-'))] = e[1] ;
    })

    axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`,dataToPass,{
       withCredentials:true,
       headers:{
         'Content-Type':'application/json',
       }
    }).then(res=>{
       
       if(res.data.message === 'ENTER_OTP'){
          setOtpFormVisible(true);
       
        }else if( res.data.message === 'SIGN_UP'){
          toast.info("Please sign up");
          
        }else if( res.data.message === 'OTP_EXHAUSTED'){
          toast.error("OTP Chances exhausted ! Try again later.")
        
        }else if( res.data.message === 'INVALID_PASSWORD'){
          
          toast.error('Enter correct password !')
          setValue('password','');
          setValueMobile('password-mobile','');
        }

        setLogging(false) // stop the loader animation
        
     }).catch(e=>{
       console.log(e);
       toast.error("Some error occurred !")
       setLogging(false) // stop the loader animation
       
    })
 }


 // forgot password form
 const {
    register:registerForgotPassword,
    handleSubmit:handleSubmitForgotPassword,
    formState : {errors : errorsForgotPassword},
    reset,
 } = useForm({
    resolver: zodResolver(ForgotPasswordEmail)
 })
 

 const sendVerificationLink = (data)=>{

    setSendingLink(true);
    axios.post(import.meta.env.VITE_SERVER_URL+'/auth/forgot-password' , data , {
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>{
      if (res.data.success) {
        toast.success("Link sent! Check your email. \n May take upto 10 minutes");
        openForgotPassword(false);
        reset();
      
      }

      setSendingLink(false);

    }).catch(e=>{
      setSendingLink(false);
      toast.error("Some error occurred!");
    })
 }


//TODO:remove it later
  const onError = (err)=>{
    // console.log(err);
  }

// if the user is logged in then go to profile/dashboard
 useEffect(()=>{
    if(user){
      navigate(user.role!=='principal'?'/profile':'/dashboard');
    }
 })

// show a frame while a playable video blob is loading
  useEffect(()=>{
    const eL = ()=>{
      videoRef.current.style.display = 'block';
      videoLoaderRef.current.style.display = 'none';
    }
    document.querySelector('#auth-vid').addEventListener('canplay',eL);
    return ()=>{
      document.querySelector('#auth-vid')?.removeEventListener('canplay',eL);
    }
  })    

  return (
    <div className="w-full h-fit min-h-screen flex items-center justify-center">
      {/* left side */}
      <div
        data-aos="fade"
        data-aos-delay="100"
        className="relative w-full lg:w-[45%] lg:max-w-200 shrink-0 h-screen min-h-100"
      >
        <div
          ref={videoLoaderRef}
          style={{ backgroundImage: `url("${auth_ss}")` }}
          className="flex flex-col bg-cover bg-center w-full h-full absolute top-0 left-0 justify-center items-center"
        >
          <Loader1 className="relative hidden lg:block lg:w-15 lg:h-15" />
        </div>
        <video
          ref={videoRef}
          autoPlay={true}
          loop
          muted
          playsInline
          className="hidden absolute top-0 left-0 w-full h-full min-h-[100vh] object-cover"
          id="auth-vid"
        >
          <source src={authvidc} type="video/mp4" />
        </video>
        <NavLink
          to="/"
          className="flex gap-2 px-2 absolute top-5 left-5 text-white z-150"
        >
          <img
            src={logo}
            alt="Anmol Educational Books logo"
            className="w-13 h-full"
            loading="lazy"
          />
          <span className="flex flex-col justify-center leading-0 gap-0">
            <p className="font-bold text-xs leading-4">Anmol</p>
            <p className="font-bold text-xs leading-4">Educational</p>
            <p className="font-bold text-xs leading-4">Books</p>
          </span>
        </NavLink>
        {/* overlay */}
        <div className="absolute z-100 block lg:hidden top-0 left-0 w-full h-screen min-h-100 bg-[#00000077]">
          {/* Form Container */}
          {!otpFormVisible ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center px-3 gap-5 md:gap-8">
              <h1 className="w-full text-center font-bold text-red-50 text-3xl md:text-5xl">
                Welcome Back !
              </h1>
              <form
                onSubmit={handleSubmitMobile(onSubmitMobile, onError)}
                className="glass-card relative flex flex-col gap-1 w-full md:w-fit p-4 max-w-100 md:max-w-150 h-fit bg-red-500"
              >
                <h2 className="w-full text-2xl font-bold text-white text-center">
                  Log In
                </h2>
                {/* row groups container */}
                <div className="w-full h-full overflow-y-scroll flex flex-col gap-1">
                  {/* email and phone*/}
                  <div className="w-full sm:min-w-80 border-box px-1 py-2 flex flex-col gap-4 justify-center mt-1">
                    <label
                      htmlFor="email-mobile"
                      className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                    >
                      Email :
                      <input
                        {...registerMobile("email-mobile")}
                        id="email-mobile"
                        type="text"
                        placeholder="Enter school email"
                        className="bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                      />
                      <EmailIcon className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1" />
                      {errorsMobile["email-mobile"] && (
                        <p className="w-full text-red-300 font-normal">
                          <ErrorOutlineIcon className="scale-70" />
                          {errorsMobile["email-mobile"].message}
                        </p>
                      )}
                    </label>
                    <label
                      htmlFor="password-mobile"
                      className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                    >
                      Password :
                      <input
                        {...registerMobile("password-mobile")}
                        id="password-mobile"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password (min 8 chars)"
                        className="bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                      />
                      {passwordVisible ? (
                        <VisibilityIcon
                          onClick={() => setPasswordVisible(false)}
                          className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1"
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={() => setPasswordVisible(true)}
                          className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1"
                        />
                      )}
                      {errorsMobile["password-mobile"] && (
                        <p className="w-full text-red-300 text-xs font-normal">
                          <ErrorOutlineIcon className="scale-70" />
                          {errorsMobile["password-mobile"].message}
                        </p>
                      )}
                      <p
                        onClick={() => openForgotPassword(true)}
                        className="text-xs font-normal text-red-100 w-full  select-none cursor-pointer"
                      >
                        Forgot password
                      </p>
                    </label>
                  </div>
                </div>
                <button className="w-full px-2 text-white text-xs md:text-sm bg-black rounded-sm cursor-pointer select-none mt-3">
                  {logging ? (
                    <div className="relative w-full h-9">
                      <Loader1 className="w-full absolute h-9 top-0 text-center" />
                    </div>
                  ) : (
                    <p className="py-2">Log In</p>
                  )}
                </button>
                <div className="w-full py-2 flex justify-center h-fit text-xs md:text-sm font-light text-white">
                  {"Don't have an account"} ? &nbsp;
                  <NavLink className="font-semibold" to="/sign-up">
                    Sign Up
                  </NavLink>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-fit h-fit p-5 flex glass-card">
                <Otp email={watchEmailMobile} path="login" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* right side */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="w-full min-h-screen h-fit hidden lg:flex flex-col gap-5 items-center justify-center p-2 px-5"
      >
        {!otpFormVisible && (
          <>
            <h1 className="w-full font-bold text-4xl text-center text-red-700">
              Welcome Back !
            </h1>

            <div className="relative w-full bg-white rounded-md border-solid border-0 border-black max-w-80 h-fit overflow-hidden">
              <div className=" rotate absolute top-0 left-0 w-full h-full noised-bg scale-150">
                {/* bg */}
              </div>

              {/* this form will show up only in large screens */}
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="auth-form-bg px-3 py-2 text-sm flex flex-col gap-1 relative z-100 w-full p-1 h-fit"
              >
                <h2 className="w-full mt-2 text-center font-bold text-2xl text-red-50">
                  Log In
                </h2>

                <div className="w-full flex flex-col gap-3 p-2 h-fit overflow-y-scroll">
                  {/* password and confirm password */}

                  <label
                    htmlFor="email"
                    className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                  >
                    Email :
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      className="p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                      placeholder="Enter school email"
                    />
                    <EmailIcon className="cursor-pointer absolute right-2 top-[1.6rem] scale-70 text-[#d73f3f86]" />
                    {errors.email && (
                      <p className="w-full text-xs h-5 font-normal text-red-800 flex items-center">
                        <ErrorOutlineIcon className="scale-70" />
                        {errors.email.message}
                      </p>
                    )}
                  </label>

                  <label
                    htmlFor="password"
                    className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                  >
                    Password :
                    <input
                      {...register("password")}
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      className="p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                      placeholder="Enter your password"
                    />
                    {passwordVisible ? (
                      <VisibilityIcon
                        onClick={() => setPasswordVisible(false)}
                        className="cursor-pointer absolute right-2 top-[1.6rem] scale-70 text-[#d73f3f86]"
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={() => setPasswordVisible(true)}
                        className="cursor-pointer absolute right-2 top-[1.6rem] scale-70 text-[#d73f3f86]"
                      />
                    )}
                    {errors.password && (
                      <p className="w-full text-xs h-5 font-normal text-red-800 flex items-center">
                        <ErrorOutlineIcon className="scale-70" />
                        {errors.password.message}
                      </p>
                    )}
                    <p
                      onClick={() => openForgotPassword(true)}
                      className="text-sm font-normal text-black w-full select-none cursor-pointer"
                    >
                      Forgot password
                    </p>
                  </label>
                </div>
                <button className="w-full border-box text-center bg-black text-white cursor-pointer select-none text-xs md:text-sm rounded-sm mt-3">
                  {logging ? (
                    <Loader1 className="w-full h-9 text-center" />
                  ) : (
                    <p className="py-2">Log In</p>
                  )}
                </button>
                <div className="w-full py-2 flex justify-center h-fit text-xs md:text-sm font-light text-white">
                  {"Don't have an account"} ? &nbsp;
                  <NavLink className="font-semibold" to="/sign-up">
                    Sign Up
                  </NavLink>
                </div>
              </form>
            </div>
          </>
        )}
        {otpFormVisible && <Otp email={watchEmail} path="login" />}
      </div>

      {/* forgot password side */}
      {forgotPassword && (
        <div
          onClick={(e) => {
            e.target === e.currentTarget && openForgotPassword(false);
          }} // only close when the bg is clicekd
          className="w-screen h-screen fixed top-0 left-0 backdrop-blur-xs bg-[#00000093] flex flex-col gap-3 items-center justify-center px-5"
        > 
          <CloseIcon className = 'absolute top-5 right-5 text-white'/>
          <p className="w-full text-center text-white font-semibold text-xl md:text-2xl">
            Forgot Password
          </p>
          <div className="glass-card relative p-5 flex flex-col gap-3 w-full max-w-90 h-fit bg-red-500">
            <p className="w-full text-white text-xs md:text-sm">
              Enter the email with which you have an active account. A
              verification link will be sent on this email. <b>Do not</b>{" "}
              share this link with anyone ! Follow the link and update your
              password.
            </p>
            <form
              onSubmit={handleSubmitForgotPassword(sendVerificationLink)}
              className="border-box"
            >
              <label
                htmlFor="email"
                className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
              >
                Email :
                <input
                  {...registerForgotPassword("email")}
                  id="email"
                  type="text"
                  placeholder="Enter email"
                  className="bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                />
                <EmailIcon className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1" />
                {errorsForgotPassword["email"] && (
                  <p className="w-full text-red-300 font-normal">
                    <ErrorOutlineIcon className="scale-70" />
                    {errorsForgotPassword["email"].message}
                  </p>
                )}
              </label>
              <button className="w-full px-2 text-white text-xs md:text-sm bg-black rounded-sm cursor-pointer select-none mt-3 flex items-center">
                {sendingLink ? (
                  <div className="relative border-box w-full h-10 flex justify-center items-center">
                    <Loader1 className="w-full h-8 top-0 text-center" />
                  </div>
                ) : (
                  <div className="w-full h-10 flex items-center justify-center">
                    Send &nbsp; Link
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login
