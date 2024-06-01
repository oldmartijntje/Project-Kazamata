import { config } from '../config.js';

export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export class Input {
    constructor() {
        this.heldDirections = [];

        document.addEventListener('keydown', (event) => {
            if (config.keys.upKeys.includes(event.key)) {
                this.onKeyPressed(UP);
            } else if (config.keys.downKeys.includes(event.key)) {
                this.onKeyPressed(DOWN);
            } else if (config.keys.leftKeys.includes(event.key)) {
                this.onKeyPressed(LEFT);
            } else if (config.keys.rightKeys.includes(event.key)) {
                this.onKeyPressed(RIGHT);
            }
        });

        document.addEventListener('keyup', (event) => {
            if (config.keys.upKeys.includes(event.key)) {
                this.onKeyReleased(UP);
            } else if (config.keys.downKeys.includes(event.key)) {
                this.onKeyReleased(DOWN);
            } else if (config.keys.leftKeys.includes(event.key)) {
                this.onKeyReleased(LEFT);
            } else if (config.keys.rightKeys.includes(event.key)) {
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