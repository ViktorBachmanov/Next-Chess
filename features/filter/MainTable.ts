import { MainTableRow, Order } from "./types";

export default class MainTable {
  private orderedByRating: Array<MainTableRow> = [];
  private userIdToByRatingIndex = new Map();

  public getTableOrderedBy(order: Order) {
    if (order === Order.RATING) {
      return this.getOrderedByRating();
    } else {
      return this.getOrderedByScore();
    }
  }

  public regenerate(games: Array<any>, users: Array<any>) {
    //const mainTable: Array<any> = [];
    this.orderedByRating = [];
    this.userIdToByRatingIndex.clear();

    for (let i = 0; i < users.length; i++) {
      this.userIdToByRatingIndex.set(users[i].id, i);

      this.orderedByRating[i] = {} as MainTableRow;

      this.orderedByRating[i].cells = [];

      for (let j = 0; j < users.length; j++) {
        this.orderedByRating[i].cells[j] = 0;
      }

      this.orderedByRating[i].userId = users[i].id;
      this.orderedByRating[i].userName = users[i].name;
      this.orderedByRating[i].score = 0;
      this.orderedByRating[i].games = 0;
      this.orderedByRating[i].rating = users[i].rating;
    }

    games.forEach((game) => {
      const whiteId = game.white;
      const blackId = game.black;

      const whiteIndex = this.userIdToByRatingIndex.get(whiteId);
      const blackIndex = this.userIdToByRatingIndex.get(blackId);

      this.orderedByRating[whiteIndex].games++;
      this.orderedByRating[blackIndex].games++;

      if (game.winner === null) {
        this.orderedByRating[whiteIndex].score += 0.5;
        this.orderedByRating[blackIndex].score += 0.5;
        this.orderedByRating[whiteIndex].cells[blackIndex] += 0.5;
        this.orderedByRating[blackIndex].cells[whiteIndex] += 0.5;
      } else if (game.winner === whiteId) {
        this.orderedByRating[whiteIndex].score++;
        this.orderedByRating[whiteIndex].cells[blackIndex]++;
      } else {
        this.orderedByRating[blackIndex].score++;
        this.orderedByRating[blackIndex].cells[whiteIndex]++;
      }
    });

    console.log("orderedByRating: )", this.orderedByRating);
    console.log(
      "JSON.stringify(orderedByRating: )",
      JSON.stringify(this.orderedByRating)
    );
  }

  private getOrderedByRating() {
    return this.orderedByRating;
  }

  private getOrderedByScore() {
    const orderedByScore = this.orderedByRating.map((row) => {
      return {
        ...row,
        cells: [...row.cells],
      };
    });

    orderedByScore.sort((a, b) => {
      return a.score - b.score;
    });

    const byScoreIndexToByRatingIndex = new Map();
    orderedByScore.forEach((row, index) => {
      byScoreIndexToByRatingIndex.set(
        index,
        this.userIdToByRatingIndex.get(row.userId)
      );
    });

    orderedByScore.forEach((row) => {
      const byRatingRowIndex = this.userIdToByRatingIndex.get(row.userId);
      row.cells.forEach((cell, cellIndex, cells) => {
        const byRatingCellIndex = byScoreIndexToByRatingIndex.get(cellIndex);
        cells[cellIndex] =
          this.orderedByRating[byRatingRowIndex].cells[byRatingCellIndex];
      });
    });

    console.log("byScoreIndexToByRatingIndex: ", byScoreIndexToByRatingIndex);
    console.log("this.orderedByRating: ", this.orderedByRating);
    console.log("orderedByScore: ", orderedByScore);

    return orderedByScore;
  }
}
