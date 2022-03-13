export default class Timer {
  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  print(from: string) {
    const currentTime = Date.now();
    const diff = currentTime - this.startTime;
    console.log(from + ": " + diff);
  }
}
