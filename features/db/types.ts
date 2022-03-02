export interface User {
  id: number;
  name: string;
  score: number;
  games: number;
  rating: number;
}

export interface Game {
  white: number;
  black: number;
  winner: number;
  date: Date;
}
