export interface User {
  id: number;
  name: string;
  score: number;
  games: number;
  rating: number;
}

export interface Game {
  id: number;
  white: number;
  black: number;
  winner: number;
  date: string;
}

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

export interface GamesTableRow {
  whiteId: number;
  blackId: number;
  winnerId: number;
  day: string;
}
