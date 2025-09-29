import { NavLink } from 'react-router';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneIcon from '@mui/icons-material/LocalPhone';
import SchoolIcon from '@mui/icons-material/LocationCity';
import AddressIcon from '@mui/icons-material/LocationPin';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import logo from '../assets/logo.png';
import { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loader1 from '../assets/lottie/loader1.lottie?url';
import auth_ss from '../assets/contact_comp/it_all_starts_with_a_book.jpg';
import OptionsInput from '../components/OptionsInput';
import STATES from '../constants/STATES';
import CITIES from '../constants/CITIES';
import { useForm } from 'react-hook-form';
const authvidc = 'https://frwqfqelivvjucqh.public.blob.vercel-storage.com/authvidc-vfLNjW2yIgKQnjZcoo6WYiW6GuPQlz.mp4' // auth video 

// for normal screens
const User = z.object({
  designation: z.string().regex(/[user|pricipal|teacher]/,{error:"invalid designation"}),
  fullname: z.string().min(1,"Full name is required").regex(/[a-zA-Z]/ , {error: "Enter a valid name"}),
  password: z.string()
            .min( 8 , {error: "Atleast 8 characters"})
            .refine( value=>/[a-z]/.test(value) , {error:'Missing a lower case letter'})
            .refine( value => /[A-Z]/.test(value) , {error: "Missing an upper case letter"})
            .refine( value => /[0-9]/.test(value) , {error: "Missing a number" })
            .refine( value => /[*\.!@#$%^&*=\-_+]/.test(value) , {error: "Missing *.!@#$%^&*=-_+"}),
  "confirm-password": z.string()
            .min( 8 , {error: "Atleast 8 characters"})
            .refine( value=>/[a-z]/.test(value) , {error:'Missing a lower case letter'})
            .refine( value => /[A-Z]/.test(value) , {error: "Missing an upper case letter"})
            .refine( value => /[0-9]/.test(value) , {error: "Missing a number" })
            .refine( value => /[*\.!@#$%^&*=\-_+]/.test(value) , {error: "Missing *.!@#$%^&*=-_+"}),
  email: z.email({error:'Enter a valid email address'}),
  phone: z.string().max(10,'Enter a valid phone number').regex(/[1-9][0-9]{9}/, {error:"Enter a valid phone number"}),
  "school-name": z.string().min( 5 , "Invalid school name"),
  state: z.string().min(1 , "State is required"),
  city: z.string().min(1 , "City is required"),
  address: z.string().min(1 , "Address is required")
}).refine((data)=> data.password === data['confirm-password'],{error:"Both passwords must match" , path : ['confirm-password']})

// for small screens
const UserMobile = z.object({
  "designation-mobile": z.string().regex(/[user|pricipal|teacher]/,{error:"invalid designation"}),
  "fullname-mobile": z.string().min(1,"Full name is required").regex(/[a-zA-Z]/ , {error: "Enter a valid name"}),
  "password-mobile": z.string()
                    .min( 8 , {error: "Atleast 8 characters"})
                    .refine( value=>/[a-z]/.test(value) , {error:'Missing a lower case letter'})
                    .refine( value => /[A-Z]/.test(value) , {error: "Missing an upper case letter"})
                    .refine( value => /[0-9]/.test(value) , {error: "Missing a number" })
                    .refine( value => /[*\.!@#$%^&*=\-_+]/.test(value) , {error: "Missing *.!@#$%^&*=-_+"}),
"confirm-password-mobile": z.string()
                    .min( 8 , {error: "Atleast 8 characters"})
                    .refine( value=>/[a-z]/.test(value) , {error:'Missing a lower case letter'})
                    .refine( value => /[A-Z]/.test(value) , {error: "Missing an upper case letter"})
                    .refine( value => /[0-9]/.test(value) , {error: "Missing a number" })
                    .refine( value => /[*\.!@#$%^&*=\-_+]/.test(value) , {error: "Missing *.!@#$%^&*=-_+"}),
  "email-mobile": z.email({error:'Enter a valid email address'}),
  "phone-mobile": z.string().max(10,"Enter a valid phone number").regex(/[1-9][0-9]{9}/, {error:"Enter a valid phone number"}),
  "school-name-mobile": z.string().min( 5 , "Invalid school name"),
  "state-mobile": z.string().min(1 , "State is required"),
  "city-mobile":  z.string().min(1 , "City is required"),
  "address-mobile": z.string().min(1 , "Address is required")
}).refine((data)=> data['password-mobile'] === data['confirm-password-mobile'],{error:"Both passwords must match" , path : ['confirm-password-mobile']})


const SignUp = () => {
  const [passwordVisible ,setPasswordVisible] = useState(false);
  const [confirmPasswordVisible ,setConfirmPasswordVisible] = useState(false);
  const videoRef = useRef(null);
  const videoLoaderRef = useRef(null);

  //for large screens
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState:{errors}
  } = useForm({resolver:zodResolver(User)})
 // for mobile
  const {
    register : registerMobile,
    handleSubmit: handleSubmitMobile,
    watch: watchMobile,
    setValue: setValueMobile,
    formState :{ errors : errorsMobile}
  } = useForm({resolver:zodResolver(UserMobile)})

  const watchState = watch('state');
  const watchCity = watch('city');
  const watchSchoolName = watch('school-name');
  const watchStateMobile = watchMobile('state-mobile');
  const watchCityMobile = watchMobile('city-mobile');
  const watchSchoolNameMobile = watchMobile('school-name-mobile');




  // for showing a frame when the playable video blob is loading
  useEffect(()=>{
    const eL = ()=>{
      videoRef.current.style.display = 'block';
      videoLoaderRef.current.style.display = 'none';
      console.log("came here")
    }
    document.querySelector('#auth-vid').addEventListener('canplay',eL);
    return ()=>{
      document.querySelector('#auth-vid')?.removeEventListener('canplay',eL);
    }
  })

  const onSubmit = (data)=>{ console.log(data)};
  const onError = (errors=>{ console.log(errors)})

  return (
    <div className="w-full h-fit flex items-center justify-center">
      {/* left side */}
      <div
        data-aos="fade"
        data-aos-delay="100"
        className="relative w-full lg:w-[45%] lg:max-w-200 shrink-0 h-screen min-h-130"
      >
        <div
          ref={videoLoaderRef}
          style={{ backgroundImage: `url("${auth_ss}")` }}
          className="flex flex-col bg-cover bg-center w-full h-full absolute top-0 left-0 justify-center items-center"
        >
          <DotLottieReact
            data-aos="fade-up"
            src={loader1}
            loop={true}
            className="relative hidden lg:block lg:w-15 lg:h-15"
            autoplay={true}
          />
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
        <div className="absolute z-100 block lg:hidden top-0 left-0 w-full h-screen min-h-130 bg-[#00000077]">
          {/* Form Container */}
          <div className="relative w-full h-full flex flex-col items-center justify-center px-3 gap-5 md:gap-8">
            <h1 className="w-full text-center font-bold text-red-50 text-3xl md:text-5xl">
              Create an account
            </h1>
            <form onSubmit={handleSubmitMobile(onSubmit,onError)} className="glass-card relative flex flex-col gap-1 w-full md:w-fit p-4 max-w-110 md:max-w-150 h-130 min-h-100">
              <h2 className="w-full text-2xl font-bold text-white text-center">
                Sign Up
              </h2>
              {/* row groups container */}
              <div className="w-full h-full overflow-y-scroll flex flex-col gap-1">
                {/* designation and name */}
                <div className="w-full border-box px-1 flex flex-col sm:flex-row gap-4 justify-center mt-3">
                  <label
                    htmlFor="designation-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    Designation :
                    <select
                      {...registerMobile('designation-mobile')}
                      defaultValue={"user"}
                      id="designation-mobile"
                      type="text"
                      placeholder="Enter your designation"
                      className="bg-[#6a6868b3] p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                    >
                      <option value="user">User</option>
                      <option value="teacher">Teacher</option>
                      <option value="principle">Principle</option>
                    </select>
              
                  {errorsMobile.designation && <p className = 'w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile.designation.message}</p>}

                  </label>
                  <label
                    htmlFor="fullname-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    Full Name :
                    <input
                      {...registerMobile('fullname-mobile')}
                      id="fullname-mobile"
                      type="text"
                      placeholder="Enter your full name"
                      className="bg-[#6a6868b3] p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                    />
                    <PersonIcon className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1" />
                   {errorsMobile['fullname-mobile'] && <p className = 'w-full text-xs h-5 font-normal text-red-400 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile['fullname-mobile'].message}</p>}

                  </label>
                </div>

                {/* email and phone*/}
                <div className="w-full border-box px-1 flex flex-col sm:flex-row gap-4 justify-center mt-3">
                  <label
                    htmlFor="email-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    Email :
                    <input
                      {...registerMobile('email-mobile')}
                      id="email-mobile"
                      type="text"
                      placeholder="Enter school email"
                      className="bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                    />
                    <EmailIcon className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1" />
                    {errorsMobile['email-mobile'] && <p className = 'w-full text-xs h-5 font-normal text-red-400 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile['email-mobile'].message}</p>}
                  </label>
                  <label
                    htmlFor="phone-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    Phone :
                    <input
                      {...registerMobile('phone-mobile')}
                      id="phone-mobile"
                      type="text"
                      placeholder="+91 Phone number"
                      className="bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                    />
                    <PhoneIcon className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1" />
                    {errorsMobile["phone-mobile"] && <p className = 'w-full text-xs h-5 font-normal text-red-400 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile["phone-mobile"].message}</p>}

                  </label>
                </div>

                {/* password and confirm password */}
                <div className="w-full border-box px-1 flex flex-col sm:flex-row gap-4 justify-center mt-3 ">
                  <label
                    htmlFor="password-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    Password :
                    <input
                      {...registerMobile('password-mobile')}
                      id="password-mobile"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Password (min 8 chars)"
                      className="relative bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
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
                    {errorsMobile['password-mobile'] && <p className = 'w-full text-xs h-5 font-normal text-red-400 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile['password-mobile'].message}</p>}

                  </label>
                  <label
                    htmlFor="confirm-password-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    Confirm Password :
                    <input
                      {...registerMobile('confirm-password-mobile')}
                      id="confirm-password-mobile"
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm password"
                      className="bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                    />
                    {confirmPasswordVisible ? (
                      <VisibilityIcon
                        onClick={() => setConfirmPasswordVisible(false)}
                        className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1"
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={() => setConfirmPasswordVisible(true)}
                        className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1"
                      />
                    )}
                    {errorsMobile['confirm-password-mobile'] && <p className = 'w-full text-xs h-5 font-normal text-red-400 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile['confirm-password-mobile'].message}</p>}
                  </label>
                </div>

                {/* school name*/}
                <div className="w-full border-box px-1 flex flex-col sm:flex-row gap-4 justify-center mt-3">
                  <label
                    htmlFor="school-name-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    School Name :
                    <OptionsInput
                        options={
                          watchSchoolNameMobile
                            ? `https://kys.udiseplus.gov.in/webapp/api/search-school/by-keyword?schoolName=${watchSchoolNameMobile}`
                            : "Type a school name"
                        }
                      //true because the filtering will be done by api iteslf
                        filter={() => true}
                        setValue={(value) => setValueMobile("school-name-mobile", value)}
                        {...registerMobile("school-name-mobile", { required: true })}
                        inputProps={{
                          className:"bg-[#6a6868b3] truncate text-red-500 w-full p-1 px-2 pr-8 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2",
                        id: "school-name-mobile",
                        type: "text",
                        placeholder: "Enter your school name",
                      }}
                    />
                    <SchoolIcon className="scale-70 absolute top-[1.2rem] md:top-[1.6rem] right-1" />
                    {errorsMobile['school-name-mobile'] && <p className = 'w-full text-xs h-5 font-normal text-red-400 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile['school-name-mobile'].message}</p>}
                  </label>
                </div>

                {/* state and city */}
                <div className="w-full border-box px-1 flex flex-col sm:flex-row gap-4 justify-center mt-3 ">
                  <label
                    htmlFor="state-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    State :
                    <OptionsInput
                    {...registerMobile("state-mobile", { required: true })}
                    options={STATES}
                    setValue={(value) => {
                      setValueMobile("state-mobile", value);
                      // and then reset city input
                      setValueMobile("city-mobile", "");
                    }}
                    // the states is an array that is why below logic
                    filter={(opt = "") =>
                      opt.toLowerCase().includes(watchStateMobile.toLowerCase())
                    }
                    inputProps={{
                      id: "state-mobile",
                      type: "text",
                      className:"bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2",
                      placeholder: "Enter state",
                    }}
                  />
                  {errorsMobile['state-mobile'] && <p className = 'w-full text-xs h-5 font-normal text-red-400 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile['state-mobile'].message}</p>}  
                  </label>
                  <label
                    htmlFor="city-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    City :
                    <OptionsInput
                    {...registerMobile("city-mobile", { required: true })}
                    // I don't know why the hell optional chainging is required
                    // but that piece of sh*t watchStateMobile was undefined initially so....
                    options={
                      watchStateMobile !== ""
                        ? CITIES[
                            watchStateMobile
                              ?.slice(0, watchStateMobile.length - 4) // no MP, UP,etc
                              .toLowerCase()
                          ]?.cities
                        : "Select a State" // message when no state is selected
                    }
                    // because the cities is within an object
                    filter={(opt) =>
                      opt.toLowerCase().includes(watchCityMobile.toLowerCase())
                    }
                    setValue={(value) => {
                      setValueMobile("city-mobile", value);
                    }}
                    inputProps={{
                      id: "city-mobile",
                      type: "text",
                      className:"bg-[#6a6868b3] w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2",
                      placeholder: "Enter city",
                    }}
                  />
                  {errorsMobile['city-mobile'] && <p className = 'w-full text-xs h-5 font-normal text-red-400 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile['city-mobile'].message}</p>}  
                  </label>
                </div>

                {/* address complete */}
                <div className="w-full border-box p-1 flex flex-col sm:flex-row gap-4 justify-center mt-3 ">
                  <label
                    htmlFor="address-mobile"
                    className="w-full font-semibold text-xs md:text-sm flex flex-col gap-1 text-white relative"
                  >
                    Address :
                    <textarea
                      {...registerMobile('address-mobile')}
                      id="address-mobile"
                      type="text"
                      placeholder="Provide locality address"
                      className="bg-[#6a6868b3] h-20 resize-none w-full p-1 px-2 text-xs md:text-sm rounded-xs placeholder:text-[#ffffffb1]  text-white font-normal outline-0 outline-xs focus:outline-white focus:outline-2"
                    />
                    <AddressIcon
                      onClick={() => setPasswordVisible(false)}
                      className="scale-70 absolute top-7 md:bottom-[5%] right-1"
                    />
                    {errorsMobile['address-mobile'] && <p className = 'w-full text-xs h-5 font-normal text-red-400 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errorsMobile['address-mobile'].message}</p>}
                  </label>
                </div>
              </div>
              <button className="w-full p-2 text-white text-xs md:text-sm bg-black rounded-sm cursor-pointer select-none mt-3">
                Sign Up
              </button>
              <div className="w-full py-2 flex justify-center h-fit text-xs md:text-sm font-light text-white">
                {"Already have an account."} ? &nbsp;
                <NavLink className="font-semibold" to="/login">
                  Log In
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* right side */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="w-full min-h-120 h-screen  hidden lg:flex flex-col gap-5 items-center justify-center p-2 px-5"
      >
        <h1 className="w-full font-bold text-4xl text-center text-red-700">
          Create an account
        </h1>

        <div className="relative w-full bg-white rounded-md border-solid border-0 border-black max-w-110 h-fit overflow-hidden">
          <div className=" rotate absolute top-0 left-0 w-full h-full noised-bg scale-150">
            {/* bg */}
          </div>

          {/* this form will show up only in large screens */}
          <form
            onSubmit={handleSubmit(onSubmit,onError)}
            autoComplete="false"
            className="auth-form-bg px-3 py-2 text-sm flex flex-col gap-1 relative z-100 w-full max-w-120 p-1"
          >
            <h2 className="w-full mt-2 text-center font-bold text-2xl text-red-50">
              Sign Up
            </h2>

            <div className="w-full flex flex-col gap-3 border-box p-1 h-90  overflow-y-scroll mt-1">
              {/* salutions and name*/}
              <div className="w-full flex gap-2 h-fit">
                <label
                  htmlFor="designation"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  Designation :
                  <select
                    {...register("designation", { required: true })}
                    defaultValue={"user"}
                    id="designation"
                    type="text"
                    className="p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                    placeholder="Enter school email"
                  >
                    <option value="user">User</option>
                    <option value="teacher">Teacher</option>
                    <option value="principal">Principal</option>
                  </select>
                  {errors.designation && <p className = 'w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors.designation.message}</p>}
                </label>
                <label
                  htmlFor="fullname"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  Full Name :
                  <input
                    {...register("fullname", { required: true })}
                    id="fullname"
                    type="text"
                    className="placeholder:truncate relative block p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                    placeholder="Enter full name"
                  />
                  <PersonIcon className="absolute right-1 top-[1.6rem] text-[#d73f3f86] scale-70" />
                  {errors.fullname && <p className = ' top-full w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors.fullname.message}</p>}
                </label>
              </div>

              {/* email and phone */}
              <div className="w-full flex gap-2 h-fit">
                <label
                  htmlFor="email"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  Email :
                  <input
                    {...register("email", { required: true })}
                    id="email"
                    type="email"
                    className="p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                    placeholder="Enter school email"
                  />
                  <EmailIcon className="absolute right-1 top-[1.6rem] text-[#d73f3f86] scale-70" />
                  {errors.email && <p className = 'top-full w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors.email.message}</p>}
                </label>

                <label
                  htmlFor="phone"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  Phone :
                  <input
                    {...register("phone", { required: true })}
                    id="phone"
                    type={"text"}
                    className="p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                    placeholder="+91 Phone number"
                  />
                  <PhoneIcon
                    onClick={() => setPasswordVisible(false)}
                    className="cursor-pointer absolute right-1 top-[1.6rem] scale-70 text-[#d73f3f86]"
                  />
                  {errors.phone && <p className = 'top-full w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors.phone.message}</p>}

                </label>
              </div>

              {/* password and confirm password */}
              <div className="w-full flex gap-2 h-fit">
                <label
                  htmlFor="password"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  Password :
                  <input
                    {...register("password", { required: true })}
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    className="p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                    placeholder="Enter your password"
                  />
                  {passwordVisible ? (
                    <VisibilityIcon
                      onClick={() => setPasswordVisible(false)}
                      className="cursor-pointer absolute right-1 top-[1.6rem] scale-70 text-[#d73f3f86]"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setPasswordVisible(true)}
                      className="cursor-pointer absolute right-1 top-[1.6rem] scale-70 text-[#d73f3f86]"
                    />
                  )}
                  {errors.password && <p className = 'top-full w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors.password.message}</p>}
                </label>

                <label
                  htmlFor="confirm-password"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  Confirm Password :
                  <input
                    {...register("confirm-password", { required: true })}
                    id="confirm-password"
                    type={confirmPasswordVisible ? "text" : "password"}
                    className="p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                    placeholder="Confirm password"
                  />
                  {confirmPasswordVisible ? (
                    <VisibilityIcon
                      onClick={() => setConfirmPasswordVisible(false)}
                      className="cursor-pointer absolute right-1 top-[1.6rem] scale-70 text-[#d73f3f86]"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setConfirmPasswordVisible(true)}
                      className="cursor-pointer absolute right-1 top-[1.6rem] scale-70 text-[#d73f3f86]"
                    />
                  )}
                  {errors['confirm-password'] && <p className = 'top-full w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors['confirm-password'].message}</p>}
                </label>
              </div>

              {/* school name  */}

              <div className="w-full flex gap-2 h-fit">
                <label
                  htmlFor="school-name"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  <SchoolIcon className="absolute z-100 right-1 top-7 text-[#d73f3f86] scale-70" />
                  School Name :
                  <OptionsInput
                    options={
                      watchSchoolName
                        ? `https://kys.udiseplus.gov.in/webapp/api/search-school/by-keyword?schoolName=${watchSchoolName}`
                        : "Type a school name"
                    }
                    //true because the filtering will be done by api iteslf
                    filter={() => true}
                    setValue={(value) => setValue("school-name", value)}
                    {...register("school-name", { required: true })}
                    inputProps={{
                      id: "school-name",
                      type: "text",
                      className:
                        "relative p-1 px-2 pr-8 truncate text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm",
                      placeholder: "Enter your school name",
                    }}
                  />
                  {errors['school-name'] && <p className = 'top-full w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors['school-name'].message}</p>}
                </label>
              </div>

              {/* state city */}
              <div className="w-full flex gap-2 h-fit">
                <label
                  htmlFor="state"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  State :
                  <OptionsInput
                    {...register("state", { required: true })}
                    options={STATES}
                    setValue={(value) => {
                      setValue("state", value);
                      // and then reset city input
                      setValue("city", "");
                    }}
                    // the states is an array that is why below logic
                    filter={(opt = "") =>
                      opt.toLowerCase().includes(watchState.toLowerCase())
                    }
                    inputProps={{
                      id: "state",
                      type: "text",
                      className:
                        "p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm",
                      placeholder: "Enter state",
                    }}
                  />
                  {errors.state && <p className = 'top-full w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors.state.message}</p>}
                </label>

                <label
                  htmlFor="city"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  City :
                  <OptionsInput
                    {...register("city", { required: true })}
                    // I don't know why the hell optional chainging is required
                    // but that piece of sh*t watchState was undefined initially so....
                    options={
                      watchState !== ""
                        ? CITIES[
                            watchState
                              ?.slice(0, watchState.length - 4)
                              .toLowerCase()
                          ]?.cities
                        : "Select a State"
                    }
                    // because the cities is within an object
                    filter={(opt) =>
                      opt.toLowerCase().includes(watchCity.toLowerCase())
                    }
                    setValue={(value) => {
                      setValue("city", value);
                    }}
                    inputProps={{
                      id: "city",
                      type: "text",
                      className:
                        "p-1 px-2 text-sm text-red-800 font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm",
                      placeholder: "Enter city",
                    }}
                  />
                  {errors.city && <p className = 'top-full w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors.city.message}</p>}
                </label>
              </div>

              {/* address */}
              <div className="w-full flex gap-2 h-fit">
                <label
                  htmlFor="address"
                  className="relative w-full text-red-50 font-semibold flex flex-col gap-1 border-box "
                >
                  Address :
                  <textarea
                    {...register('address',{required:true})}
                    id="address"
                    type="text"
                    className="p-1 px-2 h-25 text-sm text-red-800 resize-none font-normal outline-0 focus:outline-3 focus:outline-red-300 bg-[#ffeeeedd] w-full rounded-sm"
                    placeholder="Provide locality address"
                  />
                  <AddressIcon className="absolute right-0 top-7 text-[#d73f3f86] scale-70" />
                  {errors.address && <p className = 'top-full w-full text-xs h-5 font-normal text-red-700 flex items-center' ><ErrorOutlineIcon className = 'scale-70'/>{errors.address.message}</p>}
                </label>
              </div>
            </div>
            <button className="w-full py-2 text-center bg-black text-white cursor-pointer select-none text-xs md:text-sm rounded-sm mt-3">
              Sign Up
            </button>
            <div className="w-full py-2 flex justify-center h-fit text-xs md:text-sm font-light text-white">
              {"Already have an account."} ? &nbsp;
              <NavLink className="font-semibold" to="/login">
                Log In
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp
