import k from "$lib/game/kaplay";

export default function createEnemy(phase: number) {
    // TODO
    

    const enemy = k.add([
        k.sprite('enemy-0', { anim: 'idle' }), // Usa o sprite com a animação 'idle'
        k.pos(k.width() - 122, 0), // Define a posição inicial
        k.anchor('center'), // Define o ponto de ancoragem
        k.area( { shape: new k.Rect(k.vec2(12, 0), 44, 90) }), // Adiciona uma área de colisão
        k.body(), // Adiciona um corpo físico
        k.health(10), // Adiciona vida ao personagem
        {
            SPEED: 400, // Propriedade personalizada
        },
        k.scale(2.7),
        'enemy-0', // Tag para identificar o personagem
    ]);

    enemy.flipX = true

    return enemy;
}
