import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  editAd as editBdAd,
} from "../../services/ads";

export const editAd = createAsyncThunk("@ads/editAd", async ({userToken, ad, id}) => {
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
    totalPages: 0,
    ads: [],
    editedAd: false
  },
  reducers: {
    storeAllAds: (state, { payload }) => {
      state.ads = payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    editAd: (state) => {
      state.editedAd = !state.editedAd;
    },
    toFirstPage: (state) => {
      state.page = 0;
    },
    toSearch: (state, action) => {
      state.search = action.payload;
    },
    toFilter: (state, action) => {
      state.adtype = action.payload;
    },
    setPage: (state, action) => {
      state.users = [];
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  }
});

export const { storeAllAds, setAmount, toFirstPage, toSearch, toFilter, setPage, setTotalPages } =
  adsSlice.actions;
export default adsSlice.reducer;
