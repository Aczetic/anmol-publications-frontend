import { createSlice } from "@reduxjs/toolkit";


const initialState = null

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{
     setProfile : ( state , action ) =>{
        return action.payload
     }   
    }
})


export default profileSlice.reducer;
export const {setProfile} = profileSlice.actions
