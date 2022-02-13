import { User } from "./features/db/types"


export class UserData {
    private userRecord: User | undefined;

    constructor(public readonly id: number,
                users: Array<User>,
                public score?: number)
    {
        this.userRecord = users.find(user => user.id == this.id);
    }
  
    public increaseScore(val: number) {
      this.score = this.userRecord?.score;
      //console.log('increaseScore: ', this.score);
      if(this.score !== undefined) {
        this.score += val;
      }
    }
}
  
export class SendData {
    public winner: number | null;
  
    constructor(public readonly white: UserData,
                public readonly black: UserData)
    { 
        this.winner = null;
    }
}