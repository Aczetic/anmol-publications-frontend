import first from '../assets/our_mission/first.jpg';
import second from '../assets/our_mission/second.jpg'
import third from '../assets/our_mission/third.jpg';
import fourth from '../assets/our_mission/fourth.jpg';
import fifth from '../assets/our_mission/fifth.jpg';
import sixth from '../assets/our_mission/sixth.jpg';



const OurMission = () => {
  return (
    <div className="w-full h-fit mb-20">
      <div className="flex flex-col gap-1 p-2 mt-10">
            <h2 data-aos = 'fade-up' className="font-bold text-4xl md:text-5xl text-center"> Our Mission</h2>
            <h2 data-aos = 'fade-up' data-ao-delay = '100' className="text-md md:text-lg text-center"> Understand Our Vision</h2>
          </div>  
      <div className="flex flex-col gap-4 mt-10 px-2">
        <div className="flex flex-col gap-10 p-2 w-full items-center overflow-hidden">
          <div className="flex flex-col gap-25 w-full p-1 max-w-[400px] md:max-w-[600px] lg:max-w-[800px] items-center">
            <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
              <img
                data-aos="fade-right"
                src={first}
                className="w-full h-50 md:w-45 md:h-55 md:mt-2"
                style={{ objectFit: "cover" }}
                alt="Blending Tradition with Technology"
                loading="lazy"
              />
              <div className="flex flex-col gap-3 px-2">
                <div data-aos="zoom-out" className="flex flex-col">
                  <h2
                    data-aos-offset="50"
                    className="font-bold leading-7 text-[1.5rem] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent inline-block"
                  >
                    Blending Tradition with Technology
                  </h2>
                </div>
                <div data-aos = 'fade-up' className="flex flex-col gap-3 md:max-w-[450px]">
                {"At Anmol Educational Books, our mission is simple yet powerful: to revolutionize learning by creating textbooks that inspire, engage, and prepare students for a rapidly evolving world. We don’t just publish books; we design complete learning experiences that combine traditional knowledge with cutting-edge digital tools."}
                </div>
              </div>
            </div>
            {/* part 1 ends here  */}
            <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
              <img
                data-aos="fade-left"
                src={second}
                className="order-0 md:order-2 w-full h-50 md:w-45 md:h-55 md:mt-2"
                style={{ objectFit: "cover" }}
                alt="NEP certified books"
                loading="lazy"
              />
              <div className="flex flex-col gap-3 px-2 md:max-w-[450px]">
                <div data-aos="zoom-out" className="flex flex-col">
                  <h2
                    data-aos-offset="50"
                    className="font-bold leading-7 text-[1.5rem] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent inline-block"
                  >
                    {"Why We’re Different"}
                  </h2>
                </div>
                <div data-aos = 'fade-up' className="flex flex-col gap-3">
                  {"Unlike conventional textbooks that often feel rigid and uninspiring, our books are dynamic and learner-centric. We align with India’s NEP 2020 framework to provide holistic, inclusive, and future-ready education. Every page is crafted to spark curiosity, nurture creativity, and develop critical thinking."}
                </div>
              </div>
            </div>
            {/* part 2 ends here */}
            <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
              <img
                data-aos="fade-right"
                src={sixth}
                className="w-full h-50 md:w-45 md:h-55 md:mt-2"
                style={{ objectFit: "cover" }}
                alt="A Future of Holistic Growth"
                loading="lazy"
              />
              <div className="flex flex-col gap-3 px-2">
                <div data-aos="zoom-out" className="flex flex-col">
                  <h2
                    data-aos-offset="50"
                    className="font-bold leading-7 text-[1.5rem] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent inline-block"
                  >
                    {"Blending Tradition with Technology"}
                  </h2>
                </div>
                <div data-aos = 'fade-up' className="flex flex-col gap-3 md:max-w-[450px]">
                {"Our vision is to create not just better textbooks, but a complete learning ecosystem—where printed books, e-books, AI, and digital platforms work together. By doing so, we aim to cultivate learners who are not only knowledgeable but also curious, resilient, and future-ready."}
                </div>
              </div>
            </div>
            {/* part 3 ends here  */}
            <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
              <img
                data-aos="fade-left"
                src={third}
                className="order-0 md:order-2 w-full h-50 md:w-45 md:h-55 md:mt-2"
                style={{ objectFit: "cover" }}
                alt="Education in the Digital Age"
                loading="lazy"
              />
              <div className="flex flex-col gap-3 px-2 md:max-w-[450px]">
                <div data-aos="zoom-out" className="flex flex-col">
                  <h2
                    data-aos-offset="50"
                    className="font-bold leading-7 text-[1.5rem] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent inline-block"
                  >
                    {"Education in the Digital Age"}
                  </h2>
                </div>
                <div data-aos = 'fade-up' className="flex flex-col gap-3">
                  {"We live in a digital era where information is abundant and AI is reshaping every aspect of society. This creates both immense opportunities and unique challenges for young minds. Our mission is to leverage the boon of technology—guiding learners toward meaningful growth—while shielding them from the distractions and pitfalls of overstimulation."}
                </div>
              </div>
            </div>
            {/* part 4 ends here */}
            <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
              <img
                data-aos="fade-right"
                src={fourth}
                className="w-full h-50 md:w-45 md:h-55 md:mt-2"
                style={{ objectFit: "cover" }}
                alt="Blending Tradition with Technology"
                loading="lazy"
              />
              <div className="flex flex-col gap-3 px-2">
                <div data-aos="zoom-out" className="flex flex-col">
                  <h2
                    data-aos-offset="50"
                    className="font-bold leading-7 text-[1.5rem] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent inline-block"
                  >
                    {"AI-Powered Learning Support"}
                  </h2>
                </div>
                <div data-aos = 'fade-up' className="flex flex-col gap-3 md:max-w-[450px]">
                {"Our books are not just about reading—they come alive with AI-driven tools that act as mentors. From chapter-wise chatbot support to smart test paper generators, our content encourages students to explore, question, and think critically—without spoon-feeding them answers."}
                </div>
              </div>
            </div>
            {/* part 5 ends here  */}
            <div className="flex flex-col md:flex-row gap-5 items-center md:items-start">
              <img
                data-aos="fade-left"
                src={fifth}
                className="order-0 md:order-2 w-full h-50 md:w-45 md:h-55 md:mt-2"
                style={{ objectFit: "cover" }}
                alt="Empowering Teachers"
                loading="lazy"
              />
              <div className="flex flex-col gap-3 px-2 md:max-w-[450px]">
                <div data-aos="zoom-out" className="flex flex-col">
                  <h2
                    data-aos-offset="50"
                    className="font-bold leading-7 text-[1.5rem] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent inline-block"
                  >
                    {"Empowering Teachers"}
                  </h2>
                </div>
                <div data-aos = 'fade-up' className="flex flex-col gap-3">
                  {"We believe great learning is only possible with great teaching. That’s why we equip educators with customizable resources, engaging illustrations, and ready-to-use strategies. Our mission is to make teaching easier, more effective, and more impactful—so teachers can focus on inspiring minds."}
                </div>
              </div>
            </div>
            {/* part 6 ends here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurMission
