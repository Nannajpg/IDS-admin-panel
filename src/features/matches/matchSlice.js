import {createSlice} from '@reduxjs/toolkit'


/* const initialState = [
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

] */

export const matchSlice = createSlice({
    name: 'matches',
    initialState: {
        amount: 0,
        page: 0,
        matches: []
    },
    reducers:{
        resetMatches: (state, _) => {
            state.matches = [];
        },
        addMatch: (state, { payload }) =>{
            const { id } = payload;
            console.log(payload)
            const foundMatch = state.matches.find(match => match.id === id);
            if (!foundMatch) {
                state.matches.push(payload);
            }
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
            const matchFound = state.matches.find(match => match.id === action.payload)
            if (matchFound){
                state.matches.splice(state.matches.indexOf(matchFound), 1)
            }
        },
        setPage: (state, action) => {
            state.matches = [];
            state.page = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
    }
})

export const {resetMatches, addMatch, editMatch, deleteMatch, setAmount, setPage} = matchSlice.actions
export default matchSlice.reducer