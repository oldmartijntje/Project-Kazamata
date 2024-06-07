import { config } from '../config.js';

export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export class Input {
    constructor() {
        this.heldDirections = [];
        this.keys = {};
        this.lastKeys = {};

        document.addEventListener('keydown', (event) => {

            this.keys[event.code] = true;

            if (config.keys.upKeys.includes(event.code)) {
                this.onKeyPressed(UP);
            } else if (config.keys.downKeys.includes(event.code)) {
                this.onKeyPressed(DOWN);
            } else if (config.keys.leftKeys.includes(event.code)) {
                this.onKeyPressed(LEFT);
            } else if (config.keys.rightKeys.includes(event.code)) {
                this.onKeyPressed(RIGHT);
            }
        });

        document.addEventListener('keyup', (event) => {

            this.keys[event.code] = false;

            if (config.keys.upKeys.includes(event.code)) {
                this.onKeyReleased(UP);
            } else if (config.keys.downKeys.includes(event.code)) {
                this.onKeyReleased(DOWN);
            } else if (config.keys.leftKeys.includes(event.code)) {
                this.onKeyReleased(LEFT);
            } else if (config.keys.rightKeys.includes(event.code)) {
                this.onKeyReleased(RIGHT);
            }
        });
        document.addEventListener('DOMContentLoaded', () => {
            // adding physical mobile buttons
            const leftButton = document.getElementById('leftButton');
            const rightButton = document.getElementById('rightButton');
            const upButton = document.getElementById('upButton');
            const downButton = document.getElementById('downButton');

            const addEventListeners = (button, direction) => {
                button.addEventListener('mousedown', () => this.onKeyPressed(direction));
                button.addEventListener('mouseup', () => this.onKeyReleased(direction));
                button.addEventListener('touchstart', (event) => {
                    event.preventDefault(); // Prevent default touch behavior
                    this.onKeyPressed(direction);
                });
                button.addEventListener('touchend', (event) => {
                    event.preventDefault(); // Prevent default touch behavior
                    this.onKeyReleased(direction);
                });
            }

            addEventListeners(leftButton, LEFT);
            addEventListeners(rightButton, RIGHT);
            addEventListeners(upButton, UP);
            addEventListeners(downButton, DOWN);
        });
    }

    get direction() {
        return this.heldDirections[0];
    }

    update() {
        // Diff the keys to get the keys that were pressed since the last update
        this.lastKeys = { ...this.keys };
    }

    getActionJustPressed(keyCode) {
        let justPressed = false;
        if (this.keys[keyCode] && !this.lastKeys[keyCode]) {
            justPressed = true;
        }
        return justPressed;
    }

    onKeyPressed(direction) {
        if (!this.heldDirections.includes(direction)) {
            this.heldDirections.unshift(direction);
        }
    }

    onKeyReleased(direction) {
        const index = this.heldDirections.indexOf(direction);
        if (index > -1) {
            this.heldDirections.splice(index, 1);
        }
    }
}