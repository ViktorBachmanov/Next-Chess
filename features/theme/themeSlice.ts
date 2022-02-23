import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LightStatus } from "./types";

interface ThemeState {
  lightStatus: LightStatus;
}

let initialState: ThemeState;

initialState = { lightStatus: LightStatus.DARK };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setLightStatus: (state, action: PayloadAction<LightStatus>) => {
      state.lightStatus = action.payload;
    },
  },
});

export const { setLightStatus } = themeSlice.actions;

export default themeSlice.reducer;

// helper functions
