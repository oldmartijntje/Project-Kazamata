class Resources {
    constructor() {
        this.toLoad = {
            sky: "./public/sprites/sky.png",
            ground: "./public/sprites/ground.png",
            hero: "./public/sprites/hero-sheet.png",
            shadow: "./public/sprites/shadow.png",

        }

        this.images = {};

        // Load all images
        Object.keys(this.toLoad).forEach((key) => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                img: img,
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