import {BOOKS} from '../assets/front_covers/images.js';// TODO : must come from backend
import {EBOOKS} from '../assets/front_covers/images.js';

const names = {
    hindi:'Shubhda', gk: 'Knowledge Insights' , art: 'Art Magic', cursive :'Cursive Writing' , bolteakshar: 'Bolte Akshar ', englishprimer: 'English Primer', englishpreprimer: 'English Pre-Primer', gungunatebalgeet: 'Gungunate Bal Geet', hindisulekh: 'Hindi Sulekh',
    kidsenglishalphabets: 'Kids English Alphabets', 
    mathsfun1_50: 'Maths Fun 1-50',
    mathsfun1_100: 'Maths Fun 1-100', mathsfunprimer: 'Maths Fun Primer', mathsfunpreprimer: 'Maths Fun Pre-Primer',
    englishrhymes: 'English Rhymes',
    picturedictionary: 'Picture Dictionary', shabdgyan : "Shabd Gyan", swargyan : "Swar Gyan",
    tablesfun: "Tables Fun"
}


// todo: this method of naming is only until backend not provided otherwise the names will come there 
const Books = [...Object.entries(BOOKS).map((book,index)=>{
   
    return {
        id:index , // TODO: right now this index is being sent at the backend it needs to be 
        //updated as well otherwise home page books option will not work 
        name : names[book[0].slice(0,book[0].length-1)]+ ' ' + book[0][book[0].length-1].toUpperCase()  , 
        img : book[1]
    }
}),...Object.entries(EBOOKS).map((book,index)=>{
   
    return {
        id:index , // TODO: right now this index is being sent at the backend it needs to be 
        //updated as well otherwise home page books option will not work 
        name : names[book[0].slice(0,book[0].length)] , 
        img : book[1]
    }
})]


export default Books;