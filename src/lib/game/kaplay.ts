import kaplay, { type KAPLAYCtx } from "kaplay";

const k = kaplay({
    background: [3, 252, 240],
    width: 1200,
    height: 800
});


// Função para carregar todos os sprites

// Adiciona o chão
k.setGravity(1600); // Define a gravidade

export default k;