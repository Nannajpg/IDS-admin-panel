import { configureStore } from "@reduxjs/toolkit";
/* import adsReducer from "../features/ads/adSlice"; */
import teamsReducer from "../features/teams/teamSlice";

export const store = configureStore({
  reducer: {
    teams: teamsReducer
  }
});
