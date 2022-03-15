import { makeObservable, observable, computed, action, flow } from "mobx";
import { User, Game, MainTableRow, Order } from "./types";
import MainTable, { filterGamesAndUsersByDay } from "./MainTable";

export default class Tables {
  private _allUsers: User[];
  private _allGames: Game[];
  private _mainTable: MainTableRow[];
  private _orderBy: Order = Order.RATING;
  private _users: User[] = [];
  private _games: Game[] = [];
  private _day: string = "all";

  constructor(allUsers: User[], allGames: Game[], mainTable: MainTableRow[]) {
    this._allUsers = allUsers;
    this._allGames = allGames;
    this._mainTable = mainTable;

    makeObservable<Tables, "_mainTable">(this, {
      _mainTable: observable,
      //truncate: action,
      mainTable: computed,
      setOrderBy: action,
      day: computed,
    });
  }

  get mainTable() {
    return this._mainTable;
  }

  get orderBy() {
    return this._orderBy;
  }

  setOrderBy(val: Order) {
    this._orderBy = val;
    console.log("setOrderBy: ", this.orderBy);

    this.day = "all";

    this._mainTable = new MainTable(this._games, this._users).getTableOrderedBy(
      this.orderBy
    );
    //this._mainTable = [];
  }

  get day() {
    return this._day;
  }

  set day(val: string) {
    this._day = val;
    const { games, users } = filterGamesAndUsersByDay(
      this._allGames,
      this._allUsers,
      this._day
    );
    this._games = games;
    this._users = users;
  }
}
