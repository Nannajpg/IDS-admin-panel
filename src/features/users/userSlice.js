import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        amount: 0,
        page: 0,
        users: []
    },
    reducers:{
        initUsers: (state, { payload }) => {
            payload.forEach(user => state.users.push(user));
        },
        resetUsers: (state, _) => {
            state.users = [];
        },
        addUser: (state, { payload }) => {
            const { id } = payload;
            const foundUser = state.users.find(user => user.id === id);
            if (!foundUser) {
                state.users.push(payload);
            }
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
        deleteUser: (state, { payload }) => {
            const userFound = state.users.find(user => user.id === payload)
            if (userFound) {
                state.users.splice(state.indexOf(userFound), 1)
            }
        },
        setPage: (state, action) => {
            state.users = [];
            state.page = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
    }
})

export const {resetUsers, addUser, editUser, deleteUser, setAmount, setPage } = userSlice.actions
export default userSlice.reducer