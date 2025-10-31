import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { setUser } from '../features/userSlice';
import Loader1 from './Loader1';

const Otp = ({email , path}) => {
  const [input , setInput] = useState('    ');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting , setIsSubmitting] = useState(false);
  const inputsRef = useRef(0);
  const inputContainerRef = useRef(null);
  const [timer, setTimer] = useState({state:false , time:120}); // timer for being able to resend the otp , this is an object which contains true/false and time in s
  const timerIntervalRef = useRef(null);
  const timerStarter = ()=>{
    setTimer({state : false , time:120}) // reset value 
    
    timerIntervalRef.current = setInterval(()=>{
      setTimer(curr => { 
          if(curr.time <= 0){
            clearInterval(timerIntervalRef.current); // stop the timer;
            return {state:true , time : 0} // end value
          }
          return {...curr , time : curr.time-1}
       })
    }, 1000);
    return ()=>clearInterval(timerIntervalRef.current);
  }



  const handleOnChange = (index,value)=>{
    if(value === '') return; // this is for when clicking on an input box the input clears
    let newVal = input.split('')
    input.split('').forEach((e,index)=>newVal[index] = e); 
    newVal[index] = value.toString();
    setInput(newVal.join(''));
  } 
  
  const validate = ()=>{
    return input.split('').every(e=>e >= '0' && e <= '9');
  }

  const handleSubmit = ()=>{
    if(isSubmitting) return; // to prevent resubmitting until result of previous comes
    else setIsSubmitting(true); // set the submitting state to true
   
    if(!validate()) {// if the validation fails don't
      toast.error('Enter a valid OTP !');
      setInput('    ');
      setIsSubmitting(false);
      return;
    }
    
    axios.post(import.meta.env.VITE_SERVER_URL + '/auth/verify-otp' , {
      path, email,
      otp : input 
    },{
      withCredentials:true,
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>{
       if(res.data.message === 'SUCCESS' ){
          dispatch(setUser(res.data.user)) // set the user data in store
          window.localStorage.setItem('user',JSON.stringify(res.data.user))// set the data also in local storage 
          toast.success(path === 'signup'? 'Signed up successfully !': "Logged in successfully")
          setTimeout(()=>navigate(res.data.user.role!='principal' && res.data.user.role != 'admin' ?'/profile':'/dashboard'), 2000);

        }else if (res.data.message === 'INCORRECT_OTP'){
          toast.error(`Enter correct OTP you have ${res.data.chances} chances left`);
          setIsSubmitting(false);
          setInput('    ');
        
        }

    }).catch(e=>{
      console.log(e);
      if (e.response.data.message === 'OTP_EXHAUSTED'){
        toast.error('No chances left! Try after some time')
        setIsSubmitting(false);
        setInput('    ')
      }else{
        toast.error('Some error occurred ! Try again later.')
        setIsSubmitting(false);
        setInput('    ');
      }
    })
  }

  const handleFocus = function(e,index){
    inputsRef.current = index+1; // +1 more than self to set the focus for next when input is set 
    e.target.setSelectionRange(0,e.target.value.length)
  }

  const handleResend = ()=>{

     timerStarter(); // start the timer

     axios.post(import.meta.env.VITE_SERVER_URL+'/auth/resend-otp',{
       email , path
     },{
       withCredentials:true,
       headers:{
        'Content-Type':'application/json'
       }
     }).then(res=>{
        if(res.data.message === 'SUCCESS'){
          toast.success('OTP re-sent !')
        }else if(res.data.message === 'LOG_IN'){
          navigate('/login')
        }

     }).catch(e=>{
        toast.error('Some error occured ! Try again later.')
     })
  }

  //handling focus change
  useEffect(()=>{
    if(inputsRef.current < 4){
      const currentInputElem = inputContainerRef.current.children[inputsRef.current];
      currentInputElem.focus();
      // inputsRef.current = (++inputsRef.current) ---- instead of incrementing focus here the inputs will provide the next focus element 
      // as the .focus() above is bring the elems in focus so elems focus event will get triggered , that is used to choose next elem to get in focus if the 
      // data of current elem is changed
    }else{
       // after the last inputs focus next to should be blur out of all
       inputContainerRef.current.children[3].blur();
    }

  },[input])

  useEffect(timerStarter,[])
  
  return (
    <div className="w-full text-xs lg:text-sm lg:min-h-full flex justify-center items-center">
      {/* otp form */}
      <div className="w-full h-fit flex flex-col items-center justify-center gap-5">
        {/* heading */}
        <div className="w-full flex flex-col items-center gap-1">
          <h1 className="w-full font-bold text-2xl lg:text-4xl text-center text-red-400 lg:text-red-700">
            One Time Password
          </h1>
          <div className="text-gray-200 lg:text-gray-500 text-xs lg:text-sm">
            Enter the OTP we've sent to <b>{email}</b>
          </div>
        </div>
        
        {/* otp entry  */}
        <div
          ref={inputContainerRef}
          className="w-full flex justify-center items-center gap-2 "
        >
          {/* set selection range is to select all text */}
          <input
            type="text"
            value={input[0]}
            onFocus={(e) => {
              handleFocus(e, 0);
            }}
            onChange={(e) => handleOnChange(0, parseInt(e.target.value) % 10)}
            className="w-10 h-10 lg:w-15 lg:h-15 appearance-none text-center rounded-sm bg-red-100"
          />
          <input
            type="text"
            value={input[1]}
            onFocus={(e) => {
              handleFocus(e, 1);
            }}
            onChange={(e) => handleOnChange(1, parseInt(e.target.value) % 10)}
            className="w-10 h-10 lg:w-15 lg:h-15 appearance-none text-center rounded-sm bg-red-100"
          />
          <input
            type="text"
            value={input[2]}
            onFocus={(e) => {
              handleFocus(e, 2);
            }}
            onChange={(e) => handleOnChange(2, parseInt(e.target.value) % 10)}
            className="w-10 h-10 lg:w-15 lg:h-15 appearance-none text-center rounded-sm bg-red-100"
          />
          <input
            type="text"
            value={input[3]}
            onFocus={(e) => {
              handleFocus(e, 3);
            }}
            onChange={(e) => handleOnChange(3, parseInt(e.target.value) % 10)}
            className="w-10 h-10 lg:w-15 lg:h-15 appearance-none text-center rounded-sm bg-red-100"
          />
        </div>

        {/* resend otp */}
        <div className="w-full flex flex-col items-center">
          <p className="w-full font-semibold text-lg text-center text-gray-200 lg:text-gray-700">
            Didn't recieve the code yet ?
          </p>
          {
            timer.state === true? 
            <div onClick = {handleResend} className="font-semibold text-[0.9rem] text-red-200 lg:text-red-700 cursor-pointer select-none">Resend OTP</div>

            :<div className="text-red-200 lg:text-red-600 text-[0.9rem] flex gap-1">
              <div className="font-semibold text-red-100 lg:text-red-400 cursor-pointer select-none">
                Resend OTP
              </div>{" "}
              in{" "}
              <span className="border-box w-5 h-fit">{`${Math.floor(
                timer.time / 60
              )}:${timer.time % 60}`}</span>
            </div>
          }
        </div>

        {/* submit */}
        <div className="w-full flex flex-col items-center gap-2 ">
          <button
            onClick={handleSubmit}
            className="w-70 lg:w-80 select-none cursor-pointer rounded-sm text-white bg-black"
          >
            {isSubmitting ? (
              <Loader1 className="w-full h-10 text-center" />
            ) : (
              <p className="py-2">Submit</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Otp
