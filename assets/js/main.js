import { Canvas } from './modules/canvas.mjs';
import { Vector2 } from './modules/vector.mjs';
import { Time } from './modules/gameloop.mjs';
import { Sprite } from './modules/sprite.mjs';
import { Trash } from './modules/plastic.mjs';
import { spawnTrash } from './modules/plastic.mjs';

const canvas = new Canvas();
const mainLoop = new Time();
let angle = 0;
let clawSpeed = 50;
let grabSpeed = 250;
let grabPos = 0;
let inGrab = false;
let retreat = false;
let clawContent = -1;
let score = 0;
mainLoop.start();

const claw_open = new Sprite('./assets/img/claw_open.png');
const claw_closed = new Sprite('./assets/img/claw_close.png');
const sea_03 = new Sprite('./assets/img/sea-03.png');
const boats = [
    new Sprite('./assets/img/b1.png'),
    new Sprite('./assets/img/b2.png'),
    new Sprite('./assets/img/b3.png'),
    new Sprite('./assets/img/b4.png'),
    new Sprite('./assets/img/b5.png')
];

const trashSprites = [
    new Sprite('./assets/img/trash01.png'),
    new Sprite('./assets/img/trash02.png'),
    new Sprite('./assets/img/trash03.png'),
    new Sprite('./assets/img/trash04.png'),
    new Sprite('./assets/img/trash05.png'),
    new Sprite('./assets/img/trash06.png'),
    new Sprite('./assets/img/trash07.png'),
    new Sprite('./assets/img/trash08.png'),
    new Sprite('./assets/img/trash09.png'),
    new Sprite('./assets/img/trash10.png'),
    new Sprite('./assets/img/trash11.png'),
    new Sprite('./assets/img/trash12.png'),
    new Sprite('./assets/img/trash13.png'),
    new Sprite('./assets/img/trash14.png'),
    new Sprite('./assets/img/trash15.png'),
    new Sprite('./assets/img/Rick.png')
];
const points = [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    3,
    1,
    3,
    1,
    1,
    1
];

let trash = [];

for (let i = 0; i < 30; i++) {
    trash.push(spawnTrash());
}
// const sea_02 = new Sprite('./assets/img/sea-02.png');

const clawPos = new Vector2(912, 270);

canvas.putCanvas();

function draw () {
    // canvas.smartFitScreen(4/3);
    canvas.clearCanvas();
    canvas.fitScreen();
    canvas.drawSprite(sea_03, new Vector2(0, -650), new Vector2(1920, 1700));
    canvas.drawSprite(boats[Math.min((score/10)|0, boats.length-1)], new Vector2(800, 80), new Vector2(boats[0].size.x/6, boats[0].size.y/6));

    // CLAW TEST
    canvas.drawRotate(clawContent > -1 ? claw_closed : claw_open, new Vector2(clawPos.x + getClawPosition().x * grabPos, clawPos.y + getClawPosition().y * grabPos), Math.sin(angle) * 60, new Vector2(claw_open.size.x/5, claw_open.size.y/5));

    // DRAW LINE TO CLAW POSITION
    canvas.drawLine(new Vector2(clawPos.x, clawPos.y-33), new Vector2(clawPos.x + getClawPosition().x * grabPos, clawPos.y + getClawPosition().y * grabPos), 5);

    // DRAW TRASH
    for (let i in trash) {
        canvas.drawRotate(trashSprites[trash[i].type], new Vector2(trash[i].pos.x - trashSprites[trash[i].type].size.x/20/2, trash[i].pos.y - trashSprites[trash[i].type].size.y/20/2), trash[i].angle, new Vector2(trashSprites[trash[i].type].size.x/20, trashSprites[trash[i].type].size.y/20));
    }

    // DRAW CLAW CONTENT
    if (clawContent != -1) {
        canvas.drawSprite(trashSprites[clawContent], new Vector2(clawPos.x + getClawPosition().x * grabPos - trashSprites[clawContent].size.x/20/2, clawPos.y + getClawPosition().y * grabPos - trashSprites[clawContent].size.x/20/2), new Vector2(trashSprites[clawContent].size.x/20, trashSprites[clawContent].size.y/20));
    }

    // DRAW SCORE
    canvas.setColor('white');
    canvas.drawRect(new Vector2(0, 0), new Vector2(200, 50));
    canvas.setColor('black');
    canvas.drawRect(new Vector2(0, 0), new Vector2(200, 50));
    canvas.setColor('white');
    canvas.drawText('Score: ' + score, new Vector2(10, 30), new Vector2(30, 30));
    canvas.setColor('black');

}

function update (dt) {
    if (trash.length < 8) {
        for (let i = 0; i < 25; i++) {
            trash.push(spawnTrash());
        }
    }
    if (!inGrab) {
        angle += clawSpeed * dt;
        angle = fixAngle(angle);
        return;
    }
    grabPos += grabSpeed * dt * (retreat ? -2 : 1);
    if (grabPos > 16) {
        grabPos = 16;
        retreat = true;
    } else if (grabPos < 0) {
        grabPos = 0;
        inGrab = false;
        retreat = false;
        if (clawContent != -1) {
            score += points[clawContent];
            clawContent = -1;
        }
    }
    if (retreat) return;
    for (let i in trash) {
        if (Math.abs(new Vector2(clawPos.x + getClawPosition().x * grabPos - trash[i].pos.x, clawPos.y + getClawPosition().y * grabPos - trash[i].pos.y).pythagoreanTheorem()) < 80 && clawContent == -1) {
            clawContent = trash[i].type;
            retreat = true;
            trash.splice(i, 1);
            return;
        }
    }
}

mainLoop.subscribeUpdate(draw);
mainLoop.subscribeUpdate(update);

document.addEventListener('mousedown', e => {
    grab();
});

function grab () {
    inGrab = true;
}

function getClawPosition () {
    const x = -Math.sin(trueAngle(angle)) * 60;
    const y = -Math.cos(trueAngle(angle)) * 60;
    return new Vector2(x, y);
}
function trueAngle (a) {
    if (a > Math.PI/2 && a < Math.PI*1.5) {
        return a;
    }
    return Math.PI*2 - fixAngle((a + Math.PI) % (2 * Math.PI));
}
function fixAngle (a) {
    if (a > 2 * Math.PI) {
        return fixAngle(a - 2 * Math.PI);	
    } else if (a < 0) {
        return fixAngle(a + 2 * Math.PI);
    }
    return a;
}