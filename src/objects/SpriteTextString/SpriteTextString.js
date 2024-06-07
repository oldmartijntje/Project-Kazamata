import { GameObject } from "../../GameObject.js";
import { resources } from "../../Resource.js";
import { Sprite } from "../../Sprite.js";
import { Vector2 } from "../../Vector2.js";
import { getCharacterFrame, getCharacterWidth } from "./SpriteFontMap.js";

const FONT_CHARACTER_OFFSET = 5;
const FONT_CHARACTER_SPACE_BETWEEN = 1;
const FONT_WORD_SPACE_BETWEEN = 3;

export class SpriteTextString extends GameObject {
    constructor(str) {
        super({
            position: new Vector2(32, 108)
        });
        const content = str ?? "";
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

        this.backdrop = new Sprite({
            resource: resources.images.textBox,
            frameSize: new Vector2(256, 64),
        })
    }

    drawImage(ctx, drawPosX, drawPosY) {
        this.backdrop.drawImage(ctx, drawPosX, drawPosY);

        const PADDING_LEFT = 7;
        const PADDING_TOP = 7;
        const LINE_WIDTH_MAX = 240;
        const LINE_VERTICAL_HEIGHT = 14;

        let cursorX = drawPosX + PADDING_LEFT;
        let cursorY = drawPosY + PADDING_TOP;

        this.words.forEach(word => {

            // check if the word fits on the line
            const spaceRemaining = drawPosX + LINE_WIDTH_MAX - cursorX;
            if (spaceRemaining < word.wordWidth) {
                cursorX = drawPosX + PADDING_LEFT;
                cursorY += LINE_VERTICAL_HEIGHT;
            }

            // draw the word
            word.chars.forEach(char => {
                console.log(char);
                const { sprite, width } = char;

                const widthCharOffset = cursorX - FONT_CHARACTER_OFFSET;
                sprite.draw(ctx, widthCharOffset, cursorY);

                cursorX += width + FONT_CHARACTER_SPACE_BETWEEN;
            });

            cursorX += FONT_WORD_SPACE_BETWEEN;

        });


    }
}