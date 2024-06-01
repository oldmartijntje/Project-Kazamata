import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";

export class Rod extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y),
        });
        this.position = new Vector2(x, y);
        const sprite = new Sprite({
            resource: resources.images.rod,
            position: new Vector2(0, -10),
        });
        this.addChild(sprite);

        events.on('HERO_POSITION', this, (value) => {
            if (this.position.x === Math.round(value.position.x) && this.position.y === Math.round(value.position.y)) {
                this.onCollideWithHero();
            }
        });

    }


    onCollideWithHero() {
        events.emit('HERO_PICK_UP_ITEM', {
            position: this.position,
            image: resources.images.rod,
        });
        this.destroy();
    }
}