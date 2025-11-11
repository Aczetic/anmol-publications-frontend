import DoneIcon from '@mui/icons-material/Done';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import * as z  from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Success from "../components/Success";
import SupportForm from '../components/SupportForm';
import Loader1 from '../components/Loader1';

//TODO:update this data
// NOTE : use the first for schema
const ISSUES_DATA = [
  {
    issueId: '2123457',
    issueDate: '2025-10-26T', // Matches new Date().toISOString().slice(0,11)
    resolveDate: null, // Since resolved is false
    subject: 'Login Button Not Responding on Mobile',
    description: 'When users try to log in on an iOS device (Safari), the "Sign In" button is completely unresponsive. It works fine on desktop browsers.',
    resolved: false,
    user: 'alice.jones@example.com',
    responseRequestDate :null, // if no reply comes a request can be generated but once in 24 hours
    trackLink: 'https://localhost:3000/issues/2123457'
  },
  {
    issueId: '2123458',
    issueDate: '2025-10-26T',
    resolveDate: '2025-10-29T', // Resolved 3 days later
    subject: 'Incorrect Tax Calculation in Checkout',
    description: 'The checkout process is applying an incorrect sales tax rate for customers in the state of New York. It seems to be using the old 8.0% rate instead of the current 8.875%.',
    resolved: true,
    user: 'bob.smith@example.com',
    trackLink: 'https://localhost:3000/issues/2123458'
  },
  {
    issueId: '2123459',
    issueDate: '2025-10-26T',
    resolveDate: null,
    subject: 'Database Connection Timeouts Intermittently',
    description: 'Seeing random "504 Gateway Timeout" errors on high-traffic pages. Logs indicate the database query is taking too long to respond.',
    resolved: false,
    user: 'charlie.brown@example.com',
    trackLink: 'https://localhost:3000/issues/2123459'
  },
  {
    issueId: '2123460',
    issueDate: '2025-10-26T',
    resolveDate: '2025-11-01T', // Resolved 6 days later
    subject: 'Broken Image Link on About Us Page',
    description: 'The main header image on the /about page is showing a broken link icon. The asset "team_photo.jpg" seems to be missing from the CDN.',
    resolved: true,
    user: 'diana.prince@example.com',
    trackLink: 'https://localhost:3000/issues/2123460'
  },
  {
    issueId: '2123461',
    issueDate: '2025-10-26T',
    resolveDate: null,
    subject: 'PDF Export Feature Corrupting Filenames',
    description: 'When exporting reports to PDF, any file name containing a special character (like "&" or "#") results in a corrupted file name on download.',
    resolved: false,
    user: 'evan.m@example.com',
    trackLink: 'https://localhost:3000/issues/2123461'
  }
];

//todo: a sidebar will open up which will have a chat app like representation and will poll every 10 second
//todo: implement this, the issues will show in sorted order from latest to oldest always ,desc by date
//todo: the issues will only show if the user is logged in 
//todo: show some text tohelp get the reference
const ResolveGraphics = ({resolved = false}) => {
 return  <div className="flex gap-1 items-center">
    <span
      className={`rounded-full w-5 h-5 ${
        !resolved ? "bg-red-200" : "bg-green-200"
      } flex items-center justify-center ${
        !resolved && "animate-[breathe_2s_ease-in-out_infinite]"
      }`}
    >
      {!resolved ? (
        <div className={`relative z-10 rounded-full w-3 h-3 bg-red-500 `}></div>
      ) : (
        <DoneIcon className="scale-70 text-green-800" />
      )}
    </span>
    <p
      className={`${
        !resolved ? "text-red-900" : "text-green-900"
      } text-xs md:text-sm`}
    >
      {resolved ? 'Resolved' : 'Active'}
    </p>
  </div>;
};

const Issue = ({ issue = null, setIssueInfo }) => {

  return (
    <div className="w-full h-fit rounded-sm bg-white py-4 px-4 shadow-sm flex flex-col gap-1">
      <style>
        {`
          @keyframes breathe {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.7; }
          }`}
      </style>
      <div className="flex gap-2 items-center justify-between">
        <p className="font-bold text-xl md:text-2xl">#{issue.issueId}</p>
        <ResolveGraphics resolved={issue.resolved} />
      </div>
      <p className="w-full text-sm">{issue.subject}</p>
      {/* dates */}
      <div className="text-gray-600 text-sm md:text-md flex gap-1">
        <p>{issue.issueDate.slice(0, issue.issueDate.length - 1)}</p> ------{" "}
        <div>
          {issue.resolved ? (
            issue.resolveDate.slice(0, issue.resolveDate.length - 1)
          ) : (
            <ResolveGraphics resolved={issue.resolved} />
          )}
        </div>
      </div>
      {/* TODO: this will open the issue pop up which will show the issue in full page */}
      <button
        onClick={() => setIssueInfo(issue)}
        className="px-3 py-1 mt-2 text-white bg-black w-fit rounded-sm cursor-pointer select-none text-xs md:text-sm"
      >
        Open
      </button>
    </div>
  );
};

