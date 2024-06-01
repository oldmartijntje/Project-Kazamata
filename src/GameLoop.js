export class GameLoop {
    constructor(update, render) {

        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60 fps

        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;
    }

    mainLoop = (timestamp) => {
        if (!this.isRunning) {
            return;
        }

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        // Accumulate all the time that has passed
        this.accumulatedTime += deltaTime;

        // fixed time step updates
        // if there is enough accumulated time to run one or more updates
        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep);
            this.accumulatedTime -= this.timeStep;
        }

        // Render

        this.render();

        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start() {
        if (this.isRunning) {
            return;
        }
        this.isRunning = true;
        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    stop() {
        if (!this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}