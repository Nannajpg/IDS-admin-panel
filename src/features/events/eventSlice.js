import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {
        id: "1",
        name: "UEFA Champions League",
        state: "Inactivo",
    },
    {
        id: "2",
        name: "UEFA Europa League",
        state: "Inactivo",
    },
    {
        id: "3",
        name: "FIFA World Cup Qatar 2022",
        state: "Activo",
    },
]

export const eventSlice = createSlice({

    name: 'events',
    initialState,
    reducers:{
        addEvent: (state, action) =>{
            state.push(action.payload)
        },
        editEvent: (state, action) =>{
            const {id, name} = action.payload
            const foundEvent = state.find(event => event.id === id)

            if(foundEvent){
                foundEvent.id = id
                foundEvent.name = name
            }
        },
        deleteEvent: (state, action) => {
            const eventFound = state.find(event => event.id === action.payload)
            if (eventFound){
                state.splice(state.indexOf(eventFound), 1)
            }
        },
    }
})

export const {addEvent, editEvent, deleteEvent} = eventSlice.actions
export default eventSlice.reducer