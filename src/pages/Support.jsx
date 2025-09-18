import DoneIcon from '@mui/icons-material/Done';




//todo: a sidebar will open up which will have a chat app like representation and will poll every 10 second
//todo : implement this, the issues will show in sorted order from latest to oldest always ,desc by date
// todo: the issues will only show if the user is logged in 
// todo: show some text tohelp get the reference 
const Issue = ({status = 'resolved'})=>{
    return (
      <div className="w-full h-fit rounded-sm bg-white py-4 px-4 shadow-sm flex flex-col">
        <style>
          {`
          @keyframes breathe {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.7; }
          }`}
        </style>
        <div className="flex gap-2 items-center justify-between">
          <p className="font-bold text-xl md:text-2xl">#23423525</p>
          <div className="flex gap-1">
            <span
              className={`rounded-full w-5 h-5 ${
                status === "active" ? "bg-red-200" : "bg-green-200"
              } flex items-center justify-center ${
                status === "active" &&
                "animate-[breathe_2s_ease-in-out_infinite]"
              }`}
            >
              {
                status === 'active'?<div
                className={`relative z-10 rounded-full w-3 h-3 bg-red-500 `}
              ></div>: <DoneIcon className = 'scale-70 text-green-800'/>
              }
            </span>
            <p
              className={`${
                status === "active" ? "text-red-900" : "text-green-900"
              } text-xs md:text-sm`}
            >
              {status[0].toUpperCase() + status.slice(1)}
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-sm md:text-md">
          {JSON.stringify(new Date()).slice(1, 11)}
        </p>
        <button className="px-3 py-1 text-white bg-black w-fit rounded-sm cursor-pointer select-none text-xs md:text-sm">
          Open
        </button>
      </div>
    );
}


const Support = () => {
  return (
    <div className="w-full h-fit min-h-[100vh]">
      <section className="w-full h-fit p-2 px-3 mt-5 mb-10">
        <h2 data-aos = 'fade-up'  className="mt-2 w-full px-1 md:px-4 font-bold text-xl sm:text-3xl lg:text-4xl text-center text-black">
          {"Facing issues ! Don't worry"}
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

      {/* active issues will go here */}
      <section data-aos = 'fade-up' data-aos-delay = '100' className="w-full max-w-150 mx-auto h-fit p-2 px-3 mt-5 mb-10">
        <p className="p-2 w-full text-center text-xl md:text-2xl font-bold gap-2">
          Your Issues
        </p>
        <div className="flex flex-col gap-3">
          <Issue />
          <Issue status="active" />
        </div>
      </section>
    </div>
  );
}

export default Support
