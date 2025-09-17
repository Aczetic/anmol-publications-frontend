import contact_us from "../assets/contact_us.jpg";
import MessageIcon from "@mui/icons-material/Message";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LocationIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/SettingsPhone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

//todo: connect the backend and states with validation using react-hook-form on sending message show a pop giving message "message send successfully with confetti "

const ContactUs = () => {
  return (
    <div id="contact-us" className="w-full h-fit">
      <div
        data-aos="fade"
        data-aos-delay="250"
        id="banner"
        className="relative w-full h-50 md:h-110 pt-1"
        style={{
          backgroundImage: `url(${contact_us})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 40%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute z-100 top-0 h-full w-full bg-red-800 opacity-65 "></div>
        <h1
          data-aos="fade-up"
          data-aos-delay="50"
          className=" text-red-50 w-full text-center relative z-200 font-bold text-2xl md:text-4xl lg:text-6xl pt-8 mt-6 md:mt-10"
        >
          {"Let's Connect"}
        </h1>
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className=" text-white w-full text-center px-3 md:px-30 lg:px-10 relative z-200 text-sm md:text-xl lg:text-4xl pt-4"
        >
          {
            "Let's start a conversation about creating a brighter future for your students."
          }
        </h1>
      </div>
      {/* form container */}
      <div
        data-aos="fade-up"
        id="form-container"
        className="relative z-200 w-full min-h-90 h-fit md:h-90 py-8 flex flex-col md:flex-row gap-5 items-center md:items-start justify-center px-4 border-box"
      >
        <div className="text-white flex flex-col gap-3 py-7 px-3 relative md:top-[-11rem] w-full md:max-w-70 min-w-75 order-1 md:order-0 min-h-40 md:h-120 md:flex-1/3 bg-red-500">
          <div className="flex flex-col w-full h-fit px-2">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-nowrap flex items-center gap-1">
              Get In Touch
              <WavingHandIcon className="scale-70 md:scale-100" />
            </div>
            <div className="text-xs sm:text-sm md:text-[0.9rem] text-red-100">
              Other ways to connect
            </div>
          </div>
          <div className="w-full h-fit flex flex-col gap-2 px-2 md:px-0">
            <div className="flex flex-col w-full h-fit gap-1">
              <div className="flex gap-2 w-full h-fit py-2">
                <div className="bg-white rounded-full w-8 h-8 shrink-0 flex items-center justify-center p-1">
                  <EmailIcon className="text-red-500 scale-80" />
                </div>
                <div className="w-full flex flex-col">
                  <p className="font-bold text-sm">Email Us</p>
                  <a
                    target="_blank"
                    href="mailto:contact@anmoleducationalbooks.com"
                    className="font-bold text-xs text-red-100 text-wrap wrap-break-word"
                  >
                    contact@anmoleducationalbooks.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-fit gap-1">
              <div className="flex gap-2 w-full h-fit py-2">
                <div className="bg-white rounded-full w-8 h-8 shrink-0 flex items-center justify-center p-1">
                  <PhoneIcon className="text-red-500 scale-80" />
                </div>
                <div className="w-full flex flex-col">
                  <p className="font-bold text-sm">Call Us At</p>
                  <a
                    target="_blank"
                    href="tel:+919839314703"
                    className="font-bold text-xs text-red-100"
                  >
                    +91 9839314703
                  </a>
                </div>
              </div>
            </div>
             {/* whatsapp */}
             <div className="flex flex-col w-full h-fit gap-1 ">
              <div className="flex gap-2 w-full h-fit py-2">
                <div className="bg-white rounded-full w-8 h-8 shrink-0 flex items-center justify-center p-1">
                  <WhatsAppIcon className="text-red-500 scale-80" />
                </div>
                <div className="w-full flex flex-col">
                  <p className="font-bold text-sm">WhatsApp</p>
                  <a href="https://wa.me/917905401629" target="_blank" className = 'font-bold text-xs text-red-100'>Chat with us on WhatsApp</a>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-fit gap-1">
              <div className="flex gap-2 w-full h-fit py-2">
                <div className="bg-white rounded-full w-8 h-8 shrink-0 flex items-center justify-center p-1">
                  <LocationIcon className="text-red-500 scale-80" />
                </div>
                <div className="w-full flex flex-col">
                  <p className="font-bold text-sm">Head Office</p>
                  <a
                    target="_blank"
                    href="https://google.com/maps?q=8/276, Sitapur Rd, Sector 8, Sector 9, Jankipuram Vistar, Khargapur Jagir, Lucknow, Uttar Pradesh 226021"
                    className="font-bold text-xs text-red-100"
                  >
                    Plot No. 95/3, S.NN. Villa, New Friends Colony, Sector-6
                    Jankipuram Vistar, 226021, Lucknow UP
                  </a>
                </div>
              </div>
            </div>
           
          </div>
          <div className="border-solid border-red-400 border-t-3 mt-3 px-2">
            <p className="font-bold text-xs mt-2 text-red-100">
              Follow us on social media
            </p>
            {/* todo:update the linkedin url and facebook url */}
            <div className="text-white flex gap-3 mt-2">
              <a
                target="_blank"
                className="w-8 h-8 bg-white flex items-center justify-center rounded-full"
                href="https://www.facebook.com/p/Anmol-Educational-Books-100064159837773/"
              >
                <FacebookIcon className="text-red-500 scale-80" />
              </a>
              <a
                target="_blank"
                className="w-8 h-8 bg-white flex items-center justify-center rounded-full"
                href="https://www.instagram.com/anmoleducationalbooks/"
              >
                <InstagramIcon className="text-red-500 scale-80" />
              </a>
              <a
                target="_blank"
                className="w-8 h-8 bg-white flex items-center justify-center rounded-full"
                href="https://x.com/AnmolBooks"
              >
                <XIcon className="text-red-500 scale-70" />
              </a>
              <a
                target="_blank"
                className="w-8 h-8 bg-white flex items-center justify-center rounded-full"
                href="https://linkedin.com"
              >
                <LinkedInIcon className="text-red-500 scale-80" />
              </a>
            </div>
          </div>
        </div>
        <form
          id="form"
          className="bg-white rounded-xs flex flex-col py-7 text-xs sm:text-[0.9rem] pb-10 px-3 md:px-6 lg:px-8 relative md:top-[-11rem] order-0 md:order-1 w-full md:min-w-80 md:max-w-120 md:flex-2/3 h-120 border-solid border-3 border-red-100"
        >
          {/* form starts here */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 text-nowrap flex items-end gap-2">
            Send us a message <MessageIcon className="scale-70 md:scale-100" />
          </p>
          <div
            id="first-row"
            className="w-full h-fit  p-1 flex flex-col sm:flex-row justify-between gap-3 sm:mt-2 md:mt-3"
          >
            <label
              htmlFor="full-name"
              className="w-full h-fit flex flex-col gap-1"
            >
              Full Name :
              <input
                id="full-name"
                type="text"
                placeholder="Your full name"
                className="bg-red-50 py-1 px-2 w-full outline-2 rounded-xs outline-red-100 outline-solid focus:outline-gray-700"
              />
            </label>
            <label
              htmlFor="company-name"
              className="w-full h-fit flex flex-col gap-1"
            >
              Company :
              <input
                id="company-name"
                type="text"
                placeholder="Your company name"
                className="bg-red-50 truncate py-1 px-2 w-full outline-2 rounded-xs outline-red-100 outline-solid focus:outline-gray-700"
              />
            </label>
          </div>
          <div
            id="second-row"
            className="w-full h-fit  p-1 flex flex-col sm:flex-row justify-between gap-3 sm:mt-2 md:mt-3"
          >
            <label htmlFor="phone" className="w-full h-fit flex flex-col gap-1">
              Phone :
              <input
                id="phone"
                type="text"
                placeholder="Your phone number"
                className="bg-red-50 truncate py-1 px-2 w-full outline-2 rounded-xs outline-red-100 outline-solid focus:outline-gray-700"
              />
            </label>
            <label htmlFor="email" className="w-full h-fit flex flex-col gap-1">
              Email :
              <input
                id="email"
                type="email"
                placeholder="Your email"
                className="bg-red-50 py-1 px-2 w-full outline-2 rounded-xs outline-red-100 outline-solid focus:outline-gray-700"
              />
            </label>
          </div>
          <div
            id="third-row"
            className="w-full h-fit  p-1 flex flex-col sm:flex-row justify-between gap-3 sm:mt-2 md:mt-3"
          >
            <label
              htmlFor="subject"
              className="w-full h-fit flex flex-col gap-1"
            >
              Subject :
              <input
                id="subject"
                type="text"
                placeholder="Subject of your message"
                className="bg-red-50 truncate py-1 px-2 w-full outline-2 rounded-xs outline-red-100 outline-solid focus:outline-gray-700"
              />
            </label>
          </div>
          <div
            id="fourth-row"
            className="w-full h-fit grow-1  p-1 flex flex-col sm:flex-row justify-between gap-3 sm:mt-2 md:mt-3"
          >
            <label
              htmlFor="message"
              className="w-full h-full flex flex-col gap-1"
            >
              Message :
              <textarea
                id="message"
                type="text"
                placeholder="Enter your message here"
                maxLength="300"
                className="bg-red-50 resize-none h-full py-1 px-2 w-full outline-2 rounded-xs outline-red-100 outline-solid focus:outline-gray-700"
              />
            </label>
          </div>
          <button className="text-center w-full p-2 text-white bg-red-500 relative top-3 rounded-sm cursor-pointer select-none">
            Send Message
          </button>
        </form>
      </div>
      {/* map comp */}
      <div
        data-aos="fade"
        className="w-full h-fit flex items-center justify-center bg-blue-100 mt-15"
      >
        <div className="w-full h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.863124239981!2d80.93944698714274!3d26.939553398695548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399957001f93169f%3A0xa9a1bee002c120c9!2sNew%20Friends%20colony%20sector%206!5e0!3m2!1sen!2sin!4v1758054528156!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
