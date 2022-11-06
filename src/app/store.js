import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../features/users/userSlice'
import eventsReducer from '../features/events/eventSlice'

export const store = configureStore({
    reducer:{
        users: usersReducer,
        events: eventsReducer,
    }
})
