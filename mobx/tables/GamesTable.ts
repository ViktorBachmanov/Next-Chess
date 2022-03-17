import { User, Game, GamesTableRow } from "./types";

export default class GamesTable {
  private rows: GamesTableRow[] = [];
  private userIdToName = new Map();

  constructor(games: Game[], users: User[]) {
    this.regenerate(games, users);
  }

  public regenerate(games: Game[], users: User[]) {
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
