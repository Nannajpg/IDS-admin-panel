import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTeams as getAllTeams,
  createTeam,
  deleteTeam as deleteBdTeam,
  editTeam as editBdTeam,
} from "../../services/team.services";

export const fetchTeams = createAsyncThunk(
  "@teams/fetchTeams",
  async (token, { page, event, search }) => {
    const res = await getAllTeams(token, page, event, search);
    return res;
  }
);

export const uploadTeam = createAsyncThunk(
  "@teams/uploadTeam",
  async (token, team) => {
    console.log(team)
    const res = await createTeam(token, team);
    return res;
  }
);

export const deleteTeam = createAsyncThunk("@teams/deleteTeam", async ({userToken, id}) => {
  await deleteBdTeam(userToken, id);
  return 0;
});

//id, name, badge    ,   totalTeams, pageNumber, pageSize

export const teamSlice = createSlice({
  name: "@teams",
  initialState: {
    search: "",
    totalTeams: 0,
    page: 0,
    pages: 0,
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
        state.totalTeams = action.payload.paginate.totalTeams;
        state.page = action.payload.paginate.pageNumber;
        state.pages = action.payload.paginate.pages;
        state.loading = "idle";
      }
    });
  },
});

export const { nextPage, prevPage, toFirstPage, toSearch, toFilter, editTeam } =
  teamSlice.actions;
export default teamSlice.reducer;
