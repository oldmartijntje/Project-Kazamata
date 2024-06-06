import { config } from "../config.js";

class Resources {
    constructor() {
        this.toLoad = {
            hero: "sprites/hero-sheet.png",
            shadow: "sprites/shadow.png",
            rod: "sprites/rod.png",
            exit: "sprites/exit.png",

            sky: "sprites/sky.png",
            ground: "sprites/ground.png",
            cave: "sprites/cave.png",
            caveGround: "sprites/cave-ground.png",

            knight: "sprites/knight-sheet-1.png",
            test: "sprites/text-box.png"
        }

        this.images = {};

        // Define the base URL for assets
        var baseUrl = '';
        try {
            baseUrl = process.env.NODE_ENV === 'production' ? "/" + config['baseUrl'] + "/" + config['publicPath'] + "/" : '';
        } catch (e) {
            baseUrl = "/" + config['baseUrl'] + "/" + config['publicPath'] + "/";
        }

        // Load all images
        Object.keys(this.toLoad).forEach((key) => {
            const img = new Image();
            img.src = baseUrl + this.toLoad[key];

            this.images[key] = {
                image: img,
                isLoaded: false
            };
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        });
    }


}

// Create one instance of the class and export it
export const resources = new Resources();