const IssueDetail = ({issue , setIssueInfo , setSuccess = null, setMessage = null})=>{
  
  const handleResolve = () => {
    axios
      .get(import.meta.env.VITE_SERVER_URL+'/issue/resolve/'+issue.issueId, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setSuccess(true);
          setMessage("Issue Resolved");
          setIssueInfo(false);
        }
      }).catch(e=>{
        toast.error("Some error occurred !")
      });
  };
  
  const handleRequestResponse = ()=>{
      axios.get(import.meta.env.VITE_SERVER_URL+'/issues/request-response/'+issue.issueId , {
        withCredentials : true
      }).then(res=>{
        if(res.data.success){
           setSuccess(true);
           setIssueInfo(false);
           setMessage('Response requested');
        }
      }).catch(e=>{
        toast.error("Some error occurred !");
      })
  }

  const handleClose = (e)=>{
     setIssueInfo(null)
  }

  return (
    <>
    <div
      onClick={handleClose}
      className="fixed z-1000 flex items-center top-0 left-0 bg-[#33333399] w-full h-screen"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-8/9 max-w-[45rem] h-fit max-h-7/9 relative top-6 m-auto py-3 bg-white rounded-md flex flex-col border-box"
      >
        <CloseIcon
          onClick={handleClose}
          className="absolute right-2 top-3 cursor-pointer select-none"
        />
        <p className="w-full text-center p-3 font-bold text-3xl">
          #{issue.issueId}
        </p>
        {/* date */}
        <div className="text-gray-600 text-sm md:text-md flex justify-center gap-1">
          <p>{issue.issueDate.slice(0, issue.issueDate.length - 1)}</p> ------{" "}
          <div>
            {issue.resolved ? (
              issue.resolveDate.slice(0, issue.resolveDate.length - 1)
            ) : (
              <ResolveGraphics resolved={issue.resolved} />
            )}
          </div>
        </div>
        <div className = 'w-full flex justify-center mt-3'>
          {
            issue.resolved && <ResolveGraphics resolved={issue.resolved} />
          }
        </div>
        <div className = 'w-full h-fit px-3 py-4'>
          <p className = 'font-semibold text-sm text-gray-500'>Subject :</p> 
          <p className = 'w-full bg-gray-100 text-sm md:text-[1rem] '>{issue.subject}</p>
        </div>
        <div className = 'w-full h-fit px-3 py-2 '>
          <p className = 'font-semibold text-sm text-gray-500'>Detail :</p> 
          <p className = 'w-full h-fit text-sm md:text-[1rem] max-h-[10rem] overflow-y-scroll bg-gray-100'>{issue.description}</p>
        </div>
        {/* TODO:implement it */}
        {
          !issue.resolved && <div className = 'w-full flex'>
              <div onClick = {handleRequestResponse} className = 'btn-primary ml-3 mt-4 text-sm md:text-[1rem] '>Request Response</div>
              <div onClick = {handleResolve} style= {{backgroundColor:'green'}} className = 'btn-primary text-sm md:text-[1rem] ml-3 mt-4'>Resolve</div>
            </div>
        }
      </div>
    </div>
    </>
  );
}


const Support = () => {
  const [issueInfo , setIssueInfo] = useState(false); // state to show/hide issue detail
  const [issues , setIssues] = useState([]); // TODO: make this [] later
  const [success, setSuccess] = useState(false);
  const [message , setMessage] = useState('');
  const [loader , setLoader ] = useState(false);
  const user = useSelector(state=>state.user);


  useEffect(()=>{
    setLoader(true);
    axios.get(import.meta.env.VITE_SERVER_URL+'/issues',{
      withCredentials:true,
    }).then((res)=>{
      if(res.data.success){
        setIssues(res.data.issues)// set the issues to state
      }
      setLoader(false);
    }).catch(e=>{
      toast.error("Some error occurred");
      setLoader(false);
      // todo: remove it later
      setIssues(ISSUES_DATA);
    })  
  },[])



  return (
    <div className="relative w-full h-fit min-h-[100vh]">
      <section className="w-full h-fit p-2 px-3 mt-5 mb-10">
        <h2
          data-aos="fade-up"
          className="mt-2 w-full px-1 md:px-4 font-bold text-xl sm:text-3xl lg:text-4xl text-center text-black"
        >
          {"Facing issues ! Don't worry"}
        </h2>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="w-full text-center text-md md:text-xl"
        >
          {"Raise an issue with the support team"}
        </h2>

        {/* issue can only be raised if logged in  */}
        <SupportForm />
      </section>

      {/* active issues will go here */}
      <section
        data-aos="fade-up"
        data-aos-delay="100"
        className="w-full max-w-150 mx-auto h-fit p-2 px-3 mt-5 mb-10"
      >
        <p className="p-2 w-full text-center text-xl md:text-2xl font-bold gap-2">
          Your Issues
        </p>
        <div className="flex flex-col gap-3">
          {!user ? (
            <p className="w-full text-center">Log In to see your issues</p>
          ) : loader ? (
            <Loader1 className="w-15 mx-auto" />
          ) : issues.length === 0 ? (
            <p className="w-full text-center">No issues yet</p>
          ) : (
            issues.map((issue, index) => {
              return (
                <Issue setIssueInfo={setIssueInfo} key={index} issue={issue} />
              );
            })
          )}
        </div>
      </section>
      {issueInfo && (
        <IssueDetail
          issue={issueInfo}
          setIssueInfo={setIssueInfo}
          setSuccess={setSuccess}
          setMessage={setMessage}
        />
      )}
      <Success message={message} state={success} setState={setSuccess} />
    </div>
  );
}

export default Support
