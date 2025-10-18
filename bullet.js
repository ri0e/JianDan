// === BULLET SYSTEM === //
export let bullets = [];
export const bulletsProps = { width: 10, height: 10, speed: 10 };

// === Shoot Function === //
export function shootBullet(player) {
  const dir = player.facing === "right" ? 1 : -1;
  bullets.push({
    x: player.x + player.width / 2 - bulletsProps.width / 2,
    y: player.y + player.height / 2 - bulletsProps.height / 2,
    width: bulletsProps.width,
    height: bulletsProps.height,
    speed: bulletsProps.speed * dir,
  });
}

// === Update Bullets === //
export function updateBullets(WIDTH) {
  bullets = bullets.filter((b) => {
    b.x += b.speed;
    return b.x + b.width > 0 && b.x < WIDTH;
  });
}
