import { Vector2 } from "./Vector2.js";

export class GameObject {
    constructor({ position }) {
        this.position = position ?? new Vector2(0, 0);
        this.children = [];
    }

    // First entry point of the loop
    stepEntry(deltaTime, root) {
        // call the stepEntry method for all children
        this.children.forEach(child => child.stepEntry(deltaTime, root));

        // call the step method
        this.step(deltaTime, root);
    }

    // called once per frame
    step(_deltaTime) {
        // override this method
    }

    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        // Do the actual rendering for Images
        this.drawImage(ctx, drawPosX, drawPosY);

        // call the draw method for all children
        this.children.forEach(child => child.draw(ctx, drawPosX, drawPosY));
    }

    drawImage(_ctx, _x, _y) {
        // override this method
    }

    addChild(gameObject) {
        // gameObject.parent = this -> this is not needed for now.
        this.children.push(gameObject);
    }

    removeChild(gameObject) {
        this.children = this.children.filter(child => child !== gameObject);
    }
}