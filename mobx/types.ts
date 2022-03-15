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
