import { GameObject } from "../../GameObject.js";
import { Vector2 } from "../../Vector2.js";
import { Sprite } from "../../Sprite.js";
import { resources } from '../../Resource.js';
import { storyFlags } from "../../StoryFlags.js";

export class Npc extends GameObject {
    constructor(x, y, textConfig = {}) {
        super({
            position: new Vector2(x, y)
        });

        this.isSolid = true;

        this.textContent = textConfig.content ?? "Default Text";
        this.textPortraitFrame = textConfig.portraitFrame ?? null;

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -19),
        })
        this.addChild(shadow);

        const body = new Sprite({
            resource: resources.images.knight,
            frameSize: new Vector2(32, 32),
            hFrames: 2,
            vFrames: 1,
            position: new Vector2(-8, -20)
        })
        this.addChild(body);
    }

    getContent() {
        const match = storyFlags.getRelevantScenario(this.textContent);
        if (!match) {
            console.warn("No match found for this scenario", this.textContent);
            return null; // No match, might want to return a default text
        }
        portraitFrame = this.textPortraitFrame;
        if (match.portraitFrame != undefined) {
            // If the scenario has an override for the portrait frame, use that.
            var portraitFrame = match.portraitFrame;
        }
        return {
            string: match.string,
            portraitFrame: portraitFrame,
            addsFlags: match.addsFlags ?? null,
            removesFlags: match.removesFlags ?? null,
        }
    }
}