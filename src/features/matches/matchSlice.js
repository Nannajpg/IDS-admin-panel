import {createSlice} from '@reduxjs/toolkit'

export const matchSlice = createSlice({
    name: 'matches',
    initialState: {
        amount: 0,
        page: 0,
        matches: [],
        totalPages: 0
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
        setTotalPages: (state, action) =>{
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

export const {resetMatches, setMatches, editMatch, deleteMatch, setAmount, setPage, setTotalPages, toFilter, toFirstPage, toSearch} = matchSlice.actions
export default matchSlice.reducer