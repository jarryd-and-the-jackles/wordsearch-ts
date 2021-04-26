export class Chronometer {
    elapsed: number;
    timer: NodeJS.Timeout;

    constructor() {
        this.elapsed = 0;
        this.timer = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.elapsed++;
    }

    getElapsed() {
        return this.elapsed;
    }

}

export default Chronometer;
