import k from "../kaplay";

const GROUND_HEIGHT = 220

export default function loadGround(): void {
    const ground = k.add([
        k.rect(k.width(), GROUND_HEIGHT), // Retângulo com a largura da tela e altura de 48 pixels
        k.pos(0, k.height() - GROUND_HEIGHT), // Posiciona o chão na parte inferior da tela
        k.area(), // Adiciona uma área de colisão
        k.body({ isStatic: true }), // Define o corpo como estático
        k.color(0, 255, 0), // Cor do chão (verde)
        'ground', // Tag para identificar o chão
    ]);
}