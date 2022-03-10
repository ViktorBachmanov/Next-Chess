import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import MainTable from "./MainTable";
import GamesTable from "./GamesTable";
import { MainTableRow, Order, GamesTableRow } from "./types";
import { RequestStatus } from "../types";
import { User, Game } from "../db/types";

export interface FilterState {
  day: string;
  orderBy: Order;
  games: Array<Game>;
  users: Array<User>;
  requestStatus: RequestStatus;
  mainTable: Array<MainTableRow>;
  gamesTable: Array<GamesTableRow>;
}

const initialState: FilterState = {
  day: "all",
  orderBy: Order.RATING,
  games: [],
  users: [],
  requestStatus: RequestStatus.IDLE,
  mainTable: [],
  gamesTable: [],
};

export const mainTableObject = new MainTable();
export const gamesTableObject = new GamesTable();

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setDay: (state, action: PayloadAction<any>) => {
      state.day = action.payload.day;

      const { games, users } = filterGamesAndUsersByDay(
        action.payload.allGames,
        action.payload.allUsers,
        action.payload.day
      );
      state.games = games!;
      state.users = users!;

      mainTableObject.regenerate(state.games, state.users);
      state.mainTable = mainTableObject.getTableOrderedBy(state.orderBy);

      gamesTableObject.regenerate(state.games, state.users);
      state.gamesTable = gamesTableObject.getRows();
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.orderBy = action.payload;
      state.mainTable = mainTableObject.getTableOrderedBy(state.orderBy);
    },
    setInitialMainTable: (
      state,
      action: PayloadAction<Array<MainTableRow>>
    ) => {
      state.mainTable = action.payload;
    },
  },
});

export const { setDay, setOrder, setInitialMainTable } = filterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
export const setDayFilter =
  (day: string): AppThunk =>
  (dispatch, getState) => {
    const allUsers = getState().db.users;
    const allGames = getState().db.games;

    dispatch(setDay({ day, allUsers, allGames }));
  };

export default filterSlice.reducer;

// helper functions

export function filterGamesAndUsersByDay(
  games: Array<Game>,
  users: Array<User>,
  day: string
) {
  const filteredGames: Array<Game> =
    day === "all" ? games : games.filter((game) => game.date === day);

  const filteredUsers = users.filter((user) => {
    return filteredGames.some((game) => {
      return game.white === user.id || game.black === user.id;
    });
  });

  return { games: filteredGames, users: filteredUsers };
}
