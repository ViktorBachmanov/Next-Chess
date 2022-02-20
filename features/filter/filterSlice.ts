import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface FilterState {
  day: string;
  games: Array<any>;
  users: Array<any>;
  //status: "idle" | "loading" | "failed";
  mainTable: Array<Array<any>>;
  isReady: boolean;
  orderBy: "score" | "rating";
}

const initialState: FilterState = {
  day: "all",
  games: [],
  users: [],
  mainTable: [],
  isReady: false,
  orderBy: "rating",
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

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setState: (state, action: PayloadAction<any>) => {
      state.day = action.payload.day;

      const { games, users } = filterGamesAndUsersByDay(
        action.payload.allGames,
        action.payload.allUsers,
        action.payload.day
      );
      state.games = games!;
      state.users = users!;

      state.mainTable = generateMainTable(games, users);
      /*state.mainTable.sort((a, b) => {
        return b.score - a.score;
      });*/

      state.isReady = true;
    },
    setPending: (state) => {
      state.isReady = false;
    },
  },
});

export const { setState, setPending } = filterSlice.actions;

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

    dispatch(setState({ day, allUsers, allGames }));
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

function generateMainTable(games: Array<any>, users: Array<any>) {
  const mainTable: Array<any> = [];

  const userIdToTableIndex = new Map();

  for (let i = 0; i < users.length; i++) {
    userIdToTableIndex.set(users[i].id, i);

    mainTable[i] = [];

    for (let j = 0; j < users.length; j++) {
      mainTable[i][j] = 0;
    }

    mainTable[i].name = users[i].name;
    mainTable[i].score = 0;
    mainTable[i].games = 0;
  }

  console.log("userIdToTableIndex: ", userIdToTableIndex);

  games.forEach((game) => {
    const whiteId = game.white;
    const blackId = game.black;

    const whiteIndex = userIdToTableIndex.get(whiteId);
    const blackIndex = userIdToTableIndex.get(blackId);

    mainTable[whiteIndex].games++;
    mainTable[blackIndex].games++;

    if (game.winner === null) {
      mainTable[whiteIndex].score += 0.5;
      mainTable[blackIndex].score += 0.5;
      mainTable[whiteIndex][blackIndex] += 0.5;
      mainTable[blackIndex][whiteIndex] += 0.5;
    } else if (game.winner === whiteId) {
      mainTable[whiteIndex].score++;
      mainTable[whiteIndex][blackIndex]++;
    } else {
      mainTable[blackIndex].score++;
      mainTable[blackIndex][whiteIndex]++;
    }
  });

  return mainTable;
}
