import loader2 from '../assets/lottie/loader2.lottie?url';

const Loader2 = ({className = ''}) => {
  return (
    <DotLottieReact
      data-aos="fade-up"
      src={loader1}
      loop={true}
      className={className || "relative hidden lg:block lg:w-15 lg:h-15"}
      autoplay={true}
    />
  );
};

export default Loader2;
