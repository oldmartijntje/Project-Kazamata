import { resources } from "../Resource";
import { Sprite } from "../Sprite";
import { Vector2 } from "../Vector2";
import { Level } from "../objects/Level/Level";
import { gridCells } from "../helpers/grid";
import { Exit } from "../objects/Exit/Exit";
import { Hero } from "../objects/Hero/Hero";
import { Rod } from "../objects/Rod/Rod";

export class OutdoorLevel1 extends Level {
    constructor() {
        super({});
        this.background = new Sprite({
            resource: resources.images.sky,
            frameSize: new Vector2(320, 180),
        });

        const groundSprite = new Sprite({
            resource: resources.images.ground,
            frameSize: new Vector2(320, 180),
        });

        this.addChild(groundSprite);

        const exit = new Exit(gridCells(10), gridCells(6));
        this.addChild(exit);

        const hero = new Hero(gridCells(10), gridCells(4));
        this.addChild(hero);

        const rod = new Rod(gridCells(11), gridCells(3));
        this.addChild(rod);
        this.addChild(new Rod(gridCells(12), gridCells(3)));
        this.addChild(new Rod(gridCells(13), gridCells(3)));

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

}

// export const walls = new Set();

// walls.add(`64,48`);

// walls.add(`64,64`);
// walls.add(`64,80`);
// walls.add(`80,64`);
// walls.add(`80,80`);

// walls.add(`112,80`);
// walls.add(`128,80`);
// walls.add(`144,80`);
// walls.add(`160,80`);
