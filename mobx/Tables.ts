import { makeObservable, observable, computed, action, flow } from "mobx";
import { User, Game, MainTableRow, Order } from "./types";
import MainTable, { filterGamesAndUsersByDay } from "./MainTable";

export default class Tables {
  private _allUsers: User[];
  private _allGames: Game[];
  private _mainTableObj: MainTable;
  //private _mainTable: MainTableRow[] = [];
  private _orderBy: Order = Order.RATING;
  private _users: User[] = [];
  private _games: Game[] = [];
  private _day: string = "all";

  constructor(allUsers: User[], allGames: Game[]) {
    this._allUsers = allUsers;
    this._allGames = allGames;
    this.setDay("all");
    this._mainTableObj = new MainTable(this._games, this._users);
    //this._mainTable = this._mainTableObj.getTableOrderedBy(this._orderBy);
    this.setOrderBy(this._orderBy);

    makeObservable<Tables, "_orderBy" | "_day">(this, {
      _orderBy: observable,
      _day: observable,
      mainTable: computed,
      setOrderBy: action,
      day: computed,
    });
  }

  get mainTable() {
    return this._mainTableObj.getTableOrderedBy(this._orderBy);
  }

  get orderBy() {
    return this._orderBy;
  }

  setOrderBy(val: Order) {
    this._orderBy = val;
    //console.log("setOrderBy: ", this.orderBy);

    //this._mainTable = this._mainTableObj.getTableOrderedBy(this._orderBy);
  }

  get day() {
    return this._day;
  }

  setDay(val: string) {
    this._day = val;
    const { games, users } = filterGamesAndUsersByDay(
      this._allGames,
      this._allUsers,
      this._day
    );
    this._games = games;
    this._users = users;

    this._mainTableObj.regenerate();
  }
}
