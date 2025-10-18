// === COLLISION SYSTEM === //
import { map, tileSize } from "./map.js";

// === Get Tiles That Collide With Player === //
export function getCollidingTiles(x, y, width, height, mapOffsetY) {
  const tiles = [];
  const startCol = Math.floor(x / tileSize);
  const endCol = Math.floor((x + width) / tileSize);
  const startRow = Math.floor((y - mapOffsetY) / tileSize);
  const endRow = Math.floor((y + height - mapOffsetY) / tileSize);

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (map[row] && map[row][col] === 1) {
        tiles.push({
          x: col * tileSize,
          y: row * tileSize + mapOffsetY,
          width: tileSize,
          height: tileSize,
        });
      }
    }
  }
  return tiles;
}

// === Resolve Horizontal Collision === //
export function resolveHorizontalCollision(player, mapOffsetY) {
  const tiles = getCollidingTiles(
    player.x,
    player.y,
    player.width,
    player.height,
    mapOffsetY
  );

  for (const tile of tiles) {
    if (
      player.x < tile.x + tile.width &&
      player.x + player.width > tile.x &&
      player.y < tile.y + tile.height &&
      player.y + player.height > tile.y
    ) {
      if (player.x + player.width / 2 < tile.x + tile.width / 2) {
        player.x = tile.x - player.width;
      } else {
        player.x = tile.x + tile.width;
      }
    }
  }
}

// === Resolve Vertical Collision === //
export function resolveVerticalCollision(player, mapOffsetY) {
  const tiles = getCollidingTiles(
    player.x,
    player.y,
    player.width,
    player.height,
    mapOffsetY
  );
  player.grounded = false;

  for (const tile of tiles) {
    if (
      player.x < tile.x + tile.width &&
      player.x + player.width > tile.x &&
      player.y < tile.y + tile.height &&
      player.y + player.height > tile.y
    ) {
      if (player.y + player.height / 2 < tile.y + tile.height / 2) {
        player.y = tile.y - player.height;
        player.velocityY = 0;
        player.grounded = true;
        player.jumpCount = 0;
      } else {
        player.y = tile.y + tile.height;
        player.velocityY = 0;
      }
    }
  }
}
