import {createSlice} from '@reduxjs/toolkit'

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