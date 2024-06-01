import { Vector2 } from "./vector2.js";

export class Sprite {
    constructor({
        resource, // image resource
        frameSize, // size of the crop
        hFrames, // how the sprite is arranged horizontally
        vFrames, // how the sprite is arranged vertically
        frame, // which frame to display
        scale, // scale of the sprite
        position // position of the sprite
    }) {
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16, 16);
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0, 0);
        this.buildFrameMap();
    }

    buildFrameMap() {
        let frameCount = 0;
        for (let y = 0; y < this.vFrames; y++) {
            for (let x = 0; x < this.hFrames; x++) {
                this.frameMap.set(
                    frameCount,
                    new Vector2(
                        x * this.frameSize.x,
                        y * this.frameSize.y
                    )
                );
                frameCount++;
            }
        }
    }

    drawImage(ctx, x, y) {
        if (!this.resource.isLoaded) {
            return;
        }

        // find the correct sprite sheet frame to use
        let frameCordX = 0
        let frameCordY = 0
        const frame = this.frameMap.get(this.frame);
        if (frame) {
            frameCordX = frame.x;
            frameCordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameCordX,
            frameCordY,
            frameSizeX,
            frameSizeY,
            x,
            y,
            frameSizeX * this.scale,
            frameSizeY * this.scale
        );
    }
}