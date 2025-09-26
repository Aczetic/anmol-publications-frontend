import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';  
import { useEffect, useState } from 'react';

const Faq = ()=>{
    useEffect(()=>console.log('remounted'),[]);
    const [visible , setVisible] = useState(false);
    return (
      <div className="w-full border-box max-w-200 h-fit bg-red-100 flex flex-col rounded-t-xl rounded-b-none">
        <div className="p-3 h-fit min-h-10 flex justify-between cursor-pointer"  onClick={() => setVisible((v) => !v)}>
          <p className={`text-sm md:text-lg flex items-center font-semibold break-words`}>
            This is a questions here whose answer you
            wiasd fasdfasdfa sdfasdfa sdfasdfasd d fasdf 
          </p>
          <span
            className={`mt-1 h-fit cursor-pointer transform duration-300 ease-in-out
                fill-current
                ${visible ? "rotate-180" : "rotate-0"}`}
           
          >
            <ExpandCircleDownIcon className="text-gray-700" />
          </span>
        </div>
        <div className={`text-sm md:text-md w-full px-3 duration-200 overflow-hidden overflow-y-scroll ${visible?'h-22 py-3':'h-0 py-0'}  bg-red-200 text-gray-800`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint magnam
          aliquam velit doloribus corporis aliquid et ab voluptates suscipit
          iure? Rem libero dolore voluptatibus sit rerum maiores, laborum enim
          odio eius ratione mollitia ipsam consectetur voluptate. Numquam ipsum,
          sequi labore soluta, eligendi repellat tempora repudiandae rerum,
          impedit vel recusandae odit! 
        </div>
      </div>
    );
}





const Faqs = () => {
  return (
    <div className="w-full h-fit mb-20">
      {/* heading */}
      <div className="mt-4 w-full h-50 flex flex-col items-center justify-center">
        <h2
          data-aos="fade-up"
          className="w-full text-center font-bold text-2xl md:text-5xl"
        >
          Frequently Asked Questions
        </h2>
        <h3
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-5 w-full max-w-200 px-2 md:px-4 font-light text-gray-600 text-sm md:text-xl text-center"
        >
          {
            "Have questions? We’ve gathered answers to some of the most common queries about our books, services, and policies.If you don’t find what you’re looking for, feel free to reach out to our support team."
          }
        </h3>
      </div>
      <section className="w-full h-fit">
        {/* search bar will go here for searching faqs*/}
      </section>
      <section
        data-aos="fade-up"
        className="w-full h-fit p-3 md:p-4 md:px-10 flex flex-col gap-4 items-center"
      >
        {/* faqs will here */}
        {/* todo:this is should be dynamic coming from backend and should have panel to input more */}
        <Faq />
        <Faq />
        <Faq />
        <Faq />
        <Faq />
        <Faq />
        <Faq />
        <Faq />
        <Faq />
        <Faq />
        <Faq />
      </section>
      {/* issue raising form */}
      <section className="w-full h-fit p-2 px-3 mt-5 mb-10">
        <h2 data-aos = 'fade-up'  className="mt-2 w-full px-1 md:px-4 font-bold text-xl sm:text-3xl lg:text-4xl text-center text-black">
          {"Still can't find your issue"}
        </h2>
        <h2 data-aos = 'fade-up' data-aos-delay = '100' className="w-full text-center text-md md:text-xl">
          {"Raise an issue with the support team"}
        </h2>

        {/* issue can only be raised if logged in  */}
        <form data-aos = 'fade-up' className="w-full rounded-sm text-xs sm:text-sm md:text-md max-w-150 mx-auto h-fit p-5 flex flex-col gap-2 bg-red-100 mt-10">
          <label className="flex flex-col gap-1" htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full p-1 px-2 bg-white"
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              placeholder="Your email , you're logged in with"
              className="w-full p-1 px-2 bg-white"
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="problem">
            Issue
            <textarea
              id="issue"
              type="text"
              placeholder="Issue you're facing in 300 words"
              maxLength={300}
              className="w-full h-25 resize-none p-1 px-2 bg-white"
            ></textarea>
          </label>
          {/* todo:implement this  */}
          <button className="w-fit px-3 mt-3 rounded-sm select-none cursor-pointer py-1 bg-red-500 text-white">
            Submit
          </button>
        </form>
      </section>
  
    </div>
  );
}

export default Faqs
