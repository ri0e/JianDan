// === CAMERA SYSTEM === //
export const camera = { x: 0, y: 0 };

export function updateCamera(player, WIDTH, HEIGHT, map, tileSize) {
  camera.x = player.x + player.width / 2 - WIDTH / 2;
  camera.y = player.y + player.height / 2 - HEIGHT / 2;

  // Prevent the camera from showing empty space
  camera.x = Math.max(0, Math.min(camera.x, map[0].length * tileSize - WIDTH));
  camera.y = Math.max(0, Math.min(camera.y, map.length * tileSize - HEIGHT));
}
