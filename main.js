import { resources } from './src/Resource.js';

const canvas = document.querySelector('#game-canvas');
const ctx = canvas.getContext('2d');

const draw = () => {
    const sky = resources.images.sky;
    if (sky.isLoaded) {
        ctx.drawImage(sky.img, 0, 0);
    }
}

setInterval(() => {
    console.log('Drawing')
    draw();

}, 300)