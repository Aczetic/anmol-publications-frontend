
import CloseIcon from '@mui/icons-material/Close';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import successLottie from '../assets/lottie/success.lottie?url';
import { useEffect } from 'react';


const Success = ({message = '' , state = false , setState = null})=>{

    useEffect(()=>{
        if(state){
          setTimeout(()=>{
            setState(false); // hide the message 
          },5000)
        }
      },[state])

    return state && (
      <div
        onClick={() => setState && setState(false)}
        className="w-screen h-screen z-20000 bg-[#33333333] flex items-center justify-center fixed top-0 left-0"
      >
        <CloseIcon className="text-gray-200 text-md absolute top-22 right-5 cursor-pointer" />
        <div className="w-30 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center bg-white shadow-md rounded-sm">
          <DotLottieReact
            src={successLottie}
            loop={true}
            className="w-8/10 h-8/10"
            autoplay={true}
          />
           {message}
        </div>
      </div>
    )
}

export default Success
