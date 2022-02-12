export interface User {
    id: number;
    name: string;
    rating: number;
    score: number;
}
  
export interface Game {
    id: number;
    white: number;
    black: number;
    winner: number;
}

export enum RequestStatus {
    IDLE,
    LOADING,
    FAILED,
}