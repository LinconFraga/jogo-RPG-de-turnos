import k from "../kaplay";
import { loadPlayerSprites } from "$lib/game/sprites/player/playerSprites"; // Importa a função de carregamento
import createPlayer, { movePlayerToEnemy } from "$lib/game/entities/player/player";
import createEnemy from "../entities/enemy/enemy";
import { loadEnemySprites } from "../sprites/enemy/enemySprites";
import loadGround from "./ground";


// Configuração da fase 1
k.scene("phase0", async () => {

    
    await loadPlayerSprites();
    await loadEnemySprites(0);

  const player = createPlayer();
  const enemy = createEnemy(0);


loadGround()


k.onClick(() => movePlayerToEnemy(player, enemy));
  // Condição para passar para a próxima fase
});
