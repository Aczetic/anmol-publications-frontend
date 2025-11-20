import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';  
import React, { useEffect, useState } from 'react';
import SupportForm from '../components/SupportForm';
import Loader1 from '../components/Loader1';
import { NavLink } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';


//fragments were used beacuse of key warning
const FormatText = ({text=''})=>{
  const textArr = text.split(' ').map((each,index)=>{
    if( each[0] === '['){
      const words = each.split(',');
      return <React.Fragment key = {index}>
      <NavLink className = 'font-bold text-red-500' to ={words[1].slice(0,words[1].length-1)} >{words[0].slice(1).split('-').join(' ')}</NavLink>{" "}
      </React.Fragment>
    
    }else if( each.includes('-')){ // if not for link then for boldness
     
      return <React.Fragment key = {index}>
      <b key = {crypto.randomUUID()}>{each.split('-').join(' ')}</b>{" "}
      </React.Fragment>
    
    }else{
      return <React.Fragment key = {index}>
        {each+' '}
      </React.Fragment>
    }
  })
  return <>
    {textArr}
  </>
}
//NOTE: [word,link] with no space and space for word is '-' there like [youtube-my,https://youtube.com]
// for bol - like 'hello-world'
const FAQS = [
  {
    question:'Are your textbooks truly aligned with the NEP 2020 framework?',
    answer:'-Yes, our textbooks rigorously-follow the NEP-2020-framework-(5+3+3+4-structure), focusing on holistic-development. We blend this content with a digital-suite (AI-tools,-LMS, Testpaper-Generator) to ensure a fresh-novel-and-highly-engaging learning experience that innovates beyond standard textbook delivery.'
  },
  {
    question:'Do the physical textbooks come with any access codes or keys for the digital content?',
    answer:`-No, the physical textbooks do not contain any access code. To gain access, an -account on the website is required. Teachers gain access to digital services through the -Principal's/Admin's invitation, and students can get access through a -teacher's invitation.`
  },
  {
    question:'Can we customize the book package for a specific grade or stream?',
    answer:"We-are-highly-flexible-regarding-curriculum-customization. Our priority is to align perfectly with your institution's specific academic requirements. Please [contact-us,/contact-us] for tailored package configurations based on grade, stream, or specific pedagogical needs. We look forward to designing the ideal solution for you."
  },
  {
    question:'What is the print quality, and what is the ordering/delivery timeline for bulk school orders?',
    answer:'Our print quality utilizes industry-standard, high-quality-paper and durable-binding suitable for the K-12 environment, ensuring longevity through the academic year. For bulk-school-orders, processing time is typically 24-to-48-working-hours post confirmation. Standard delivery timelines across India generally range from 5-to-10-business-days after dispatch, although remote locations may require slightly longer transit times. Specific timelines for very large orders will be confirmed during the final quote stage.'
  },
  {
    question:'What are the device and software requirements for students and teachers to access the digital resources?',
    answer:'Our digital services ensure universal-compatibility, accessible across all-standard-devices (tablets, smartphones, PCs). Access requires only a stable-internet-connection and an updated-web-browser supporting the latest web technologies.'
  },
  {
    question:'What is the process for obtaining technical support regarding any technical error?',
    answer:'The technical support protocol is streamlined-for-efficiency. Users simply raise-an-issue via our dedicated [support,/support] page. We commit to an initial response within-one-business day, and all raised issues remain fully-trackable within that same platform.'
  },
  {
    question:'How do you handle updates to the digital content to keep it current with syllabus changes?',
    answer:`We maintain rigorous-oversight of evolving educational guidelines and syllabus changes. Since the majority of our learning suite is -web—delivered, content synchronization is highly efficient. Updates to all digital services including the LMS and associated resources are deployed automatically and instantaneously, requiring no-manual-action from teachers or students to ensure immediate curriculum alignment.`
  }
  
]// let it be here don't remove it , will give idea to what to do

const Faq = ({question='' , answer=''})=>{
    const [visible , setVisible] = useState(false);
    return (
      <div className="w-full border-box max-w-200 h-fit bg-red-100 flex flex-col rounded-t-xl rounded-b-none">
        <div className="p-3 h-fit min-h-10 flex justify-between cursor-pointer"  onClick={() => setVisible((v) => !v)}>
          <p className={`text-sm md:text-lg flex items-center font-semibold break-words`}>
            {question}
          </p>
          <span
            className={`mt-1 h-fit cursor-pointer transform duration-300 ease-in-out
                fill-current
                ${visible ? "rotate-180" : "rotate-0"}`}
          >
            <ExpandCircleDownIcon className="text-gray-700" />
          </span>
        </div>
        <div className={`text-sm md:text-[0.95rem] w-full px-3 duration-200 overflow-hidden overflow-y-scroll ${visible?'h-22 py-3':'h-0 py-0'}  bg-red-200 text-gray-800`}>
          {<FormatText text = {answer}/>}
        </div>
      </div>
    );
}


const Faqs = () => {
  const [faqs , setFaqs] = useState([]);

  useEffect(()=>{
    axios.get( `${import.meta.env.VITE_SERVER_URL}/faqs`)
    .then(res=>{
      if(res.data.success){
        setFaqs(res.data.data);
        console.log(res.data.data);
      }
    }).catch(e=>{
      toast.error("Some error occurred!");
    })
  },[])

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
        className="w-full h-fit p-3 md:p-4 md:px-10 flex flex-col gap-8 items-center"
      >
        {/* faqs will here */}
        {/* todo:this is should be dynamic coming from backend and should have panel to input more */}
      {
        faqs.length > 0 ? faqs.map((each,index)=>{
          return <Faq key = {index} question = {each.question} answer = {each.answer}/>
        }) : <Loader1 className = 'scale-50'/>
      }
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
        <SupportForm/>
      </section>
  
    </div>
  );
}

export default Faqs
