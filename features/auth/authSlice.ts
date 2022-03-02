import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loginStatus: boolean;
}

let initialState: AuthState;

initialState = { loginStatus: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.loginStatus = action.payload;
    },
  },
});

export const { setLoginStatus } = authSlice.actions;

export default authSlice.reducer;

// helper functions
