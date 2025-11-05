import careers_img from '../assets/careers.jpg';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import creativity_lottie from '../assets/lottie/creativity.lottie?url'
import integrity_lottie from '../assets/lottie/integrity.lottie?url'
import teamwork_lottie from '../assets/lottie/teamwork.lottie?url'
import impact_lottie from '../assets/lottie/impact.lottie?url'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';

const Job = ({job})=>{
  const [isReadMore , setIsReadMore] = useState(false);
  // todo:implement apply 
  return (
    <div className="relative w-full rounded-sm max-w-100 min-h-20 h-fit flex flex-col gap-1 border-red-500 border-solid border-1 py-4 px-4 bg-white">
      <div className="w-full flex justify-between items-center h-10">
        {/* job title */}
        <p className="w-full font-bold text-xl leading-5">{job.title}</p>
        {/* apply button */}
        <NavLink to = 'mailto:careers@anmoleducationalbooks.com' className=" w-fit text-xs md:text-sm rounded-sm select-none px-4 py-2 md:py-1 text-white bg-red-500 cursor-pointer">
          Apply
        </NavLink>
      </div>
      {/* location */}
      <p className="w-full text-gray-800 text-sm md:text-md ">{job.city}", "{job.state}</p>
      {/* job type */}
      <p className="w-full text-gray-800 text-sm md:text-md">{job.shift}</p>
      {/* requirements */}
      <p className="w-full  text-gray-800">Requirements :</p>
      <ul className="w-full text-xs text-gray-800 sm:text-sm pl-6 list-disc">
        {job.requirements.map((each,index)=><li key = {index}>{each}</li>)}
      </ul>
      {/* responsibilities */}
      {isReadMore && <>
          <p className="w-full  text-gray-800 mt-2">Responsibilities :</p>
          <ul className="w-full text-xs text-gray-800 sm:text-sm pl-6 list-disc">
            {job.responsibilities.map((each,index)=><li key = {index}>{each}</li>)}
          </ul>
        </>
      }
      {
        !isReadMore && <div className = 'absolute left-0 bottom-10 w-full h-10 bg-[linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.63)_100%)]'></div>
      }
      {
        isReadMore?
        <div className = 'relative top-2 text-red-500 select-none cursor-pointer' onClick = {()=>setIsReadMore(false)}>Read Less</div>:
        <div className = 'relative top-2 text-red-500 select-none cursor-pointer' onClick = {()=>setIsReadMore(true)}>Read More</div>
      }
    </div>
  );
}


const Careers = () => {
  const [jobs, setJobs] = useState([ // todo: remove it later
    {
      jobId:'134134',
      title: "Software Engineer",
      city: "Gurgao",
      state: "Haryana",
      shift: "part-time",
      requirements: [
        "2+ years in editing or publishing",
        "Strong English grammar & communication skills",
        "Familiarity with academic publishing is a plus",
      ],
      responsibilities: [
        "2+ years in editing or publishing",
        "Strong English grammar & communication skills",
        "Familiarity with academic publishing is a plus",
      ],
    },
    {
      jobId:'1341334',
      title: "Software Engineer",
      city: "Gurgao",
      state: "Haryana",
      shift: "part-time",
      requirements: [
        "2+ years in editing or publishing",
        "Strong English grammar & communication skills",
        "Familiarity with academic publishing is a plus",
      ],
      responsibilities: [
        "2+ years in editing or publishing",
        "Strong English grammar & communication skills",
        "Familiarity with academic publishing is a plus",
      ],
    },
    {
      jobId:'1342134',
      title: "Software Engineer",
      city: "Gurgao",
      state: "Haryana",
      shift: "part-time",
      requirements: [
        "2+ years in editing or publishing",
        "Strong English grammar & communication skills",
        "Familiarity with academic publishing is a plus",
      ],
      responsibilities: [
        "2+ years in editing or publishing",
        "Strong English grammar & communication skills",
        "Familiarity with academic publishing is a plus",
      ],
    },
    {
      jobId:'1342134',
      title: "Software Engineer",
      city: "Gurgao",
      state: "Haryana",
      shift: "part-time",
      requirements: [
        "2+ years in editing or publishing",
        "Strong English grammar & communication skills",
        "Familiarity with academic publishing is a plus",
      ],
      responsibilities: [
        "2+ years in editing or publishing",
        "Strong English grammar & communication skills",
        "Familiarity with academic publishing is a plus",
      ],
    },
  ]);
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_SERVER_URL}/jobs`).then((res)=>{
      if(res.data.success){
        setJobs(res.data.data);
      }
    }).catch(e=>{
      toast.error("Some error occurred !");
    })
  },[]);
  return (
    <div className="w-full h-fit mb-10">
      {/* header */}
      <div
        data-aos="fade"
        data-aos-delay='200'
        className="w-full h-50 md:h-80 relative flex flex-col justify-center items-center bg-no-repeat md:bg-cover bg-position-[76%_52%]"
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
            {/* animations */}
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
                  speed={0.8}
                />
                Integrity
              </div>

              <div className="flex gap-1 text-2xl items-center">
                <DotLottieReact
                  src={teamwork_lottie}
                  loop
                  autoplay
                  className="w-15 h-15 lg:w-20 lg:h-20"
                  speed={0.6}
                />
                Teamwork
              </div>

              <div className="flex gap-1 text-2xl items-center">
                <DotLottieReact
                  src={impact_lottie}
                  loop
                  autoplay
                  speed={0.5}
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
            {jobs.map(job=>{
             return <Job job = {job}/>
            })}
        </div>
      </div>
    </div>
  );
}

export default Careers
