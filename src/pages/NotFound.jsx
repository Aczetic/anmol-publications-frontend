import notFound from '../assets/not_found.jpg';

const NotFound = () => {
  return (
    <div className = 'w-full h-full overflow-hidden'>
      <div data-aos = 'zoom-out' data-aos-delay = '100' className = 'w-full min-h-[100vh] overflow-hidden' style = {{backgroundImage : `url(${notFound})`, backgroundSize:'cover', backgroundPosition:'50% 45%'}}>
      </div>
    </div>
  )
}

export default NotFound
