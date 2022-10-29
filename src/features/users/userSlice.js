import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {
        id: "1",
        name: "Luis",
        lastname: "Vasquez",
        email: "luisvasquez@gmail.com",
        password: "hola1234",
        favouriteTeam: "Argentina",
        isAdmin: "No",
    },
    {
        id: "2",
        name: "Anna",
        lastname: "Cadena",
        email: "annacadena@gmail.com",
        password: "nanna",
        favouriteTeam: "Alemania",
        isAdmin: "Si",
    },
    {
        id: "3",
        name: "Eduardo",
        lastname: "Sucre",
        email: "capibara@gmail.com",
        password: "aocapibara",
        favouriteTeam: "Brasil",
        isAdmin: "No",
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
            const {id, name, lastname, email, password, favouriteTeam, isAdmin} = action.payload
            const foundUser = state.find(user => user.id === id)

            if(foundUser){
                foundUser.name = name
                foundUser.lastname = lastname
                foundUser.email = email
                foundUser.password = password
                foundUser.favouriteTeam = favouriteTeam
                foundUser.isAdmin = isAdmin
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