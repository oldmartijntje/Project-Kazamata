import { Animations } from "../../Animations.js";
import { GameObject } from "../../GameObject.js";
import { calculateNearestGridPosition, gridCells, isSpaceFree } from "../../helpers/grid.js";
import { resources } from '../../Resource.js';
import { DOWN, LEFT, RIGHT, UP } from "../../Input.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { PICK_UP_DOWN, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./heroAnimations.js";
import { FrameIndexPattern } from "../../FrameIndexPattern.js";
import { moveTowards } from "../../helpers/moveTowards.js";
import { config } from '../../../config.js';
import { walls } from "../../levels/level1.js";
import { events } from "../../Events.js";


export class Hero extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });

        const shadow = new Sprite({
            resource: resources.images.shadow,
            position: new Vector2(-8, -19),
            frameSize: new Vector2(32, 32),
        });
        this.addChild(shadow);

        this.body = new Sprite({
            resource: resources.images.hero,
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -20),
            animations: new Animations({
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkUp: new FrameIndexPattern(WALK_UP),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standUp: new FrameIndexPattern(STAND_UP),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT),
                pickupDown: new FrameIndexPattern(PICK_UP_DOWN),
            })
        });
        this.addChild(this.body);

        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
        this.itemPickupTime = 0;
        this.itemPickupShell = null;

        events.on('HERO_PICK_UP_ITEM', this, (value) => {
            this.onPickUpItem(value);
        });
    }

    step(deltaTime, root) {


        if (this.itemPickupTime > 0) {
            this.workOnItemPickup(deltaTime);
            return;
        }

        const distance = moveTowards(this, this.destinationPosition, 1);
        const hasArrived = distance <= 1;

        // if we've arrived, try to move in the direction of the input
        if (hasArrived) {
            this.tryMove(root);
        }
        this.tryEmitPosition()
    }

    tryEmitPosition() {
        if (this.lastPosition && this.lastPosition.x === this.position.x && this.lastPosition.y === this.position.y) {
            return;
        }
        events.emit('HERO_POSITION', { position: this.position, initialPosition: !this.lastPosition });
        this.lastPosition = this.position.duplicate();
    }

    onPickUpItem({ image, position }) {
        // make sure we are right on top of the item
        const pos = this.position.duplicate();
        this.position = calculateNearestGridPosition(pos.x, pos.y);
        this.destinationPosition = this.position.duplicate();

        this.itemPickupTime = 500; // ms

        // play the pickup animation
        this.itemPickupShell = new GameObject({});
        this.itemPickupShell.addChild(new Sprite({
            resource: image,
            position: new Vector2(0, -18)
        }));
        this.addChild(this.itemPickupShell);

    }

    tryMove(root) {
        const { input } = root;
        if (!input) {
            return;
        }
        if (!input.direction) {
            if (this.facingDirection === LEFT) {
                this.body.animations.play("standLeft");
            } else if (this.facingDirection === RIGHT) {
                this.body.animations.play("standRight");
            } else if (this.facingDirection === UP) {
                this.body.animations.play("standUp");
            } else if (this.facingDirection === DOWN) {
                this.body.animations.play("standDown");
            }
            return;
        }

        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;

        // round the x and y to the nearest whole number
        nextX = Math.round(nextX);
        nextY = Math.round(nextY);


        const gridSize = config["gridSize"];

        if (input.direction === LEFT) {
            nextX -= gridSize;
            this.body.animations.play("walkLeft");
        } else if (input.direction === RIGHT) {
            nextX += gridSize;
            this.body.animations.play("walkRight");
        } else if (input.direction === UP) {
            nextY -= gridSize;
            this.body.animations.play("walkUp");
        } else if (input.direction === DOWN) {
            nextY += gridSize;
            this.body.animations.play("walkDown");
        }
        this.facingDirection = input.direction ?? this.facingDirection;

        // check if the next position is valid

        if (isSpaceFree(walls, nextX, nextY)) {
            this.destinationPosition = calculateNearestGridPosition(nextX, nextY);
        }
    }

    workOnItemPickup(deltaTime) {
        this.itemPickupTime -= deltaTime;
        this.body.animations.play("pickupDown");

        if (this.itemPickupTime <= 0) {
            this.removeChild(this.itemPickupShell);
            this.itemPickupShell = null;
        }
    }

}