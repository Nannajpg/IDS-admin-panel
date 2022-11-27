import { createSlice } from '@reduxjs/toolkit'


const initialState = [];

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        initUsers: (state, { payload }) => {
            payload.forEach(user => state.push(user));
        },
        resetUsers: (state, _) => {
            state = [];
        },
        addUser: (state, { payload }) => {
            const { id } = payload;
            const foundUser = state.find(user => user.id === id);
            if (!foundUser) {
                state.push(payload);
            }
        },
        editUser: (state, action) =>{
            const { id, name, role, email, password } = action.payload
            const foundUser = state.find(user => user.id === id)

            if(foundUser){
                foundUser.id = id;
                foundUser.name = name;
                foundUser.role = role;
                foundUser.email = email;
                foundUser.password = password;
            }
        },
        deleteUser: (state, { payload }) => {
            const userFound = state.find(user => user.id === payload)
            if (userFound) {
                state.splice(state.indexOf(userFound), 1)
            }
        }
    }
})

export const {resetUsers, addUser, editUser, deleteUser} = userSlice.actions
export default userSlice.reducer