import { createSlice } from '@reduxjs/toolkit'

export const teamSlice = createSlice({
    name: "teams", 
    initialState:[{id:"1", teamName: "Brasil", shield:"http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/1881.png", players:["Jugador 1", "Jugador 2", "Jugador 3"], event:"mundial"},{id:"2", teamName: "Real Madrid", shield:"http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1.png", players:["Jugador 1", "Jugador 2", "Jugador 3"], event:"champions"}, {id:"3", teamName: "Francia", shield:"http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/961.png", players:["Jugador 1", "Jugador 2", "Jugador 3"], event:"mundial"}], 
    reducers:{},
})

export default teamSlice.reducer; 