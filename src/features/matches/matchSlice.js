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
        
        setMatches: (state, {payload}) =>{
            state.matches = payload;
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

export const {resetMatches, setMatches, editMatch, deleteMatch, setAmount, setPage} = matchSlice.actions
export default matchSlice.reducer