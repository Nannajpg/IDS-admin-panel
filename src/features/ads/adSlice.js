import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAds as getAllAds, createAd, deleteAd as deleteBdAd, editAd as editBdAd } from "../../services/ads";

export const fetchAds = createAsyncThunk('@ads/fetchAds', async ({ page, adtype, search }) => {
  const res = await getAllAds(page, adtype, search);
  return res;
})

export const uploadAd = createAsyncThunk('@ads/uploadAd', async (ad) => {
  const res = await createAd(ad);
  return res;
})

export const deleteAd = createAsyncThunk('@ads/deleteAd', async (id) => {
  await deleteBdAd(id);
  return id;
})

export const editAd = createAsyncThunk('@ads/editAd', async (ad) => {
  await editBdAd(ad);
  return ad;
})

export const adsSlice = createSlice({
  name: "@ads",
  initialState: {
    adtype: '',
    search: '',
    amount: 0,
    page: 0,
    loading: 'idle',
    ads: [{id:"1", announcer:"papajohns", image:"https://assets.stickpng.com/images/5842998fa6515b1e0ad75ae0.png", adType:"static", redirecTo:"https://tailwindcss.com/docs/padding"}]
  },
  reducers: {
    editAd: (state, action) => {
      const { id, announcer, img, adType, redirecTo } = action.payload;
      const foundAd = state.find((ad) => ad.id === id);
      if (foundAd) {
        foundAd.announcer = announcer;
        foundAd.img = img;
        foundAd.adType = adType;
        foundAd.redirecTo = redirecTo;
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
      state.adtype = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAds.pending, (state, action) => {
      if (state.loading === 'idle') state.loading = 'pending';
    })
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.ads = action.payload.ads;
        state.amount = action.payload.totalAds;
        state.loading = 'idle';
      }
    })
  }
});

export const { nextPage, prevPage, toFirstPage, toSearch, toFilter } = adsSlice.actions;
export default adsSlice.reducer;
