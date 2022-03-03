import { User, Game } from "./features/db/types";

export class UserData {
  public readonly id: number;
  public rating: number;
  public isTotalGamesGT30: boolean;
  //private userRecord: User;

  constructor(id: number, users: Array<User>, games: Array<Game>) {
    this.id = id;
    const userRecord: User = users.find((user) => user.id === this.id)!;
    this.rating = userRecord.rating;

    this.isTotalGamesGT30 = UserData.isTotalGamesGT30(games, this.id);
    console.log("isTotalGamesGT30: ", this.isTotalGamesGT30);
  }

  public evalRating(opponentRating: number, score: number) {
    const expectedScore =
      1 / (1 + Math.pow(10, (opponentRating - this.rating) / 400));

    let koef: number;
    if (this.rating >= 2400) {
      koef = 10;
    } else if (this.isTotalGamesGT30) {
      koef = 20;
    } else {
      koef = 40;
    }

    this.rating += koef * (score - expectedScore);
  }

  public evalOldRating(opponentRating: number, score: number) {
    const expectedScore =
      1 / (1 + Math.pow(10, (opponentRating - this.rating) / 400));

    let koef: number;
    if (this.rating >= 2400) {
      koef = 10;
    } else if (this.isTotalGamesGT30) {
      koef = 20;
    } else {
      koef = 40;
    }

    this.rating -= koef * (score - expectedScore);
  }

  private static isTotalGamesGT30(games: Array<Game>, userId: number) {
    let totalGames = 0;
    for (let i = 0; i < games.length; i++) {
      if (games[i].white === userId || games[i].black === userId) {
        totalGames++;
      }
      if (totalGames > 30) {
        return true;
      }
    }
    return false;
  }
}

export interface SendData {
  white: UserData;
  black: UserData;
  authToken: string;
}

export interface CreateGameData extends SendData {
  winner: number | null;
  day: string;
}

export interface DeleteGameData extends SendData {
  id: number;
}
