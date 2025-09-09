console.log("hi get out of the console :3");

// Make sure the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // === Basic Setup === //
  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  const WIDTH = (c.width = window.innerWidth - 30);
  const HEIGHT = (c.height = window.innerHeight - 30);

  // === DOM Elements (Buttons) === //
  const leftBtn = document.getElementById("left");
  const rightBtn = document.getElementById("right");
  const upBtn = document.getElementById("up");
  const shootBtn = document.getElementById("shoot");

  // === Player === //
  const player = {
    x: WIDTH / 4,
    y: HEIGHT - 100,
    width: 20,
    height: 50,
    color: "#FED766",
    speed: 5,
    velocityY: 0,
    jumpPower: 15,
    gravity: 1,
    grounded: true,
    jumpCount: 0,
    maxJumps: 2,
    facing: "right",
  };

  // === Bullets === //
  let bullets = [];
  const bulletsProps = { width: 10, height: 10, speed: 10 };

  // === Input State === //
  const keys = { left: false, right: false };

  // === Camera === //
  const camera = {
    x: 0,
    y: 0,
  };
  // === Tiles === //
  const tileSize = 50;

  // === Tile Maps === //
  const map = [
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    [
      1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ],
  ];
  const mapOffsetY = HEIGHT - map.length * tileSize;

  // ===== UTILITY FUNCTIONS ===== //

  // === Jump Function === //
  function jumpPlayer() {
    if (player.jumpCount < player.maxJumps) {
      player.velocityY = -player.jumpPower;
      player.grounded = false;
      player.jumpCount++;
    }
  }

  // === Shoot Function === //
  function shootBullet() {
    const dir = player.facing === "right" ? 1 : -1;
    bullets.push({
      x: player.x + player.width / 2 - bulletsProps.width / 2,
      y: player.y + player.height / 2 - bulletsProps.height / 2,
      width: bulletsProps.width,
      height: bulletsProps.height,
      speed: bulletsProps.speed * dir,
    });
  }

  // ===== INPUT HANDLERS ===== //

  // Input Handlers for Keyboard
  function keyboardControls() {
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
      if (e.key === " " || e.key === "s") shootBullet();
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
    });
  }

  // Input Handlers for Buttons
  function buttonsListeners(btn, onPress, onRelease) {
    ["touchstart", "mousedown"].forEach((evt) => {
      btn.addEventListener(evt, onPress);
    });
    ["touchend", "mouseup"].forEach((evt) => {
      btn.addEventListener(evt, onRelease);
    });
  }

  function buttonsControls() {
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

  // === Camera Function === //
  function updateCamera() {
    camera.x = player.x + player.width / 2 - WIDTH / 2;
    camera.y = player.y + player.height / 2 - HEIGHT / 2;

    // Prevent the Camera from Showing Empty Space
    camera.x = Math.max(
      0,
      Math.min(camera.x, map[0].length * tileSize - WIDTH)
    );
    camera.y = Math.max(0, Math.min(camera.y, map.length * tileSize - HEIGHT));
  }

  // === Game Update === //
  function update() {
    // Walk
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;

    // Apply Gravity
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Tile Collision
    const playerBottom = player.y + player.height;
    const previousBottom = player.y + player.height - player.velocityY;

    player.grounded = false;

    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        if (map[row][col] === 1) {
          const tileX = tileSize * col;
          const tileY = tileSize * row + mapOffsetY;

          if (
            player.x < tileX + tileSize &&
            player.x + player.width > tileX &&
            playerBottom > tileY &&
            player.y < tileY + tileSize
          ) {
            if (player.velocityY >= 0 && previousBottom <= tileY) {
              player.y = tileY - player.height;
              player.velocityY = 0;
              player.grounded = true;
              player.jumpCount = 0;
            }
          }
        }
      }
    }

    // Keep Player Within Screen Bounds
    player.x = Math.max(
      0,
      Math.min(map[0].length * tileSize - player.width, player.x)
    );

    // Bullets Animation
    bullets = bullets.filter((b) => {
      b.x += b.speed;
      return b.x + b.width > 0 && b.x < WIDTH;
    });

    updateCamera();
  }

  // === Game Draw === //
  function draw() {
    // Clear Canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Round Camera Offsets
    const camX = Math.round(camera.x);
    const camY = Math.round(camera.y);

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - camX, player.y - camY, player.width, player.height);

    // Draw Tile Map
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

    // Draw Bullets
    ctx.fillStyle = "#D46FFF";
    bullets.forEach((b) =>
      ctx.fillRect(b.x - camX, b.y - camY, b.width, b.height)
    );
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  // === Start Game === //
  keyboardControls();
  buttonsControls();
  gameLoop();
});
