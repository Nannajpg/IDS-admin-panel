import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {}, 
  userToken: null, 
  success: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    'login': (state, { payload }) => {
      state.success = true;
      const { user, token } = payload;
      state.userInfo = user;
      state.userToken = token;
    },
    'logout': (state, _) => {
      state.success = false;
      state.userInfo = {};
      state.userToken = null;
      state.error = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;