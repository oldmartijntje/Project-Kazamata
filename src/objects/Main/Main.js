import { Camera } from "../../Camera.js";
import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { Input } from "../../Input.js";
import { Inventory } from "../Inventory/Inventory.js";
import { SpriteTextString } from "../SpriteTextString/SpriteTextString.js";
import { TextBox } from "../TextBox/TextBox.js";

const TEXT_SPRITE_SHEET = 'TEXT_SPRITE_SHEET';
const TEXT_TTF_FONT = 'TEXT_TTF_FONT';
const TEXT_MODE = TEXT_SPRITE_SHEET;

export class Main extends GameObject {
    constructor() {
        super({});
        this.level = null;
        this.input = new Input();
        this.camera = new Camera();
        this.inventory = new Inventory();
        if (TEXT_MODE === TEXT_TTF_FONT) {
            this.textBox = new TextBox();
        } else {
            this.textBox = new SpriteTextString("Hallo mijn naam is Gamemeneer en in Minecraft bouw ik boten.");
        }
    }

    onInit() {
        this.inventory.onInit();

        events.on('CHANGE_LEVEL', this, newLevelInstance => {
            this.setLevel(newLevelInstance);
        });
    }

    setLevel(newLevelInstance) {
        if (this.level) {
            this.level.destroy();
        }
        this.level = newLevelInstance;
        this.addChild(this.level);
    }

    drawBackground(ctx) {
        this.level?.background.drawImage(ctx, 0, 0)
    }

    drawForeground(ctx) {
        this.inventory.draw(ctx, this.inventory.position.x, this.inventory.position.y);
        this.textBox.draw(ctx, 0, 0);
    }
}