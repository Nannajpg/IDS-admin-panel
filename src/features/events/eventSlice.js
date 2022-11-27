import { createSlice } from '@reduxjs/toolkit'


const initialState = [];

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers:{
        resetEvents: (state, _) => {
            state = [];
        },
        addEvent: (state, { payload }) => {
            const { id } = payload;
            const foundSticker = state.find(event => event.id === id);
            if (!foundSticker) {
                state.push(payload);
            }
        },
        editEvent: (state, action) =>{
            const { id, eventName, status } = action.payload
            const foundEvent = state.find(event => event.id === id)
            
            if(foundEvent){
                foundEvent.id = id;
                foundEvent.eventName = eventName;
                foundEvent.status = status;
            }
        },
        deleteEvent: (state, { payload }) => {
            const eventFound = state.find(event => event.id === payload)
            if (eventFound) {
                state.splice(state.indexOf(eventFound), 1)
            }
        }
    }
})

export const { initEvents, addEvent, editEvent, deleteEvent, resetEvents } = eventSlice.actions
export default eventSlice.reducer