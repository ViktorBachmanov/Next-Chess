import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RequestStatus } from "../types";

import { User, Game } from "./types";

interface DbState {
  users: Array<User>;
  games: Array<Game>;
  requestStatus: RequestStatus;
}

const initialState: DbState = {
  users: [],
  games: [],
  requestStatus: RequestStatus.LOADING,
};

export const dbSlice = createSlice({
  name: "db",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    assignTables: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.users = action.payload.users;
      state.games = action.payload.games;
    },
  },
});

export const { assignTables } = dbSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectTitle = (state: RootState) => state.appbar.title;

export default dbSlice.reducer;
