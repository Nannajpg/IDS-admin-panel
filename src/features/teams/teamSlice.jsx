import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "teams",
  initialState: [
    {
      id: "1",
      teamName: "Brasil",
      shield:
        "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/1881.png",
      players: ["Jugador 1", "Jugador 2", "Jugador 3"],
      event: "mundial",
    },
    {
      id: "2",
      teamName: "Real Madrid",
      shield:
        "http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1.png",
      players: ["Jugador 1", "Jugador 2", "Jugador 3"],
      event: "champions",
    },
    {
      id: "3",
      teamName: "Francia",
      shield:
        "http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/961.png",
      players: ["Jugador 1", "Jugador 2", "Jugador 3"],
      event: "mundial",
    },
  ],
  reducers: {
    addTeam: (state, action) => {
      state.push(action.payload);
    },
    editTeam: (state, action) => {
      const { id, teamName, shield, players } = action.payload;
      const foundTeam = state.find((team) => team.id === id);
      if (foundTeam) {
        foundTeam.id = id;
        foundTeam.teamName = teamName;
        foundTeam.shield = shield;
        foundTeam.players = players;
      }
    },
    deleteTeam: (state, action) => {
      const foundTeam = state.find((team) => team.id === action.payload);
      if (foundTeam) {
        state.splice(state.indexOf(foundTeam), 1);
      }
    },
  },
});

export const { addTeam, editTeam, deleteTeam } = teamSlice.actions;
export default teamSlice.reducer;
