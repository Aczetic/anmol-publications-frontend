import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loader2 from '../assets/lottie/loader2.lottie?url';

const Loader2 = ({className = ''}) => {
  return (
    <DotLottieReact
      src={loader2}
      loop={true}
      className={className || "relative hidden lg:block lg:w-15 lg:h-15"}
      autoplay={true}
      speed = {0.8}
    />
  );
};

export default Loader2;
