import { config } from '../../config.js';
import { Vector2 } from '../Vector2.js';

export const gridCells = number => {
    return number * config["gridSize"];
}

export const isSpaceFree = (walls, x, y) => {
    // round the x and y to the nearest whole number
    x = Math.round(x);
    y = Math.round(y);

    // convert to string to use as key
    const str = `${x},${y}`;
    // check if the key is present in the walls set
    const isWallPresent = walls.has(str);
    return !isWallPresent;
}

export const calculateNearestGridPosition = (x, y) => {
    const gridSize = config["gridSize"];
    const gridX = Math.round(x / gridSize) * gridSize;
    const gridY = Math.round(y / gridSize) * gridSize;
    return new Vector2(gridX, gridY);
}