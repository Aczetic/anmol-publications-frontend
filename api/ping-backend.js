import axios from "axios"

let timeout = null;

const routes = ['ping', 'ping2' , 'faqs' , 'misc/testimonial' , 'books'];

export default ()=>{
    if(timeout === null){
        timeout = setTimeout(()=>{
            const randomRoute = routes[Math.floor(Math.random()*routes.length)];
           
            axios.get('http://api.anmoleducationalbooks.com/'+randomRoute)
            .then(res=>{

                console.log('pinged route : ', randomRoute);
                const randTime = Math.floor(Math.random()*15*60*1000);                    
            
                setTimeout(()=>{
                    axios.get('/ping-backend')
                }, randTime )
            
            }).catch(e=>{
                console.log(e);
            })
        })
    }
}