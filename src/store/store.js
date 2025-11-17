import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice.js';
import profileReducer from '../features/profileSlice.js';

const store = configureStore({
    reducer:{
        user: userReducer,
        profile: profileReducer
    }
});

export default store;