import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dbReducer from "../features/db/dbSlice";
import filterReducer from "../features/filter/filterSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    db: dbReducer,
    filter: filterReducer,
    theme: themeReducer,
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
