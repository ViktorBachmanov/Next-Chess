export class MainTableRow {
  public cells: Array<number> = [];
  public userId: number = 0;
  public userName: string = "";
  public score: number = 0;
  public games: number = 0;
  public rating: number = 0;
}

export enum Order {
  RATING,
  SCORE,
}
