import { config } from '../../config.js';

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