// === MAIN GAME FILE === //
import { player, initPlayer } from "./player.js";
import { map, tileSize, getMapOffsetY } from "./map.js";
import { resolveHorizontalCollision, resolveVerticalCollision } from "./collision.js";
import { updateCamera, camera } from "./camera.js";
import { bullets, updateBullets } from "./bullet.js";
import { keyboardControls, keys } from "./input.js";

console.log("hi get out of the console :3");

// === Initialize When Page Loads === //
document.addEventListener("DOMContentLoaded", () => {
  // === BASIC SETUP === //
  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  const WIDTH = (c.width = window.innerWidth - 30);
  const HEIGHT = (c.height = window.innerHeight - 30);
  const mapOffsetY = getMapOffsetY(HEIGHT);

  c.oncontextmenu = (e) => e.preventDefault();

  initPlayer(WIDTH, HEIGHT);
  keyboardControls(player);

  // === GAME LOOP === //
  function update() {
    // === Player Horizontal Movement === //
    let moveX = 0;
    if (keys.left) moveX -= player.speed;
    if (keys.right) moveX += player.speed;
    player.x += moveX;
    resolveHorizontalCollision(player, mapOffsetY);

    // === Player Vertical Movement === //
    player.velocityY += player.gravity;
    player.y += player.velocityY;
    resolveVerticalCollision(player, mapOffsetY);

    // === Keep Player in Map Bounds === //
    player.x = Math.max(
      0,
      Math.min(map[0].length * tileSize - player.width, player.x)
    );

    // === Update Bullets === //
    updateBullets(WIDTH);

    // === Update Camera === //
    updateCamera(player, WIDTH, HEIGHT, map, tileSize);
  }

  // === DRAW FUNCTION === //
  function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const camX = Math.round(camera.x);
    const camY = Math.round(camera.y);

    // Draw Map
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        if (map[row][col] === 1) {
          ctx.fillStyle = "#4DB6AC";
          ctx.fillRect(
            col * tileSize - camX,
            row * tileSize + mapOffsetY - camY,
            tileSize,
            tileSize
          );
        }
      }
    }

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - camX, player.y - camY, player.width, player.height);

    // Draw Bullets
    ctx.fillStyle = "#D46FFF";
    bullets.forEach((b) =>
      ctx.fillRect(b.x - camX, b.y - camY, b.width, b.height)
    );
  }

  // === GAME LOOP === //
  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
