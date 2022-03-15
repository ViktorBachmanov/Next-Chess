import { makeObservable, observable, computed, action, flow } from "mobx";
import { User, Game } from "./types";

export default class Tables {
  allUsers: User[];
  allGames: Game[];

  constructor(allUsers: User[], allGames: Game[]) {
    this.allUsers = allUsers;
    this.allGames = allGames;

    makeObservable(this, {
      allUsers: observable,
      truncate: action,
      allUsersTable: computed,
    });
  }

  // get double() {
  //   return this.value * 2;
  // }

  truncate() {
    this.allUsers.length = 5;
    //this.allUsers = [...this.allUsers];
    //this.allUsers = this.allUsers.slice(5);
  }

  get allUsersTable() {
    return this.allUsers;
  }
}
