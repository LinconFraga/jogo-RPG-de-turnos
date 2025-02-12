import k from "$lib/game/kaplay";

export async function loadEnemySprites(phase: number) {
    // TODO 

    await k.loadSprite('enemy-0', '/sprites/enemy-0/Idle.png', {
        sliceX: 6,
        anims: {
            'idle': {
                from: 0,
                to: 5,
                speed: 8,
                loop: true,
            }
        }
    });

    await k.loadSprite('enemy-0', '/sprites/enemy-0/Idle.png', {
        sliceX: 6,
        anims: {
            'idle': {
                from: 0,
                to: 5,
                speed: 8,
                loop: true,
            }
        }
    });
}