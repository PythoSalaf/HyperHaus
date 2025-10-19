import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/authSlice";
import contractReducer from "../Features/Contract/contractSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contract: contractReducer,
  },
});
