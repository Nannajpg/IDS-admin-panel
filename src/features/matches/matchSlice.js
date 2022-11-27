import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {
        id: "1",
        team1: "Brasil",
        team2: "Serbia",
        myFile: null,
        status: "En Juego",
        event:"FIFA World Cup 2022",
    },
    {
        id: "2",
        team1: "España",
        team2: "Alemania",
        myFile: null,
        status: "Culminado",
        event:"FIFA World Cup 2022",
    },
    {
        id: "3",
        team1: "Francia",
        team2: "Italia",
        myFile: null,
        status: "Sin Comenzar",
        event:"FIFA World Cup 2022",
    },1

]

export const matchSlice = createSlice({
    name: 'matches',
    initialState,
    reducers:{
        addMatch: (state, action) =>{
            state.push(action.payload)
        },
        editMatch: (state, action) =>{
            const {id, team1, team2, myFile} = action.payload
            const foundMatch = state.find(match => match.id === id)

            if(foundMatch){
                foundMatch.team1 = team1
                foundMatch.team2 = team2
                foundMatch.myFile = myFile
                
            }
        },
        deleteMatch: (state, action) => {
            const matchFound = state.find(match => match.id === action.payload)
            if (matchFound){
                state.splice(state.indexOf(matchFound), 1)
            }
        },
    }
})

export const {addMatch, editMatch, deleteMatch} = matchSlice.actions
export default matchSlice.reducer