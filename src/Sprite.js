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
        this.frameSize = frameSize;
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position;
        this.buildFrameMap();
    }

    buildFrameMap() {
        let frameCount = 0;
        for (let y = 0; y < this.vFrames; y++) {
            for (let x = 0; x < this.hFrames; x++) {
                console.log(x, y);
                this.frameMap.set(frameCount, {
                    x: x * this.frameSize.width,
                    y: y * this.frameSize.height
                });
                frameCount++;
            }
        }
    }
}