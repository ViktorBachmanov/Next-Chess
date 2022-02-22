export interface MainTableRow {
  cells: Array<number>;
  userId: number;
  userName: string;
  score: number;
  games: number;
  rating: number;
}

export enum Order {
  RATING,
  SCORE,
}
