import { events } from "./Events";
import { GameObject } from "./GameObject";
import { Vector2 } from "./Vector2";

export class Camera extends GameObject {
    constructor() {
        super({});
        this.offset = new Vector2(0, 0);

        events.on('HERO_POSITION', this, (value) => {

            // create a camera offset
            const personHalf = 8;
            const canvasWidth = 320;
            const canvasHeight = 180;
            const halfWidth = -personHalf + canvasWidth / 2;
            const halfHeight = -personHalf + canvasHeight / 2;
            this.position = new Vector2(-value.position.x + halfWidth, -value.position.y + halfHeight);
        });
    }
}