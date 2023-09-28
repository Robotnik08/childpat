import { Sprite } from "./sprite.mjs";
import { Vector2 } from "./vector.mjs";

export class Canvas {
    #canvas;
    #ctx;

    constructor () {
        this.mousePosition = new Vector2();
        document.addEventListener('mousemove', e => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
        this.#canvas = document.createElement('canvas');
        this.#ctx = this.#canvas.getContext('2d');
    }

    fitScreen () { 
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
    }

    putCanvas () {
        document.body.appendChild(this.#canvas);
    }

    removeCanvas () {
        document.body.removeChild(this.#canvas);
    }
    setColor (color) {
        this.#ctx.fillStyle = color;
    }

    drawRect (pos, size) {
        this.#ctx.fillRect(pos.x, pos.y, size.x, size.y);
    }

    drawCircle (pos, radius) {
        this.#ctx.beginPath();
        this.#ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        this.#ctx.fill();
    }

    clearCanvas () {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    drawSprite (sprite, pos, size = null) {
        size ??= sprite.size;
        console.log(sprite.isLoaded);
        if (!sprite.isLoaded) return;
        this.#ctx.drawImage(sprite.img, pos.x, pos.y, size.x, size.y);
    }

    drawRotate (sprite, pos, size, angle) {
        
    }

    rotateCanvas (angle) {
        this.#ctx.rotate(angle);
    }
}