import axios from "axios"

let timeout = null;

const routes = ['ping1', 'ping2' , 'faqs' , 'misc/testimonial' , 'books'];

let count = 0;

export default (req,res)=>{

  if(count > 10){
    res.status(429).send('TOO_MANY_REQUES');
    return;
  }else{
    count == 0 && setTimeout(()=>{
      count = 0;
    },60*1000)
    count++;
  }

  const randomRoute = routes[Math.floor(Math.random() * routes.length)];
  const randomTime = Math.floor(Math.random()*15*60*1000);
  console.log('request_made');

  axios
  .get("https://api.anmoleducationalbooks.com/" + randomRoute)
  .then((resp) => {
    console.log("pinged route : ", randomRoute);
    
    res.status(200).send("success , route : "+randomRoute);
  
  })
  
  .catch((e) => {
    console.log(e);
  });  

  
}