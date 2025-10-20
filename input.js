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

export function buttonsControls(upBtn, rightBtn, leftBtn, shootBtn) {
  buttonsListeners(
    leftBtn,
    () => {
      leftBtn.classList.add("active");
      keys.left = true;
      player.facing = "left";
    },
    () => {
      leftBtn.classList.remove("active");
      keys.left = false;
    }
  );

  buttonsListeners(
    rightBtn,
    () => {
      rightBtn.classList.add("active");
      keys.right = true;
      player.facing = "right";
    },
    () => {
      rightBtn.classList.remove("active");
      keys.right = false;
    }
  );

  buttonsListeners(
    upBtn,
    () => {
      upBtn.classList.add("active");
      jumpPlayer();
      upBtn.disabled = true;
      setTimeout(() => {
        upBtn.disabled = false;
      }, 100);
    },
    () => {
      upBtn.classList.remove("active");
    }
  );

  buttonsListeners(
    shootBtn,
    () => {
      shootBtn.classList.add("active");
      shootBullet();
      shootBtn.disabled = true;
      setTimeout(() => {
        shootBtn.disabled = false;
      }, 100);
    },
    () => {
      shootBtn.classList.remove("active");
    }
  );
}