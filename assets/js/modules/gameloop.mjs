export class Time {
    #updates = [];

    constructor () {
        this.deltaTime = 0;
        this.lastTime = 0;
        this.trueUpdate = () => {
            this.#update();
    
            const now = performance.now();
            this.deltaTime = (now - this.lastTime) / 1000 / 60;
            this.lastTime = now;
    
            requestAnimationFrame(this.trueUpdate);   
        }
    }

    subscribeUpdate (update) {
        this.#updates.push(update);
    }
    
    #update () {
        this.#updates.forEach(update => update(this.deltaTime));
    }

    start () {
        this.trueUpdate();
    }

}