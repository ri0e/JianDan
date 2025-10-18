// === PLAYER SETUP === //
export const player = {
  x: 0,
  y: 0,
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

// === Initialize Player Position === //
export function initPlayer(WIDTH, HEIGHT) {
  player.x = WIDTH / 4;
  player.y = HEIGHT - 500;
}

// === Player Actions === //
export function jumpPlayer() {
  if (player.jumpCount < player.maxJumps) {
    player.velocityY = -player.jumpPower;
    player.grounded = false;
    player.jumpCount++;
  }
}
