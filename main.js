import { resources } from './src/Resource.js';
import { Sprite } from './src/Sprite.js';
import { Vector2 } from "./src/Vector2.js";
import { GameLoop } from "./src/GameLoop.js";
import { Input } from "./src/Input.js";
import { gridCells } from './src/helpers/grid.js';
import { GameObject } from './src/GameObject.js';
import { Hero } from './src/objects/Hero/Hero.js';
import { Camera } from './src/Camera.js';
import { Rod } from './src/objects/Rod/Rod.js';
import { Inventory } from './src/objects/Inventory/Inventory.js';
import { Exit } from './src/objects/Exit/Exit.js';
import { events } from './src/Events.js';
import { Main } from './src/objects/Main/Main.js';
import { OutdoorLevel1 } from './src/levels/OutdoorLevel1.js';

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

// In the future, move this into a level object.
const mainScene = new Main({
    position: new Vector2(0, 0),
});
mainScene.setLevel(new OutdoorLevel1());

events.on('HERO_EXITS', mainScene, () => {
    console.log('Hero exits');
});


const update = (deltaTime) => {
    mainScene.stepEntry(deltaTime, mainScene);
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mainScene.drawBackground(ctx);

    // save current state (for camera offset)
    ctx.save();

    //offset by camera position
    if (mainScene.camera) {
        ctx.translate(mainScene.camera.position.x, mainScene.camera.position.y);
    }

    mainScene.draw(ctx, 0, 0);

    // restore to original state
    ctx.restore();

    // draw anything above the game world
    mainScene.drawForeground(ctx);
}


const gameLoop = new GameLoop(update, draw);

gameLoop.start();