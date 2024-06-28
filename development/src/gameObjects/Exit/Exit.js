import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { calculateMoveOnto } from "../../../../system/src/helpers/moveTowards.js";

export class Exit extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });
        this.drawLayer = "FLOOR"

        this.addChild(new Sprite({
            resource: resources.images.exit,
        }));

        this.lastPlayerPosition = new Vector2(0, 0);
    }

    step(deltaTime, root) {
        // Do nothing
    }

    onInit() {
        events.on('HERO_POSITION', this, (value) => {
            if (calculateMoveOnto(this.position, value.position, this.lastPlayerPosition)) {
                events.emit('HERO_EXITS');
            }
            this.lastPlayerPosition = new Vector2(value.position.x, value.position.y);
        });
    }
}