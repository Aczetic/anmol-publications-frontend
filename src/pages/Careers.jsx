import careers_img from '../assets/careers.jpg';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import creativity_lottie from '../assets/lottie/creativity.lottie?url'
import integrity_lottie from '../assets/lottie/integrity.lottie?url'
import teamwork_lottie from '../assets/lottie/teamwork.lottie?url'
import impact_lottie from '../assets/lottie/impact.lottie?url'
import { useState } from 'react';

const Job = ()=>{
  const [isReadMore , setIsReadMore] = useState(false);
  // todo:implement apply 
  return (
    <div className="w-full max-w-100 min-h-20 h-fit flex flex-col gap-1 border-red-500 border-solid border-1 py-2 px-4 bg-white">
      <div className="w-full flex justify-between items-center h-10">
        {/* job title */}
        <p className="w-full font-bold text-xl">Software Developer</p>
        {/* apply button */}
        <button className="w-30 rounded-sm select-none px-2 py-1 text-white bg-red-500 cursor-pointer mt-2">
          Apply
        </button>
      </div>
      {/* location */}
      <p className="w-full text-gray-800 ">Greater Noida , UP</p>
      {/* job type */}
      <p className="w-full text-gray-800 sm:text-md">Full Time</p>
      {/* requirements */}
      <p className="w-full  text-gray-800 mt-2">Requirements :</p>
      <ul className="w-full text-xs text-gray-800 sm:text-sm pl-6 list-disc">
        <li>2+ years in editing or publishing</li>
        <li>Strong English grammar & communication skills</li>
        <li>Familiarity with academic publishing is a plus</li>
      </ul>
      {/* responsibilities */}
      {isReadMore && <>
          <p className="w-full  text-gray-800 mt-2">Responsibilities :</p>
          <ul className="w-full text-xs text-gray-800 sm:text-sm pl-6 list-disc">
            <li>2+ years in editing or publishing</li>
            <li>Strong English grammar & communication skills</li>
            <li>Familiarity with academic publishing is a plus</li>
          </ul>
        </>
      }
      {
        isReadMore?
        <div className = 'text-red-500 select-none cursor-pointer' onClick = {()=>setIsReadMore(false)}>Read Less</div>:
        <div className = 'text-red-500 select-none cursor-pointer' onClick = {()=>setIsReadMore(true)}>Read More</div>
      }
    </div>
  );
}


const Careers = () => {
  return (
    <div className="w-full min-h-[100vh]">
      {/* header */}
      <div
        data-aos="fade"
        className="w-full h-50 md:h-80 relative flex flex-col justify-center items-center bg-position-[76%_52%]"
        style={{ backgroundImage: `url(${careers_img})` }}
      >
        <div className="bg-red-900 z-200 absolute top-0 w-full h-full opacity-65"></div>
        <p
          data-aos="fade-up"
          className="relative z-200 text-3xl md:text-6xl w-full font-bold text-center px-2 lg:px-0 text-red-50"
        >
          Join Our Team
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="relative z-200 text-md md:text-2xl text-center px-3 max-w-150 lg:max-w-full text-red-50"
        >
          Be part of a mission-driven company that is shaping the future of
          learning.
        </p>
      </div>
      <div>
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
          {/* Intro Section */}
          <section className="space-y-2">
            <h1
              data-aos="fade-up"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
            >
              Careers at Anmol Educational Books :
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-gray-700 text-[0.9rem] sm:text-[1rem] md:text-md"
            >
              At Anmol Educational Books, we believe knowledge empowers
              individuals and transforms communities. If you’re passionate about
              education, innovation, and making a positive impact, you’ll find a
              fulfilling career with us. We are dedicated to nurturing talent
              and providing an environment where ideas can flourish. Here, your
              work directly contributes to shaping the way students, educators,
              and institutions engage with learning. Whether you’re an
              experienced professional or just starting your career, you’ll have
              the opportunity to grow, collaborate with passionate colleagues,
              and make a lasting difference in the world of education.
            </p>
          </section>

          {/* Why Work With Us */}
          <section className="space-y-2">
            <h2
              data-aos="fade-up"
              className="text-xl md:text-3xl font-semibold text-gray-900"
            >
              Why Choose Anmol Educational Books?
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-gray-700 text-[0.9rem] sm:text-[1rem] md:text-md"
            >
              We’re not just a publishing company — we’re educators, innovators,
              and lifelong learners. From curating meaningful content to
              exploring digital platforms, every project we take on is rooted in
              a commitment to inspire learners across the globe. When it comes
              to building our marketing team, we value individuals who are
              curious, creative, and results-driven. We look for people who can
              craft compelling campaigns, understand digital trends, and connect
              authentically with our audience. Strong communication skills,
              strategic thinking, and the ability to analyze data are qualities
              we deeply appreciate. Whether it’s social media, content
              marketing, partnerships, or outreach, we seek candidates who are
              eager to blend creativity with impact and help us bring
              educational resources to more learners worldwide.
            </p>
          </section>

          {/* Our Culture & Values */}
          <section className="space-y-2">
            <h2
              data-aos="fade-up"
              className="text-xl md:text-3xl font-semibold text-gray-900"
            >
              Life at Anmol Educational Books :
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-gray-700 text-[0.9rem] sm:text-[1rem] md:text-md"
            >
              We foster an inclusive workplace where ideas are celebrated,
              collaboration is valued, and growth is encouraged. Our values are
              simple yet powerful: integrity, creativity, teamwork, and impact.
            </p>
            <div
              data-aos="fade-up"
              data-aos-delay="150"
              className="flex flex-col gap-3 md:grid grid-cols-2 font-bold text-red-500"
            >
              <div className="flex gap-2 w-fit text-2xl items-center">
                <DotLottieReact
                  src={creativity_lottie}
                  loop
                  autoplay
                  className="w-15 h-15 lg:w-20 lg:h-20"
                  speed={0.7}
                />
                Creativity
              </div>

              <div className="flex gap-1 text-2xl items-center">
                <DotLottieReact
                  src={integrity_lottie}
                  loop
                  autoplay
                  className="w-15 h-15 lg:w-20 lg:h-20"
                  speed={0.7}
                />
                Integrity
              </div>

              <div className="flex gap-1 text-2xl items-center">
                <DotLottieReact
                  src={teamwork_lottie}
                  loop
                  autoplay
                  className="w-15 h-15 lg:w-20 lg:h-20"
                  speed={0.7}
                />
                Teamwork
              </div>

              <div className="flex gap-1 text-2xl items-center">
                <DotLottieReact
                  src={impact_lottie}
                  loop
                  autoplay
                  speed={0.7}
                  className="w-15 h-15 lg:w-20 lg:h-20"
                />
                Impact
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* jobs */}
      <div data-aos = 'fade-up' className="w-full h-fit flex flex-col gap-3 border-box max-w-4xl py-4 mx-auto px-6 space-y-10">
        <p className="font-bold text-center text-4xl">Open Roles</p>
       <div className ='w-full max-w-250 flex flex-wrap gap-4 justify-around'>
            {/* single job */}
            {/* todo: make it dynamic */}
            <Job/>
            <Job/>
            <Job/>
            <Job/>

        </div>
      </div>
    </div>
  );
}

export default Careers
