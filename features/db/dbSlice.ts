import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


import { User, Game, RequestStatus } from './types'

interface DbState {
  users: User[]
  games: Game[]
  requestStatus: RequestStatus
}

const initialState: DbState = {
  users: [{id: 1, name: '', rating: 0}],
  games: [{id: 1, white: 1, black: 2, winner: 2}],
  requestStatus: RequestStatus.LOADING,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const fetchTables = createAsyncThunk(
    "db/fetchTables",
    async () => {
        let users: any;
        let games: any;
        const response = await fetch('/api/db/fetch');
            
        const body = response.json();
        console.log('AsyncThunk', body);
        return body;        
      
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
        const obj: any = action.payload;
        state.users = obj;
        state.requestStatus = RequestStatus.IDLE;
      })
    }
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