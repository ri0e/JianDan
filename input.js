// === INPUT HANDLERS === //
import { jumpPlayer } from "./player.js";
import { shootBullet } from "./bullet.js";

export const keys = { left: false, right: false };

export function keyboardControls(player) {
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      keys.left = true;
      player.facing = "left";
    }
    if (e.key === "ArrowRight" || e.key === "d") {
      keys.right = true;
      player.facing = "right";
    }
    if (e.key === "ArrowUp" || e.key === "w") jumpPlayer();
    if (e.key === " " || e.key === "s") shootBullet(player);
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
  });
}

// Input Handlers for Buttons
export function buttonsListeners(btn, onPress, onRelease) {
  ["touchstart", "mousedown"].forEach((evt) => {
    btn.addEventListener(evt, onPress);
  });
  ["touchend", "mouseup"].forEach((evt) => {
    btn.addEventListener(evt, onRelease);
  });
}
