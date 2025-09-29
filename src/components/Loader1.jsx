import loader1 from '../assets/lottie/loader1.lottie?url';

const Loader1 = ({className = ''}) => {
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

export default Loader1;
