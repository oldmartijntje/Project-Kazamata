import { events } from "../../Events.js";
import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { getCharacterFrame, getCharacterWidth } from "./SpriteFontMap.js";

// Settings for the font
const FONT_CHARACTER_OFFSET = 5; // every letter has 5 pixels of offset to the left in the sprite sheet
const FONT_CHARACTER_SPACE_BETWEEN = 1;
const FONT_WORD_SPACE_BETWEEN = 3;

// Settings for the text animation calculation
const TEXTSPEED = 20; // the speed of the ticks, lower is faster
const CURRENT_SHOWING_INCREMENT = 1; // amount fo showing indexes needed per character
const SHOWING_INDEX_INCREMENT = 1; // the increase in the showing index per tick

export class SpriteTextString extends GameObject {
    constructor(str) {
        super({
            position: new Vector2(32, 108)
        });
        const content = str ?? "";
        this.drawLayer = "HUD"
        this.words = content.split(' ').map(word => {

            // Calculate the width of the word
            let wordWidth = 0;
            const chars = word.split('').map(char => {
                const charWidth = getCharacterWidth(char);
                wordWidth += charWidth;
                return {
                    width: charWidth,
                    sprite: new Sprite({
                        resource: resources.images.fontWhite,
                        hFrames: 13,
                        vFrames: 6,
                        frame: getCharacterFrame(char),
                    }),
                }
            });
            return {
                wordWidth,
                chars
            }
        });

        // Text box backdrop
        this.backdrop = new Sprite({
            resource: resources.images.textBox,
            frameSize: new Vector2(256, 64),
        })

        // Text animation
        this.showingIndex = 0;
        this.finalIndex = this.words.reduce((acc, word) => {
            return acc + word.chars.length;
        }, 0);
        this.textSpeed = TEXTSPEED;
        this.timeUntilNextShow = this.textSpeed;
    }

    step(_deltaTime, root) {

        /** @type {Input} */
        const input = root.input;
        if (input?.getActionJustPressed('Space')) {
            if (this.showingIndex < this.finalIndex) {
                this.showingIndex = this.finalIndex;
                return;
            }
            events.emit('END_TEXT_BOX');

        }

        this.timeUntilNextShow -= _deltaTime;
        if (this.timeUntilNextShow <= 0) {
            this.showingIndex += SHOWING_INDEX_INCREMENT;
            this.timeUntilNextShow += this.textSpeed;
        }
    }

    drawImage(ctx, drawPosX, drawPosY) {
        this.backdrop.drawImage(ctx, drawPosX, drawPosY);

        const PADDING_LEFT = 7;
        const PADDING_TOP = 7;
        const LINE_WIDTH_MAX = 240;
        const LINE_VERTICAL_HEIGHT = 14;

        let cursorX = drawPosX + PADDING_LEFT;
        let cursorY = drawPosY + PADDING_TOP;
        let currentShowingIndex = 0;

        this.words.forEach(word => {

            // check if the word fits on the line
            const spaceRemaining = drawPosX + LINE_WIDTH_MAX - cursorX;
            if (spaceRemaining < word.wordWidth) {
                cursorX = drawPosX + PADDING_LEFT;
                cursorY += LINE_VERTICAL_HEIGHT;
            }

            // draw the word
            word.chars.forEach(char => {

                if (currentShowingIndex > this.showingIndex) {
                    return;
                }
                const { sprite, width } = char;

                const widthCharOffset = cursorX - FONT_CHARACTER_OFFSET;
                sprite.draw(ctx, widthCharOffset, cursorY);

                cursorX += width + FONT_CHARACTER_SPACE_BETWEEN;

                currentShowingIndex += CURRENT_SHOWING_INCREMENT;
            });

            cursorX += FONT_WORD_SPACE_BETWEEN;

        });


    }
}