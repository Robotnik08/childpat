import { Vector2 } from "./vector.mjs";

export class Trash {
    constructor (pos) {
        this.pos = pos;
        this.type = (Math.random() * 16)|0;
        this.angle = Math.random() * 180 - 90;
    }
}

export function spawnTrash () {
    let x, y = 0;
    while (x > 1920 - 100 || y > 1080 - 200 || x < 100 || y < 400) {
        x = Math.random() * 1920;
        y = Math.random() * 1080;
    }
    const pos = new Vector2(x, y);
    return new Trash(pos);
}