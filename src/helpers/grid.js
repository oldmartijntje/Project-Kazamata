import { config } from '../../config.js';

export const gridCells = number => {
    return number * config["gridSize"];
}