import { User, Game, MainTableRow, Order } from "./types";

export default class MainTable {
  private _orderedByRating: MainTableRow[] = [];
  private _userIdToByRatingIndex: Map<number, number> = new Map();

  constructor(users: User[], games: Game[]) {
    this.regenerate(users, games);
  }

  regenerate(users: User[], games: Game[]) {
    this._orderedByRating.length = 0;
    this._userIdToByRatingIndex.clear();

    for (let i = 0; i < users.length; i++) {
      this._userIdToByRatingIndex.set(users[i].id, i);

      this._orderedByRating[i] = {} as MainTableRow;

      this._orderedByRating[i].cells = [];

      for (let j = 0; j < users.length; j++) {
        this._orderedByRating[i].cells[j] = 0;
      }

      this._orderedByRating[i].userId = users[i].id;
      this._orderedByRating[i].userName = users[i].name;
      this._orderedByRating[i].score = 0;
      this._orderedByRating[i].games = 0;
      this._orderedByRating[i].rating = users[i].rating;
    }

    games.forEach((game) => {
      const whiteId = game.white;
      const blackId = game.black;

      const whiteIndex = this._userIdToByRatingIndex.get(whiteId)!;
      const blackIndex = this._userIdToByRatingIndex.get(blackId)!;

      this._orderedByRating[whiteIndex].games++;
      this._orderedByRating[blackIndex].games++;

      if (game.winner === null) {
        this._orderedByRating[whiteIndex].score += 0.5;
        this._orderedByRating[blackIndex].score += 0.5;
        this._orderedByRating[whiteIndex].cells[blackIndex] += 0.5;
        this._orderedByRating[blackIndex].cells[whiteIndex] += 0.5;
      } else if (game.winner === whiteId) {
        this._orderedByRating[whiteIndex].score++;
        this._orderedByRating[whiteIndex].cells[blackIndex]++;
      } else {
        this._orderedByRating[blackIndex].score++;
        this._orderedByRating[blackIndex].cells[whiteIndex]++;
      }
    });
  }

  public getTableOrderedBy(order: Order) {
    if (order === Order.RATING) {
      return this.get_orderedByRating();
    } else {
      return this.getOrderedByScore();
    }
  }

  private get_orderedByRating() {
    return this._orderedByRating;
  }

  private getOrderedByScore() {
    const orderedByScore = this._orderedByRating.map((row) => {
      return {
        ...row,
        cells: [...row.cells],
      };
    });

    orderedByScore.sort((a, b) => {
      if (b.score === a.score) {
        return a.games - b.games;
      } else {
        return b.score - a.score;
      }
    });

    const byScoreIndexToByRatingIndex = new Map();
    orderedByScore.forEach((row, index) => {
      byScoreIndexToByRatingIndex.set(
        index,
        this._userIdToByRatingIndex.get(row.userId)
      );
    });

    orderedByScore.forEach((row) => {
      const byRatingRowIndex = this._userIdToByRatingIndex.get(row.userId)!;
      row.cells.forEach((cell, cellIndex, cells) => {
        const byRatingCellIndex = byScoreIndexToByRatingIndex.get(cellIndex);
        cells[cellIndex] =
          this._orderedByRating[byRatingRowIndex].cells[byRatingCellIndex];
      });
    });

    return orderedByScore;
  }
}
