import { NavLink } from 'react-router';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import logo from '../assets/logo.png';
import { useState } from 'react';

const authvidc = 'https://frwqfqelivvjucqh.public.blob.vercel-storage.com/authvidc-vfLNjW2yIgKQnjZcoo6WYiW6GuPQlz.mp4' // auth video 

const Login = () => {
  const [passwordVisible ,setPasswordVisible] = useState(false);


  return (
    <div className="w-full h-fit min-h-[100vh] flex items-center justify-center">
      {/* left side */}
      <div data-aos = "fade" data-aos-delay = "100" className="relative w-full lg:w-[45%] lg:max-w-200 shrink-0 h-screen">
        <video
          autoPlay={true}
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full min-h-[100vh] object-cover"
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
        <div className="absolute z-100 block lg:hidden top-0 left-0 w-full h-screen bg-[#00000077]">
          {/* Form Container */}
          <div className="relative w-full h-full flex flex-col items-center justify-center px-3 gap-5 md:gap-8">

            <h1 className="w-full text-center font-bold text-red-50 text-3xl md:text-5xl">
              Welcome Back !
            </h1>
            <form className="glass-card relative flex flex-col gap-1 w-full md:w-fit p-4 max-w-100 md:max-w-150 h-fit bg-red-500">

              <h2 className="w-full text-2xl font-bold text-white text-center">
                Log In
              </h2>
              {/* row groups container */}
              <div className = 'w-full h-full overflow-y-scroll flex flex-col gap-1'>

              {/* email and phone*/}
              <div className="w-full sm:min-w-80 border-box px-1 py-2 flex flex-col gap-4 justify-center mt-1">
                <label
                  htmlFor="email"
                  className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                >
                  Email :
                  <input
                    id="email"
                    type="text"
                    placeholder="Enter school email"
                    className="bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                  />
                  <EmailIcon className="scale-70 absolute bottom-0 md:bottom-[5%] right-1" />
                </label>
                <label
                    htmlFor="password"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    Password :
                    <input
                      id="password"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password (min 8 chars)"
                      className="bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                    />
                    {passwordVisible ? (
                      <VisibilityIcon
                        onClick={() => setPasswordVisible(false)}
                        className="scale-70 absolute bottom-0 md:bottom-[5%] right-1"
                      />
                    ) : (
                      <VisibilityOffIcon 
                      onClick={() => setPasswordVisible(true)}
                      className="scale-70 absolute bottom-0 md:bottom-[5%] right-1"
                      />
                    )}
                  </label>
              </div>

              </div>
              <button className = 'w-full p-2 text-white text-xs md:text-sm bg-black rounded-sm cursor-pointer select-none mt-3'>Log In</button>
              <div className="w-full py-2 flex justify-center h-fit text-xs md:text-sm font-light text-white">{"Don't have an account"} ? &nbsp;
                <NavLink className="font-semibold" to="/sign-up">Sign Up</NavLink></div>
            </form>
          </div>
        </div>
        <div className="w-full bg-red-500"></div>
      </div>


      {/* right side */}
      <div className="w-full h-screen hidden lg:flex flex-col gap-5 items-center justify-center p-2 px-5">
        <h1 className="w-full font-bold text-4xl text-center text-red-700">
          Welcome Back !
        </h1>

        <div className="relative w-full bg-white rounded-md border-solid border-0 border-black max-w-80 h-fit overflow-hidden">
          <div className=" rotate absolute top-0 left-0 w-full h-full noised-bg scale-150">
            {/* bg */}
          </div>

          {/* this form will show up only in large screens */}
          <form className="auth-form-bg px-3 py-2 text-sm flex flex-col gap-1 relative z-100 w-full p-1 h-fit">
           
            <h2 className="w-full mt-2 text-center font-bold text-2xl text-red-50">
              Log In
            </h2>

            <div className = 'w-full flex flex-col gap-3 p-2 h-fit overflow-y-scroll'>

              {/* password and confirm password */}
            
                <label
                  htmlFor="email"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  Email :
                  <input
                    id="email"
                    type={passwordVisible ? "text" : "password"}
                    className="p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                    placeholder="Enter school email"
                  />
                  
                  <EmailIcon
                    className="cursor-pointer absolute right-2 top-1/2 scale-70 text-[#d73f3f86]"
                  />
                 
                </label>

                <label
                  htmlFor="password"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  Password :
                  <input
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    className="p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                    placeholder="Enter your password"
                  />
                  {passwordVisible ? (
                    <VisibilityIcon
                      onClick={() => setPasswordVisible(false)}
                      className="cursor-pointer absolute right-2 top-1/2 scale-70 text-[#d73f3f86]"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setPasswordVisible(true)}
                      className="cursor-pointer absolute right-2 top-1/2 scale-70 text-[#d73f3f86]"
                    />
                  )}
                </label>
         

            </div>
            <button className = 'w-full py-2 text-center bg-black text-white cursor-pointer select-none text-xs md:text-sm rounded-sm mt-3'>Log In</button>
            <div className="w-full py-2 flex justify-center h-fit text-xs md:text-sm font-light text-white">{"Don't have an account"} ? &nbsp;
            <NavLink className="font-semibold" to="/sign-up">Sign Up</NavLink></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login
