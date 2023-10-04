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
        this.ratio = 1 / 1;
    }

    fitScreen () { 
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
    }

    /**
     * @brief Fits the canvas to the screen, but keeps the aspect ratio
     */
    smartFitScreen () {
        const screenRatio = window.innerWidth / window.innerHeight;
        if (screenRatio > this.ratio) {
            this.#canvas.width = window.innerHeight * this.ratio;
            this.#canvas.height = window.innerHeight;
        } else {
            this.#canvas.width = window.innerWidth;
            this.#canvas.height = window.innerWidth / this.ratio;
        }
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
        pos = this.con(pos);
        size = this.con(size);
        this.#ctx.fillRect(pos.x, pos.y, size.x, size.y);
    }

    drawCircle (pos, radius) {
        pos = this.con(pos);
        this.#ctx.beginPath();
        this.#ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        this.#ctx.fill();
    }

    drawLine (pos1, pos2, thickness) {
        pos1 = this.con(pos1);
        pos2 = this.con(pos2);
        this.#ctx.beginPath();
        this.#ctx.moveTo(pos1.x, pos1.y);
        this.#ctx.lineTo(pos2.x, pos2.y);
        this.#ctx.lineWidth = thickness;
        this.#ctx.stroke();
    }

    clearCanvas () {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    }

    drawSprite (sprite, pos, size = null) {
        if (!sprite.isLoaded) return;
        size ??= sprite.size;
        pos = this.con(pos);
        size = this.con(size);
        this.#ctx.drawImage(sprite.img, pos.x, pos.y, size.x, size.y);
    }

    drawRotate (sprite, pos, angle, size = null) {
        if (!sprite.isLoaded) return;
        size ??= sprite.size;
        pos = this.con(pos);
        size = this.con(size);
        this.#ctx.save();
        this.#ctx.translate(pos.x + size.x / 2, pos.y + size.y / 2);
        this.#ctx.rotate(angle * Math.PI / 180);
        this.#ctx.drawImage(sprite.img, pos.x, pos.y, size.x, -size.y);
        this.#ctx.restore();

    }
    /**
     * @brief Converts a vector corresponding to the canvas size
     * @param {Vector2} vec2 
     * @returns 
     */
    con (vec2) {
        const screenRatio = window.innerWidth / window.innerHeight;
        const canvasRatio = this.#canvas.width / this.#canvas.height;
        if (screenRatio > canvasRatio) {
            const scale = this.#canvas.height / window.innerHeight;
            return new Vector2(vec2.x * scale, vec2.y * scale);
        } else {
            const scale = this.#canvas.width / window.innerWidth;
            return new Vector2(vec2.x * scale, vec2.y * scale);
        }
    }
}