import React from 'react'
import aboutus from '../assets/about_us.jpeg';


const AboutUs = () => {
  return (
    <div className = 'w-full h-fit flex flex-col'>
        <div data-aos = 'fade' data-aos-delay = '250' className = 'w-full flex justify-center h-40 md:h-100' style = {{backgroundImage : `url(${aboutus})`, backgroundPosition:'center',backgroundSize:'100%', backgroundRepeat:'no-repeat'}}>
          <p data-aos = 'zoom-in' className = 'text-red-50 text-[2.5rem] md:text-[4rem] text-center font-bold relative h-fit top-2 md:top-10'>About Us</p>
        </div>
        <div data-aos = 'fade-up' className = 'w-full h-fit p-2 flex flex-col items-center mt-0 md:mt-10'>
          <p className = 'w-full text-xs md:text-sm ld:text-xl max-w-[800px] p-3 '>
          At Anmol Publications, we combine academic rigor with innovation to deliver NEP 2020-certified educational solutions that empower schools, teachers, and students alike. Serving 100+ schools with 50+ books across 40+ subjects, we are a trusted partner in shaping modern education in India.
          We go beyond traditional publishing to provide a complete learning suite that blends high-quality printed materials with cutting-edge digital resources.
          </p>
          <h1 className = 'w-full max-w-[800px] font-bold text-[1.5rem] p-3'>Why Schools Choose Us!</h1>
          <section className="mx-auto max-w-4xl px-6  py-4 md:py-8">
            <ul className="w-full max-w-[800px] grid gap-4 sm:grid-cols-2">
              <li className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900">NEP 2020-Certified Books</h3>
                <p className="mt-1 text-xs text-gray-600">Fully aligned with the 5+3+3+4 curriculum structure for inclusive, future-ready education.</p>
              </li>

              <li className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900">AI-Powered Digital Tools</h3>
                <p className="mt-1 text-xs text-gray-600">Includes test generators, chapter-wise chatbots, and instant doubt-solving support.</p>
              </li>

              <li className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900">Seamless Digital Integration</h3>
                <p className="mt-1 text-xs text-gray-600">E-book access, LMS platforms, and interactive content for anywhere learning.</p>
              </li>

              <li className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-900">Holistic & Multilingual Learning</h3>
                <p className="mt-1 text-xs text-gray-600">Designed to encourage critical thinking, creativity, and collaborative learning.</p>
              </li>

              <li className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:col-span-2">
                <h3 className="text-sm font-medium text-gray-900">Teacher Empowerment</h3>
                <p className="mt-1 text-xs text-gray-600">Ready-made lesson plans, model test papers, and practical classNameroom resources.</p>
              </li>
            </ul>
          </section>
        </div>
    </div>
  )
}

export default AboutUs
