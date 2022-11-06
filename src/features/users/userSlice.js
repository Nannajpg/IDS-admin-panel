import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {
        id: "1",
        name: "Luis Vasquez",
        role: "Administrador",
        email: "luisvasquez@gmail.com",
        password: "hola1234",
    },
    {
        id: "2",
        name: "Anna Cadena",
        role: "Usuario",
        email: "annacadena@gmail.com",
        password: "nanna",
    },
    {
        id: "3",
        name: "Eduardo Sucre",
        role: "Anunciante",
        email: "capibara@gmail.com",
        password: "aocapibara",
    },
]

export const userSlice = createSlice({

    name: 'users',
    initialState,
    reducers:{
        addUser: (state, action) =>{
            state.push(action.payload)
        },
        editUser: (state, action) =>{
            const {id, name, role, email, password} = action.payload
            const foundUser = state.find(user => user.id === id)

            if(foundUser){
                foundUser.id = id
                foundUser.name = name
                foundUser.role = role
                foundUser.email = email
                foundUser.password = password
            }
        },
        deleteUser: (state, action) => {
            const userFound = state.find(user => user.id === action.payload)
            if (userFound){
                state.splice(state.indexOf(userFound), 1)
            }
        },
    }
})

export const {addUser, editUser, deleteUser} = userSlice.actions
export default userSlice.reducer