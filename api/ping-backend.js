import axios from "axios"

let timeout = null;

const routes = ['ping', 'ping2' , 'faqs' , 'misc/testimonial' , 'books'];

export default (req,res)=>{
  const randomRoute = routes[Math.floor(Math.random() * routes.length)];
  const randomTime = Math.floor(Math.random()*5*60*1000);
  setTimeout(()=>{
    axios
    .get("https://api.anmoleducationalbooks.com/" + randomRoute)
    .then((resp) => {
      console.log("pinged route : ", randomRoute);
      
      res.status(200).send("success , route : "+randomRoute);
   
    })
    
    .catch((e) => {
      console.log(e);
    });  
  },randomTime)
  
}