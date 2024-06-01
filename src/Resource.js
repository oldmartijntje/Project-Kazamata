class Resources {
    constructor() {
        this.toLoad = {
            sky: "sprites/sky.png",
            ground: "sprites/ground.png",
            hero: "sprites/hero-sheet.png",
            shadow: "sprites/shadow.png",

        }

        this.images = {};

        // Define the base URL for assets
        const baseUrl = process.env.NODE_ENV === 'production' ? '/your-app-name/' : '';

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