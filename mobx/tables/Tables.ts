import { makeObservable, observable, computed, action, flow } from "mobx";
import { User, Game, MainTableRow, Order } from "./types";
import MainTable from "./MainTable";
import GamesTable from "./GamesTable";

export default class Tables {
  private _allUsers: User[];
  private _allGames: Game[];
  private _mainTableObj: MainTable;
  private _mainTable: MainTableRow[];
  private _gamesTable: GamesTable;
  private _orderBy: Order = Order.RATING;
  private _users: User[] = [];
  private _games: Game[] = [];
  private _day: string = "all";

  constructor(
    allUsers: User[],
    allGames: Game[],
    initialMainTable: MainTableRow[]
  ) {
    this._allUsers = allUsers;
    this._allGames = allGames;
    this._mainTable = initialMainTable;
    this.filterByDay(this._day);
    this._mainTableObj = new MainTable(this._users, this._games);
    this._gamesTable = new GamesTable(this._games, this._users);

    makeObservable<Tables, "_orderBy" | "_day" | "_mainTable">(this, {
      _orderBy: observable,
      _day: observable,
      _mainTable: observable,
      setOrderBy: action,
      setDay: action,
    });
  }

  get mainTable() {
    //return this._mainTableObj.getTableOrderedBy(this._orderBy);
    return this._mainTable;
  }

  get gamesTable() {
    return this._gamesTable;
  }

  get allUsers() {
    return [...this._allUsers];
  }

  get allGames() {
    return [...this._allGames];
  }

  get games() {
    return [...this._games];
  }

  get orderBy() {
    return this._orderBy;
  }

  setOrderBy(val: Order) {
    this._mainTable = this._mainTableObj.getTableOrderedBy(val);
    this._orderBy = val;
    //console.log("setOrderBy: ", this.orderBy);
  }

  get day() {
    return this._day;
  }

  setDay(day: string) {
    //console.log("Tables_setDay: ", day);
    this.filterByDay(day);

    this._mainTableObj.regenerate(this._users, this._games);
    this._mainTable = this._mainTableObj.getTableOrderedBy(this._orderBy);
    this._gamesTable.regenerate(this._games, this._users);

    this._day = day;
  }

  private filterByDay(day: string) {
    this._games =
      day === "all"
        ? this._allGames
        : this._allGames.filter((game) => game.date === day);
    this._users = this._allUsers.filter((user) => {
      return this._games.some((game) => {
        return game.white === user.id || game.black === user.id;
      });
    });
  }
}

// helper functions

// export function filterGamesAndUsersByDay(
//   allGames: Game[],
//   allUsers: User[],
//   day: string
// ) {
//   const filteredGames: Game[] =
//     day === "all" ? allGames : allGames.filter((game) => game.date === day);

//   const filteredUsers = allUsers.filter((user) => {
//     return filteredGames.some((game) => {
//       return game.white === user.id || game.black === user.id;
//     });
//   });

//   return { games: filteredGames, users: filteredUsers };
// }
