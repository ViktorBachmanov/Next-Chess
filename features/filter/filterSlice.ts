import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import MainTable from "./MainTable";
import { MainTableRow, Order } from "./types";

export interface FilterState {
  day: string;
  orderBy: Order;
  games: Array<any>;
  users: Array<any>;
  //status: "idle" | "loading" | "failed";
  mainTable: Array<MainTableRow>;
  isReady: boolean;
}

const initialState: FilterState = {
  day: "all",
  orderBy: Order.RATING,
  games: [],
  users: [],
  mainTable: [],
  isReady: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
/*
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);*/

const mainTableObject = new MainTable();

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

      //state.mainTable = generateMainTable(games, users);
      /*state.mainTable.sort((a, b) => {
        return b.score - a.score;
      });*/
      mainTableObject.regenerate(state.games, state.users);
      state.mainTable = mainTableObject.getTableOrderedBy(state.orderBy);

      state.isReady = true;
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.orderBy = action.payload;
      state.mainTable = mainTableObject.getTableOrderedBy(state.orderBy);
    },
    setPending: (state) => {
      state.isReady = false;
    },
  },
});

export const { setDay, setOrder, setPending } = filterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const setDayFilter =
  (day: string): AppThunk =>
  (dispatch, getState) => {
    const allUsers = getState().db.users;
    const allGames = getState().db.games;

    dispatch(setDay({ day, allUsers, allGames }));
  };

export default filterSlice.reducer;

// helper functions

function filterGamesAndUsersByDay(
  games: Array<any>,
  users: Array<any>,
  day: string
) {
  if (day === "all") {
    return { games, users };
  }

  const filteredGames = games.filter((game) => game.day === day);

  const filteredUsers = users.filter((user) => {
    return filteredGames.some((game) => {
      return game.white === user.id || game.black === user.id;
    });
  });

  return { games: filteredGames, users: filteredUsers };
}
