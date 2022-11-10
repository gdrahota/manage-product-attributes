export class Counter {
    private events: number = 0

    protected increase(): void {
        this.events++
    }

    protected getCounts(): number {
        return this.events
    }

}


export class NoiseCounter extends Counter {
    constructor() {
        super()
    }

    private meows: number = 0
    private wows: number = 0

    public meow(): void {
        this.meows++
        this.increase()
    }

    public wow() {
        this.wows++

        if(this.wows % 2 === 0){
            this.increase()
        }
    }

    public getEvents(): number {
        return super.getCounts()
    }

    public getMeows(): number {
        return this.meows
    }
}




