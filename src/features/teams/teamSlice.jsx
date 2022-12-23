import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTeams as getAllTeams,
  createTeam,
  deleteTeam as deleteBdTeam,
  editTeam as editBdTeam,
} from "../../services/team.services";

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
  const data = await editBdTeam(team);
  return data;
});

//id, name, badge    ,   totalTeams, pageNumber, pageSize

export const teamSlice = createSlice({
  name: "@teams",
  initialState: {
    search: "",
    totalTeams: 0,
    page: 0,
    loading: "idle",
    teams: [],
  },
  reducers: {
    editTeam: (state, action) => {
      const { id, teamName, badge, event } = action.payload;
      const foundTeam = state.find((team) => team.id === id);
      if (foundTeam) {
        foundTeam.teamName = teamName;
        foundTeam.badge = badge;
        foundTeam.event = event;
      }
    },
    nextPage: (state) => {
      state.page++;
    },
    prevPage: (state) => {
      state.page--;
    },
    toFirstPage: (state) => {
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
