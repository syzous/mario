import { loadLevel } from "./loader.js";
import Timer from "./Timer.js";
import KeyboardState from "./KeyboardState.js";
import Camera from "./Camera.js";
import { createMario } from "./entities.js";
import { createCollisionLayer } from "./layers.js";
import { setupKeyboard } from "./setupKeyboard.js";
import { setupMouseControl } from "./debug.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {
  const camera = new Camera();
  window.camera = camera;
  mario.pos.set(64, 64);

  level.comp.layers.push(createCollisionLayer(level));

  level.entities.add(mario);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  ["mousedown", "mousemove"].forEach((eventName) => {
    canvas.addEventListener(eventName, (event) => {
      if (event.buttons === 1) {
        mario.vel.set(0, 0);
        mario.pos.set(
          event.offsetX + camera.pos.x,
          event.offsetY + camera.pos.y
        );
      }
    });
  });
  const timer = new Timer(1 / 60);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context, camera);
  };
  timer.start();
});
