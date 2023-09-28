import { Vector2 } from "./vector.mjs";

export class Sprite {
    constructor (src) {
        this.img = new Image();
        this.img.src = src;
        this.isLoaded = false;
        this.size = new Vector2();
        this.img.onload = () => {
            this.isLoaded = true;
            this.size = new Vector2(this.img.width, this.img.height);
        }
    }
}