import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "../features/ads/adSlice";

export const store = configureStore({
  reducer: {
    ads: adsReducer
  }
});
