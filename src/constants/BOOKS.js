import {BOOKS} from '../assets/front_covers/images.js';// TODO : must come from backend

const names = {
    hindi:'Shubhda', gk: 'Knowledge Insights' , art: 'Art Magic', cursive :'Cursive Writing'
}


// todo: this method of naming is only until backend not provided otherwise the names will come there 
const Books = Object.entries(BOOKS).map((book,index)=>{
    return {
        id:index , 
        name : names[book[0].slice(0,book[0].length-1)]+ ' ' + book[0][book[0].length-1].toUpperCase()  , 
        img : book[1]
    }
})


export default Books;