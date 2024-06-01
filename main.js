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

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

// In the future, move this into a level object.
const mainScene = new GameObject({
    position: new Vector2(0, 0),
});

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180),
});
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(10), gridCells(4));
mainScene.addChild(hero);

const camera = new Camera();
mainScene.addChild(camera);

const rod = new Rod(gridCells(11), gridCells(3));
mainScene.addChild(rod);
mainScene.addChild(new Rod(gridCells(12), gridCells(3)));
mainScene.addChild(new Rod(gridCells(13), gridCells(3)));

const inventory = new Inventory();

// needs to happen if you want to controll the player
mainScene.input = new Input();


const update = (deltaTime) => {
    mainScene.stepEntry(deltaTime, mainScene);
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw sky, when attached to mainScene it will move with the camera
    skySprite.draw(ctx, 0, 0);


    // save current state (for camera offset)
    ctx.save();

    //offset by camera position
    ctx.translate(camera.position.x, camera.position.y);

    mainScene.draw(ctx, 0, 0);

    // restore to original state
    ctx.restore();

    // Draw Anything above the camera
    inventory.draw(ctx, 0, 0);
}


const gameLoop = new GameLoop(update, draw);

gameLoop.start();