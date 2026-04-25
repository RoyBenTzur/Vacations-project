import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { authService } from "../Services/AuthService";

// Auth state:
export interface AuthState {
    user: UserModel | null;
}

// Initial auth state:
const initialState: AuthState = {
    user: authService.getUser()
};

// Login reducer:
function login(currentState: AuthState, action: PayloadAction<UserModel>): AuthState {
    const user = action.payload;
    const newState = { ...currentState };
    newState.user = user;
    return newState;
}

// Logout reducer:
function logout(currentState: AuthState): AuthState {
    const newState = { ...currentState };
    newState.user = null;
    return newState;
}

// Auth slice:
export const authSlice = createSlice({
    name: "auth-slice",
    initialState,
    reducers: { login, logout }
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;