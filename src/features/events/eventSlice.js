import { createSlice } from '@reduxjs/toolkit'


const initialState = [];

export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        amount: 0,
        page: 0,
        events: []
    },
    reducers:{
        resetEvents: (state, _) => {
            state.events = [];
        },
        addEvent: (state, { payload }) => {
            const { id } = payload;
            const foundSticker = state.events.find(event => event.id === id);
            if (!foundSticker) {
                state.events.push(payload);
            }
        },
        editEvent: (state, action) =>{
            const { id, eventName, status } = action.payload
            const foundEvent = state.events.find(event => event.id === id)
            
            if(foundEvent){
                foundEvent.id = id;
                foundEvent.eventName = eventName;
                foundEvent.status = status;
            }
        },
        deleteEvent: (state, { payload }) => {
            const eventFound = state.events.find(event => event.id === payload)
            if (eventFound) {
                state.events.splice(state.events.indexOf(eventFound), 1)
            }
        },
        setPage: (state, action) => {
            state.stickers = [];
            state.page = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
    }
})

export const { initEvents, addEvent, editEvent, deleteEvent, resetEvents, setAmount, setPage } = eventSlice.actions
export default eventSlice.reducer