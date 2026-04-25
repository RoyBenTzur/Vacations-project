import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./AuthSlice";

// Global store:
export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});