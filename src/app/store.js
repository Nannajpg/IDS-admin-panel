import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../features/users/userSlice'
import eventsReducer from '../features/events/eventSlice'
import authReducer from '../features/auth/authSlice'
import adsReducer from "../features/ads/adSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        users: usersReducer,
        events: eventsReducer,
        ads: adsReducer,
    }
})
