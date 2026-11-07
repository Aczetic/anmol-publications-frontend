import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import axios from "axios";
import FlipBook from "../components/FlipBook.jsx";
import Loader1 from "../components/Loader1";
import NoSampleIcon from "@mui/icons-material/AutoStoriesOutlined";
import NotSubscribedIcon from "@mui/icons-material/LockOutlined";
import { withRedirect } from "../utils/redirect";

// shown in place of the flipbook when the book can't be read
const BookMessage = ({Icon , title , text , children})=>(
    <div className = 'w-full flex-1 flex flex-col justify-center items-center gap-3 text-gray-500 select-none text-center px-4'>
        <Icon style = {{fontSize:'5rem'}}/>
        <p className = 'text-base md:text-lg font-semibold text-black'>{title}</p>
        <p className = 'text-sm'>{text}</p>
        {children}
    </div>
)

// only logged in users reach here (route is inside Protected) , the backend also checks the subscription
const ReadSample = ()=>{
    const {id} = useParams();
    const navigate = useNavigate();
    const [book , setBook] = useState(null);
    const [pages , setPages] = useState([]);
    const [status , setStatus] = useState('loading'); // loading | ready | not-subscribed | not-available

    useEffect(()=>{
        setStatus('loading');

        axios.get(`${import.meta.env.VITE_SERVER_URL}/books/book-details/${id}`)
        .then(res=>setBook(res.data.data))
        .catch(e=>console.log(e))

        // presigned links of the book pages in r2 , they expire after some time
        axios.get(`${import.meta.env.VITE_SERVER_URL}/books/sample/${id}`,{
            withCredentials:true // the sample route needs the login cookie
        })
        .then(res=>{
            setPages(res.data.data.pages);
            setStatus('ready');
        })
        .catch(e=>{
            console.log(e);
            if(e.response?.status === 401){ // session expired in between , login again and come back here
                navigate(withRedirect('/login', `/read-sample/${id}`), {replace: true});
                return;
            }
            setStatus(e.response?.data?.message === 'NOT_SUBSCRIBED' ? 'not-subscribed' : 'not-available');
        })
    },[id])

    if(status === 'loading')
        return <div className = 'w-full h-[80vh] flex justify-center items-center'><Loader1 className = 'scale-70 w-20 md:w-30'/></div>

    return (
        <div className = 'w-full h-[calc(100dvh-4rem)] px-2 md:px-8 py-4 flex flex-col gap-2'>{/* 4rem is the space left for the navbar */}
            <div className = 'shrink-0 flex justify-between items-center gap-2'>
                <h1 className = 'text-lg md:text-2xl font-semibold'>{book?.name}</h1>
                <NavLink to = {'/book-details/' + id} className = 'py-2 px-4 text-sm bg-black text-white rounded-sm select-none'>Back</NavLink>
            </div>
            {status === 'ready' && <FlipBook source = {pages} className = 'w-full flex-1 min-h-0'/>}
            {status === 'not-subscribed' &&
                <BookMessage Icon = {NotSubscribedIcon} title = 'Book not subscribed' text = 'This book is not in your subscription yet.'>
                    <NavLink to = '/contact-us' className = 'py-2 px-4 text-sm bg-black text-white rounded-sm select-none'>Contact us to subscribe</NavLink>
                </BookMessage>}
            {status === 'not-available' &&
                <BookMessage Icon = {NoSampleIcon} title = 'Sample not available yet' text = 'The sample of this book will be available soon.'/>}
        </div>
    )
}

export default ReadSample;
