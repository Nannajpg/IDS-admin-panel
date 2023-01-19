import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
    name: 'global',
    initialState: { loading: true },
    reducers:{
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
    }
});

export const { setLoading } = globalSlice.actions;
export default globalSlice.reducer;
