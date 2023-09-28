export class Vector2 {
    constructor (x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    pythagoreanTheorem () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize () {
        const length = this.pythagoreanTheorem();
        return new Vector2(this.x / length, this.y / length);
    }
}