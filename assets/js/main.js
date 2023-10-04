import { Canvas } from './modules/canvas.mjs';
import { Vector2 } from './modules/vector.mjs';
import { Time } from './modules/gameloop.mjs';
import { Sprite } from './modules/sprite.mjs';

const canvas = new Canvas();
const mainLoop = new Time();
let angle = 0;
let clawSpeed = 50;
let boat_x = 400;

const clawPos = new Vector2(100,100);
mainLoop.start();

const claw_open = new Sprite('./assets/img/claw_open.png');
const sea_03 = new Sprite('./assets/img/sea-03.png');
const boat_01 = new Sprite('./assets/img/b1.png');
// const sea_02 = new Sprite('./assets/img/sea-02.png');

canvas.putCanvas();

function draw () {
    canvas.smartFitScreen(4/3);
    canvas.clearCanvas();
    canvas.drawSprite(sea_03, new Vector2(0, -650), new Vector2(1920, 1700));
    canvas.drawSprite(boat_01, new Vector2(boat_x, 140));

    // CLAW TEST
    canvas.drawRotate(claw_open, clawPos, Math.sin(angle) * 50, new Vector2(100, 100));
}

function update (dt) {
    angle += clawSpeed * dt;
}

mainLoop.subscribeUpdate(draw);
mainLoop.subscribeUpdate(update);