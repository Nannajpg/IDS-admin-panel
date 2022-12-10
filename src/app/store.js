import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../features/users/userSlice'
import eventsReducer from '../features/events/eventSlice'
import authReducer from '../features/auth/authSlice'
import adsReducer from "../features/ads/adSlice";
import stickerReducer from "../features/stickers/stickerSlice";
import teamsReducer from "../features/teams/teamSlice";


export const store = configureStore({
    reducer:{
        auth: authReducer,
        users: usersReducer,
        events: eventsReducer,
        ads: adsReducer,
        stickers: stickerReducer,
        teams: teamsReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
    
/* import { configureStore } from '@reduxjs/toolkit'
import stickerReducer from '../features/stickers/stickerSlice'

export const store = configureStore({
    reducer: {
        stickers: stickerReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}) */
