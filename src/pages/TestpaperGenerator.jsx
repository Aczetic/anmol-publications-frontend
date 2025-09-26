import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import underdevelopment_lottie from '../assets/lottie/underdevelopment.lottie?url';

const TestpaperGenerator = () => {
  return (
    <div className = 'w-full h-screen flex flex-col items-center'>
        <DotLottieReact 
          data-aos = 'fade-up'
          src = {underdevelopment_lottie}
          loop = {true}
          className = 'relative w-50 h-50 lg:w-100 lg:h-100 mt-30'
          autoplay = {true}
        />
        <h1 data-aos = 'fade' data-aos-delay = '300' className = 'w-full text-center text-xl md:text-2xl lg:text-3xl p-4'>Under Development Check Back Soon...</h1>
    </div>
  )
}

export default TestpaperGenerator
