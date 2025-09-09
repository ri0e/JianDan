console.log("hi get out of the console :3");

document.addEventListener("DOMContentLoaded", () => {
  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  const WIDTH = (c.width = window.innerWidth - 30);
  const HEIGHT = (c.height = window.innerHeight - 30);

  // DOM elements
  const leftBtn = document.getElementById("left");
  const rightBtn = document.getElementById("right");
  const upBtn = document.getElementById("up");
  const shootBtn = document.getElementById("shoot");

  // Player
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
  };

  // Track which key is pressed
  const keys = {
    left: false,
    right: false,
    up: false,
    d: false,
    a: false,
    w: false,
  };

  // Listen to key events
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      (keys.left = true), (keys.a = true);
    }

    if (e.key === "ArrowRight" || e.key === "d")
      (keys.right = true), (keys.d = true);
    if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") {
      jumpPlayer();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a")
      (keys.left = false), (keys.a = false);
    if (e.key === "ArrowRight" || e.key === "d")
      (keys.right = false), (keys.d = false);
  });

  // Buttons event listener
  ["touchstart", "mousedown"].forEach((evt) => {
    leftBtn.addEventListener(evt, () => {
      leftBtn.classList.add("active");
      keys.left = true;
      keys.a = true;
      update();
    });
  });

  ["touchstart", "mousedown"].forEach((evt) => {
    rightBtn.addEventListener(evt, () => {
      rightBtn.classList.add("active");
      keys.right = true;
      keys.d = true;
      update();
    });
  });

  ["touchend", "mouseup"].forEach((evt) => {
    rightBtn.addEventListener(evt, () => {
      rightBtn.classList.remove("active");
      keys.right = false;
      keys.d = false;
      update();
    });
  });

  ["touchend", "mouseup"].forEach((evt) => {
    leftBtn.addEventListener(evt, () => {
      leftBtn.classList.remove("active");
      keys.left = false;
      keys.a = false;
      update();
    });
  });

  ["touchstart", "mousedown"].forEach((evt) => {
    upBtn.addEventListener(evt, () => {
      upBtn.classList.add("active");
      jumpPlayer();
      update();
    });
  });

  ["touchend", "mouseup"].forEach((evt) => {
    upBtn.addEventListener(evt, () => {
      upBtn.classList.remove("active");
    });
  });

  // Jump function
  function jumpPlayer() {
    if (player.jumpCount < player.maxJumps) {
      player.velocityY = -player.jumpPower;
      player.grounded = false;
      player.jumpCount++;
    }
  }

  function update() {
    // Walk
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;

    // Apply gravity
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Ground collision
    if (player.y + player.height >= HEIGHT - 50) {
      player.y = HEIGHT - 50 - player.height;
      player.velocityY = 0;
      player.grounded = true;
      player.jumpCount = 0;
    }

    // Keep player within screen bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > WIDTH) player.x = WIDTH - player.width;
  }

  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw Ground
    ctx.fillStyle = "#4DB6AC";
    ctx.fillRect(0, HEIGHT - 50, WIDTH, 50);
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
