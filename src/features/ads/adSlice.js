import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteAd as deleteBdAd,
  editAd as editBdAd,
} from "../../services/ads";

export const editAd = createAsyncThunk("@ads/editAd", async ({userToken, ad, id}) => {
  console.log(userToken)
  const { announcer, adtype, redirecTo } = await editBdAd(userToken, {ad, id});
  return { announcer, adtype, redirecTo };
});

export const adsSlice = createSlice({
  name: "@ads",
  initialState: {
    adtype: "",
    search: "",
    amount: 0,
    page: 0,
    pages: 0,
    ads: [],
    editedAd: false
  },
  reducers: {
    storeAllAds: (state, { payload }) => {
      state.amount = payload.totalAds;
      state.pages = Math.ceil(payload.totalAds / payload.pageSize);
      state.ads = payload.ads;
    },
    increaseAmount: (state) => {
      state.amount = state.amount + 1;
    },
    reduceAmount: (state) => {
      state.amount = state.amount - 1;
    },
    editAd: (state) => {
      state.editedAd = !state.editedAd;
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
      state.adtype = action.payload;
    }
  }
});

export const { storeAllAds, increaseAmount, reduceAmount, nextPage, prevPage, toFirstPage, toSearch, toFilter } =
  adsSlice.actions;
export default adsSlice.reducer;
