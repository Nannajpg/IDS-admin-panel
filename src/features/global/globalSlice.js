import { createSlice } from '@reduxjs/toolkit'

export const globalSlice = createSlice({
    name: 'global',
    initialState: { loading: false },
    reducers:{
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
    }
});

export const { setLoading } = globalSlice.actions;
export default globalSlice.reducer;
