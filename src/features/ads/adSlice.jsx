import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllAds, createAd, deleteAd as deleteBdAd, editAd as editBdAd } from "../../services/axios";

export const fetchAds = createAsyncThunk('@ads/fetchAll', async () => {
  const res = await getAllAds();
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
    loading: 'idle',
    ads: [{id:'1', announcer:'Facebook', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png', adType:'estatico', link:'https://www.facebook.com'},{id:'2', announcer:'Facebook', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png', adType:'estatico', link:'https://www.facebook.com'},{id:'3', announcer:'Facebook', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png', adType:'flotante', link:'https://www.facebook.com'},]
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAds.pending, (state, action) => {
      if (state.loading === 'idle') state.loading = 'pending';
    })
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.ads = action.payload;
        state.loading = 'idle';
      }
    })
    builder.addCase(deleteAd.fulfilled, (state, action) => {
      state.ads = state.ads.filter(ad => ad.id !== action.payload);
    })
  }
});

export default adsSlice.reducer;
