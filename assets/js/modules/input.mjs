export class Input {
    constructor () {
        const keys = {};
        window.addEventListener('keydown', (e) => {
            keys[e.code] = true;
        });
        window.addEventListener('keyup', (e) => {
            keys[e.code] = false;
        });

        this.getKey = (key) => {
            return keys[key] ? true : false;
        }
    }
}