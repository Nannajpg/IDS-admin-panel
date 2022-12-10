import { configureStore } from "@reduxjs/toolkit";
import teamsReducer from "../features/teams/teamSlice";

export const store = configureStore({
  reducer: {
    teams: teamsReducer
  }
});
