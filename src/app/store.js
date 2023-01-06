import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../features/users/userSlice'
import eventsReducer from '../features/events/eventSlice'
import authReducer from '../features/auth/authSlice'
import adsReducer from "../features/ads/adSlice";
import stickerReducer from "../features/stickers/stickerSlice";
import teamsReducer from "../features/teams/teamSlice";
import matchesReducer from "../features/matches/matchSlice"

export const store = configureStore({
    reducer:{
        auth: authReducer,
        users: usersReducer,
        events: eventsReducer,
        ads: adsReducer,
        stickers: stickerReducer,
        teams: teamsReducer,
        matches: matchesReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
