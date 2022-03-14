import { GamesTableRow } from "./types";
import { User, Game } from "../db/types";

export default class GamesTable {
  private rows: Array<GamesTableRow> = [];
  private userIdToName = new Map();

  public regenerate(games: Array<Game>, users: Array<User>) {
    this.rows = [];
    this.userIdToName.clear();

    users.forEach((user) => {
      this.userIdToName.set(user.id, user.name);
    });

    games.forEach((game) => {
      this.rows.push({
        whiteId: game.white,
        blackId: game.black,
        winnerId: game.winner,
        day: game.date,
      });
    });
  }

  public getRows() {
    return [...this.rows];
  }

  public getUserNameById(id: number) {
    return this.userIdToName.get(id);
  }
}
