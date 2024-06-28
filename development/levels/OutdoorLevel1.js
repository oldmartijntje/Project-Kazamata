import { CaveLevel1 } from "./CaveLevel1.js";
import { Npc } from "../src/gameObjects/Npc/Npc.js";
import { TALKED_TO_A, TALKED_TO_B } from "../../system/src/models/StoryFlags.js";

import { resources } from "../Resource.js";
import { Sprite } from "../../system/src/models/Sprite.js";
import { Vector2 } from "../../system/src/models/Vector2.js";
import { Level } from "../../system/src/gameObjects/Level/Level.js";
import { gridCells } from "../../system/src/helpers/grid.js";
import { Exit } from "../src/gameObjects/Exit/Exit.js";
import { Hero } from "../src/gameObjects/Hero/Hero.js";
import { Rod } from "../src/gameObjects/Rod/Rod.js";
import { config } from "../config.js";
import { events } from "../../system/src/models/Events.js";

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

        const npc = new Npc(gridCells(6), gridCells(3), {
            "content": [
                {
                    "string": "Hallo mijn naam is Gamemeneer en in Minecraft bouw ik boten.",
                    "addsFlags": [TALKED_TO_A],
                    "bypass": [TALKED_TO_A],
                },
                {
                    "string": "Ik ben bruin, als ik door de modder rol.",
                    "requires": [TALKED_TO_A],
                    "addsFlags": [TALKED_TO_B],
                    "bypass": [TALKED_TO_B],
                },
                {
                    "string": "Slippers aan, voel me net een blinde mol.",
                    "requires": [TALKED_TO_B],
                    "removesFlags": [TALKED_TO_B]
                }
            ],
            "portraitFrame": 1
        });
        const npc2 = new Npc(gridCells(7), gridCells(2), {
            "content": [
                {
                    "string": "You see a man who is waiting for the grass to grow.",
                    "portraitFrame": null,
                    "bypass": [TALKED_TO_A],
                },
                {
                    "string": "Jij bent mijn Henk!",
                    "requires": [TALKED_TO_A],
                    "bypass": [TALKED_TO_B],
                    "portraitFrame": 0
                },
                {
                    "string": "...",
                    "requires": [TALKED_TO_B],
                    "portraitFrame": 1
                }
            ]
        });
        this.addChild(npc);
        this.addChild(npc2);

        this.heroStartPosition = params.heroPosition ?? DEFAULT_HERO_POSITION;
        const hero = new Hero(this.heroStartPosition.x, this.heroStartPosition.y, true);
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
