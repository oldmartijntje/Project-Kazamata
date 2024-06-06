import { resources } from "../Resource.js";
import { Sprite } from "../Sprite.js";
import { Vector2 } from "../Vector2.js";
import { Level } from "../objects/Level/Level.js";
import { gridCells } from "../helpers/grid.js";
import { Exit } from "../objects/Exit/Exit.js";
import { Hero } from "../objects/Hero/Hero.js";
import { Rod } from "../objects/Rod/Rod.js";
import { config } from "../../config.js";
import { CaveLevel1 } from "./CaveLevel1.js";
import { events } from "../Events.js";

const DEFAULT_HERO_POSITION = new Vector2(gridCells(10), gridCells(4));

export class OutdoorLevel1 extends Level {
    constructor(params = {}) {
        super({});
        this.background = new Sprite({
            resource: resources.images.sky,
            frameSize: new Vector2(config.sizes.canvasWidth, config.sizes.canvasHeight),
        });

        const groundSprite = new Sprite({
            resource: resources.images.ground,
            frameSize: new Vector2(config.sizes.canvasWidth, config.sizes.canvasHeight),
        });

        this.addChild(groundSprite);

        const exit = new Exit(gridCells(10), gridCells(6));
        this.addChild(exit);

        const rod = new Rod(gridCells(11), gridCells(3));
        this.addChild(rod);
        this.addChild(new Rod(gridCells(12), gridCells(3)));
        this.addChild(new Rod(gridCells(13), gridCells(3)));

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y);
        this.addChild(hero);


        // this.walls = new Set(); // this is already defined in the Level class
        this.walls.add(`64,48`); // tree
        this.walls.add(`64,64`); // squares
        this.walls.add(`64,80`);
        this.walls.add(`80,64`);
        this.walls.add(`80,80`);
        this.walls.add(`112,80`); // water
        this.walls.add(`128,80`);
        this.walls.add(`144,80`);
        this.walls.add(`160,80`);
    }

    onInit() {
        events.on('HERO_EXITS', this, () => {
            events.emit('CHANGE_LEVEL', new CaveLevel1({
                heroPosition: new Vector2(gridCells(4), gridCells(5)),
            }));
        });
    }
}
