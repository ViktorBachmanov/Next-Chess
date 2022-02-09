import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dbReducer from "../features/db/dbSlice";

export const store = configureStore({
  reducer: {
    db: dbReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;