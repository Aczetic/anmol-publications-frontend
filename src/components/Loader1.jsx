import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loader1 from '../assets/lottie/loader1.lottie?url';


const Loader1 = ({className = ''}) => {
  return (
    <DotLottieReact
      src={loader1}
      loop={true}
      className={className || "relative lg:block lg:w-15 lg:h-15"}
      autoplay={true}
      speed = {0.7}
    />
  );
};

export default Loader1;
