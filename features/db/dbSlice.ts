import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { RequestStatus } from "../types";

import { SendData } from "../../types";
//import { setPending } from "../filter/filterSlice";

interface DbState {
  users: Array<any>;
  games: Array<any>;
  requestStatus: RequestStatus;
}

const initialState: DbState = {
  users: [],
  games: [],
  requestStatus: RequestStatus.LOADING,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const fetchTables = createAsyncThunk(
  "db/fetchTables",
  async (_payload, { dispatch }) => {
    //getState().filter.setPending();
    //dispatch(setPending());
    const response = await fetch("/api/db/fetch");

    const tables = response.json();
    console.log("AsyncThunk", tables);
    return tables;

    // The value we return becomes the `fulfilled` action payload
  }
);

export const createGame = createAsyncThunk(
  "db/createGame",
  async (sendData: SendData, { dispatch }) => {
    const response = await fetch("/api/game/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });

    dispatch(fetchTables());

    //await fetch('/api/db/fetch');

    //const tables = response.json();
    //console.log('AsyncThunk', tables);
    //return tables;

    // The value we return becomes the `fulfilled` action payload
  }
);

export const deleteGame = createAsyncThunk(
  "db/deleteGame",
  async (gameId: number, { dispatch }) => {
    const response = await fetch("/api/game/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameId),
    });

    dispatch(fetchTables());

    // The value we return becomes the `fulfilled` action payload
  }
);

export const dbSlice = createSlice({
  name: "db",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //state.title = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        const tables: any = action.payload;
        state.users = tables[0];
        state.games = tables[1];
        state.requestStatus = RequestStatus.IDLE;
      })
      .addCase(createGame.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(createGame.fulfilled, (state) => {
        state.requestStatus = RequestStatus.IDLE;
      })
      .addCase(deleteGame.pending, (state) => {
        state.requestStatus = RequestStatus.LOADING;
      })
      .addCase(deleteGame.fulfilled, (state) => {
        state.requestStatus = RequestStatus.IDLE;
      });
  },
});

export const { setTitle } = dbSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectTitle = (state: RootState) => state.appbar.title;

export default dbSlice.reducer;

/*

export const getServerSideProps: GetServerSideProps = async () => {
  const [users, games] = await Promise.all([prisma.user.findMany({ orderBy: {name: 'asc'}}), 
                                          prisma.game.findMany()]);
  
  return { props: { users, games } };
};
*/
