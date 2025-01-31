<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';

    let music: Howl;

    onMount(() => {
        music = new Howl({
            src: ['/sounds/story-theme.mp3'],
            loop: true,
            volume: 0.5,
        });
        music.play();

        return () => {
            music.stop();
        };
    });

    function startGame() {
        music.stop();
        window.location.href = '/sphinx'; // Redireciona para o enigma da esfinge
    }
</script>

<style>
    .story {
        background-image: url('/images/story-background.jpg');
        background-size: cover;
        background-position: center;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 20px;
        color: white;
        text-align: center;
    }

    .story-content {
        background: rgba(0, 0, 0, 0.7);
        padding: 20px;
        border-radius: 10px;
        max-width: 600px;
    }

    button {
        margin-top: 20px;
        padding: 15px 30px;
        font-size: 20px;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border: 2px solid white;
        border-radius: 5px;
        font-family: 'BroncoPersonalUse', sans-serif;
    }
</style>

<div class="story">
    <div class="story-content">
        <h1>A Missão do Herói</h1>
        <p>
            Você é o herói do reino de Zatmênia e o tesouro do seu senhor foi roubado pelo terrível rei Og, da cidade escondida de Elderling. Sua missão é desafiar e vencer a esfinge guardiã, resolvendo os seus enigmas, para descobrir o caminho para a cidade escondida, duelar com o rei e tomar de volta o maior símbolo do orgulho do povo de Zatmênia. Mas cuidado com os perigos à vista! Que a deusa Ena guie sua sabedoria e sua espada, grande guerreiro!
        </p>
        <button on:click={startGame}>Prosseguir</button>
    </div>
</div>