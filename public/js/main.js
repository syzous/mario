import { loadLevel } from "./loader.js";

import Compositor from "./Compositor.js";
import Entity from "./Entity.js";
import Timer from "./Timer.js";
import KeyboardState from "./KeyboardState.js";

import { createMario } from "./entities.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createMario(), loadLevel("1-1")]).then(([mario, level]) => {
  const gravity = 2000;
  mario.pos.set(64, 64);

  level.entities.add(mario);

  const SPACE = 32;
  const input = new KeyboardState();
  input.addMapping(SPACE, (keyState) => {
    if (keyState) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });
  input.listenTo(window);

  const timer = new Timer(1 / 60);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    mario.update(deltaTime);
    mario.vel.y += gravity * deltaTime;
  };
  timer.start();
});
