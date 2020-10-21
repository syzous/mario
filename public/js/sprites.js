import { loadImage } from "./loader.js";
import SpriteSheet from "./SpriteSheet.js";

export function loadBackgroundSprites() {
  return loadImage("/images/tiles.png").then((image) => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.defineTile("ground", 0, 0);
    sprites.defineTile("sky", 3, 23);
    console.log("loadBackgroundSprites", sprites);
    return sprites;
  });
}
export function loadMarioSprite() {
  return loadImage("/images/characters.png").then((image) => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define("idle", 276, 44, 16, 16);
    console.log("loadMarioSprite", sprites);
    return sprites;
  });
}
