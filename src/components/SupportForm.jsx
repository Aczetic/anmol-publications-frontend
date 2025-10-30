import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z  from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Success from '../components/Success';


const SupportFormSchema = z.object({
    name: z
      .string("Enter a valid name")
      .min(3, "Atleast 3 characters")
      .transform(
        (val) =>val.split(" ").map((each) => each[0]?.toUpperCase() + each?.slice(1)).join(" ")
      ),
    email: z.email("Enter a valid email address"),
    subject: z
      .string("Invalid value")
      .min(4, "Enter a valid subject")
      .max(50, "Not more than 50 words"),
    issue: z
      .string("Enter a valid value")
      .min(30, "Atleast 30 words")
      .max(300, "Not more than 200 words"),
  });
  
  const SupportForm = () => {
    const [successVisible , setSuccessVisible] = useState(false);
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(SupportFormSchema),
    });
  
    const user = useSelector(state => state.user);
  
    const onSubmit = (data)=>{
      
      axios.post(import.meta.env.VITE_SERVER_URL+'/issue',{...data},{
       withCredentials:true,
       headers:{
         'Content-Type':'application/json',
       }  
      }).then(res=>{
         if(res.data.success){
           setSuccessVisible(true); 
           reset(); // reset the form
         }
      }).catch(e=>{
         if(e.message === 'Network Error'){
             toast.error("Unable to connect with server !");
         }else toast.error("Some error occurred!");
      })
   } 
  
    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-aos="fade-up"
          className="w-full rounded-sm text-xs sm:text-sm md:text-md max-w-150 mx-auto h-fit p-5 flex flex-col gap-2 bg-red-100 mt-10"
        >
          <label className="flex flex-col gap-1" htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full p-1 px-2 bg-white"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </label>
  
          <label className="flex flex-col gap-1" htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              defaultValue={user?.email}
              placeholder="Your email , you're logged in with"
              className="w-full p-1 px-2 bg-white"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </label>
          <label className="flex flex-col gap-1" htmlFor="subject">
            Subject
            <input
              id="subject"
              type="text"
              placeholder="Subject"
              className="w-full p-1 px-2 bg-white"
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-red-500 text-xs">{errors.subject.message}</p>
            )}
          </label>
          <label className="flex flex-col gap-1" htmlFor="problem">
            Issue
            <textarea
              id="issue"
              type="text"
              placeholder="Issue you're facing in 300 words"
              maxLength={300}
              className="w-full h-25 resize-none p-1 px-2 bg-white"
              {...register("issue")}
            ></textarea>
            {errors.issue && (
              <p className="text-red-500 text-xs">{errors.issue.message}</p>
            )}
          </label>
          {/* todo:implement this  */}
          <button className="w-fit px-3 mt-3 rounded-sm select-none cursor-pointer py-1 bg-red-500 text-white">
            Submit
          </button>
        </form>
        {/* success markup */}
        <Success state = {successVisible} message = {'Issue Raised'} setState = {setSuccessVisible}/>
      </>
    );
  };


  export default SupportForm;