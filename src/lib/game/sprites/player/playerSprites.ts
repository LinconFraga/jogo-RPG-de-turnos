import k from "$lib/game/kaplay";

export async function loadPlayerSprites() {

    await k.loadSprite('player', '/sprites/player/Idle.png', {
        sliceX: 10,
        anims: {
            'idle': {
                from: 0,
                to: 9,
                speed: 8,
                loop: true,
            }
        }
    });

    await k.loadSprite('player-run', '/sprites/player/Run.png', {
        sliceX: 8,
        anims: {
            'run': {
                from: 0,
                to: 7,
                speed: 15,
                loop: true,
            }
        }
    });

    await k.loadSprite('player-attack', '/sprites/player/Attack1.png', {
        sliceX: 7,
        anims: {
            'attack': {
                from: 0,
                to: 6,
                speed: 15,
                loop: true // deve ser padrao false
            }
        }
    });

    await k.loadSprite('player-attack2', '/sprites/player/Attack2.png', {
        sliceX: 7,
        anims: {
            'attack': {
                from: 0,
                to: 6,
                speed: 15,
                loop: true  // deve ser padrao false
            }
        }
    });

    await k.loadSprite('player-attack3', '/sprites/player/Attack3.png', {
        sliceX: 8,
        anims: {
            'attack': {
                from: 0,
                to: 7,
                speed: 15,
                loop: true // deve ser padrao false
            }
        }
    });

    await k.loadSprite('player-death', '/sprites/player/Death.png', {
        sliceX: 7,
        anims: {
            'death': {
                from: 0,
                to: 6,
                speed: 15,
                loop: true  // deve ser padrao false
            }
        }
    });

    await k.loadSprite('player-hit', '/sprites/player/Hit.png', {
        sliceX: 3,
        anims: {
            'hit': {
                from: 0,
                to: 2,
                speed: 15,
                loop: true  // deve ser padrao false
            }
        }
    });

}