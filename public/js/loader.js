export function loadImage(url) {
  return new Promise((rel, rej) => {
    const image = new Image();
    image.addEventListener("load", () => {
      rel(image);
    });
    image.src = url;
  });
}
export function loadLevel(name) {
  return fetch(`/levels/${name}.json`).then((r) => r.json());
}
