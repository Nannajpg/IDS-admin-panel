import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTeams as getAllTeams,
  createTeam,
  deleteTeam as deleteBdTeam,
  editAd as editBdTeam,
} from "../../services/axios";

export const fetchTeams = createAsyncThunk(
  "@teams/fetchTeams",
  async ({ page, event, search }) => {
    const res = await getAllTeams(page, event, search);
    return res;
  }
);

export const uploadTeam = createAsyncThunk(
  "@teams/uploadTeam",
  async (team) => {
    const res = await createTeam(team);
    return res;
  }
);

export const deleteTeam = createAsyncThunk("@teams/deleteTeam", async (id) => {
  await deleteBdTeam(id);
  return id;
});

export const editTeam = createAsyncThunk("@teams/editTeam", async (team) => {
  await editBdTeam(team);
  return team;
});

export const teamSlice = createSlice({
  name: "@teams",
  initialState: {
    event: "",
    search: "",
    amount: 0,
    page: 0,
    loading: "idle",
    teams: [
      {
        id: "1",
        teamName: "Brasil",
        shield:
          "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/1881.png",
        event: "mundial",
      },
      {
        id: "2",
        teamName: "Real Madrid",
        shield:
          "http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/1.png",
        event: "champions",
      },
      {
        id: "3",
        teamName: "Francia",
        shield:
          "http://as01.epimg.net/img/comunes/fotos/fichas/equipos/large/961.png",
        event: "mundial",
      },
    ],
  },
  reducers: {
    editTeam: (state, action) => {
      const { id, teamName, shield, event } = action.payload;
      const foundTeam = state.find((team) => team.id === id);
      if (foundTeam) {
        foundTeam.teamName = teamName;
        foundTeam.shield = shield;
        foundTeam.event = event;
      }
    },
    nextPage: (state, action) => {
      state.page++;
    },
    prevPage: (state, action) => {
      state.page--;
    },
    toFirstPage: (state, action) => {
      state.page = 0;
    },
    toSearch: (state, action) => {
      state.search = action.payload;
    },
    toFilter: (state, action) => {
      state.event = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state, action) => {
      if (state.loading === "idle") state.loading = "pending";
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.teams = action.payload.teams;
        state.amount = action.payload.totalTeams;
        state.loading = "idle";
      }
    });
  },
});

export const { nextPage, prevPage, toFirstPage, toSearch, toFilter } =
  teamSlice.actions;
export default teamSlice.reducer;
