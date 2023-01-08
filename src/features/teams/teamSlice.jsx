import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTeams as getAllTeams,
  createTeam,
  deleteTeam as deleteBdTeam,
} from "../../services/team.services";

export const fetchTeams = createAsyncThunk(
  "@teams/fetchTeams",
  async ({userToken, page, event, search }) => {
    const res = await getAllTeams(userToken, page, event, search);
    return res;
  }
);

export const uploadTeam = createAsyncThunk(
  "@teams/uploadTeam",
  async ({userToken, team}) => {
    const res = await createTeam(userToken, team);
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
    total: 0,
    page: 0,
    totalPages: 0,
    perPage: 0,
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
    setPage: (state, action) => {
      state.users = [];
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
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
    setAllTeams: (state, action) => {
      state.teamsAll = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state, action) => {
      if (state.loading === "idle") state.loading = "pending";
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.teams = action.payload.items;
        state.total = action.payload.paginate.total;
        state.page = action.payload.paginate.page;
        state.pages = action.payload.paginate.pages;
        state.perPage = action.payload.paginate.perPage;
        state.loading = "idle";
      }
    });
  },
});

export const { nextPage, prevPage, toFirstPage, toSearch, toFilter, editTeam, setAllTeams, setPage, setTotalPages } =
  teamSlice.actions;
export default teamSlice.reducer;
