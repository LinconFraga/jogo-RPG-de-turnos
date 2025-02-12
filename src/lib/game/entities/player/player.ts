import k from "$lib/game/kaplay";
import type { GameObj, KAPLAYCtx } from "kaplay";

export default function createPlayer() {
    const player = k.add([
        k.sprite('player', { anim: 'idle' }), // Usa o sprite com a animação 'idle'
        k.pos(120, 0), // Define a posição inicial
        k.anchor('center'), // Define o ponto de ancoragem
        k.area( { shape: new k.Rect(k.vec2(0, 0), 24, 38) }), // Adiciona uma área de colisão
        k.body(), // Adiciona um corpo físico
        k.health(10), // Adiciona vida ao personagem
        {
            speed: 400, // Propriedade personalizada
            isMoving: false,
            isReturning: false
        },
        k.scale(4.5),
        'player', // Tag para identificar o personagem
    ]);

    return player;
}

export function movePlayerToEnemy(player: GameObj, enemy: GameObj) {
    const originalPos = player.pos.clone(); // Guarda a posição original como um Vec2


    if( player.isMoving || player.isReturning) return

    player.isMoving = true
    // Movimentação do player
        if (player.isMoving && !player.isReturning) {
            // Move o player em direção ao enemy
            const direction = enemy.pos.sub(player.pos).unit(); // direction é um Vec2
            player.pos = player.pos.add(direction.scale(player.speed * k.dt())); 
            

            if (player.curAnim() !== 'run'){
                console.log(player.speed)
                player.use(k.sprite('player-run', { anim: 'run'}));
            }
        } else {
            
            if (player.curAnim() !== 'idle') {
                player.use(k.sprite('player', { anim: 'idle'}));
            }
        }
            // pos é um Vec2

    // Detecta colisão entre o player e o enemy
    player.onCollide('enemy-0', async () => {
        player.isMoving = false; // Para de se mover
        player.isReturning = true; // Começa a retornar à posição original
        k.debug.log("Player colidiu com o enemy!");

        // Espera 2 segundos
        await k.wait(2);

        // Move o player de volta à posição original
        while (player.pos.dist(originalPos) > 5) { // Enquanto não estiver próximo da posição original
            const direction = originalPos.sub(player.pos).unit(); // direction é um Vec2
            player.pos = player.pos.add(direction.scale(player.speed * k.dt())); // pos é um Vec2
            await k.wait(0); // Espera até o próximo frame
        }

        // Garante que o player chegue exatamente à posição original
        player.pos = originalPos.clone(); // Define a posição exata

        player.isReturning = false; // Finaliza o retorno
        k.debug.log("Player retornou à posição original e está aguardando comando.");
    });

    // Novo comando para mover o player novamente (exemplo: ao pressionar a tecla "Espaço")
    k.onKeyPress('enter', () => {
        if (!player.isMoving && !player.isReturning) { // Só permite um novo comando se o player estiver parado
            player.isMoving = true; // Permite que o player se mova novamente
            k.debug.log("Novo comando recebido! Player está se movendo em direção ao enemy.");
        }
    });
}