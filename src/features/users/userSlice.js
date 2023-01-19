import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        amount: 0,
        page: 0,
        users: [],
        totalPages:0
    },
    reducers:{
        initUsers: (state, { payload }) => {
            payload.forEach(user => state.users.push(user));
        },
        resetUsers: (state, _) => {
            state.users = [];
        },
        setUsers: (state, { payload }) => {
            state.users = payload;
        },
        editUser: (state, action) =>{
            const { id, name, role, email, password } = action.payload
            const foundUser = state.users.find(user => user.id === id)

            if(foundUser){
                foundUser.id = id;
                foundUser.name = name;
                foundUser.role = role;
                foundUser.email = email;
                foundUser.password = password;
            }
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setPage: (state, action) => {
            state.users = [];
            state.page = action.payload;
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

export const {resetUsers, setUsers, editUser, setAmount, setPage, setTotalPages, toSearch, toFilter, toFirstPage } = userSlice.actions
export default userSlice.reducer