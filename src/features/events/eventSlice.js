import { createSlice } from '@reduxjs/toolkit'

export const eventSlice = createSlice({
    name: 'events',
    initialState: {
        amount: 0,
        page: 0,
        events: [],
        eventsAll: [],
        totalPages: 0
    },
    reducers:{
        resetEvents: (state, _) => {
            state.events = [];
        },
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        setAllEvents: (state, action) => {
            state.eventsAll = action.payload;
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
            state.events = [];
            state.page = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        toSearch: (state, action) => {
            state.search = action.payload;
          },
        toFilter: (state, action) => {
            state.event = action.payload;
        },
        toFirstPage: (state) => {
            state.page = 0;
        },
    }
})

export const { initEvents, setEvents, setAllEvents, editEvent, deleteEvent, resetEvents, setAmount, setPage, setTotalPages, toSearch, toFilter, toFirstPage } = eventSlice.actions
export default eventSlice.reducer