import { Canvas } from './modules/canvas.mjs';
import { Vector2 } from './modules/vector.mjs';
import { Time } from './modules/gameloop.mjs';
import { Sprite } from './modules/sprite.mjs';

const canvas = new Canvas();
const mainLoop = new Time();
mainLoop.start();

const Rick = new Sprite('./assets/img/Rick.png');

canvas.putCanvas();

function draw () {
    canvas.fitScreen();
    canvas.clearCanvas();
    canvas.drawSprite(Rick, new Vector2(100, 100), new Vector2(Rick.size.x, Rick.size.y));
}

mainLoop.subscribeUpdate(draw);