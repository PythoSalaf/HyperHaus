import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  authenticated: false,
  ready: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.address = action.payload.address;
      state.authenticated = action.payload.authenticated;
      state.ready = action.payload.ready;
    },
    logout: (state) => {
      state.address = null;
      state.authenticated = false;
    },
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
