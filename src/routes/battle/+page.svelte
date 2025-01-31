<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';

    let music: Howl;

    onMount(() => {
        music = new Howl({
            src: ['/sounds/battle-theme.mp3'],
            loop: true,
            volume: 0.5,
        });
        music.play();

        return () => {
            music.stop();
        };
    });

    function endGame() {
        music.stop();
        window.location.href = '/end'; // Redireciona para a tela de encerramento
    }
</script>

<style>
    .battle {
        background-image: url('/images/battle-background.jpg');
        background-size: cover;
        background-position: center;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
    }

    .battle-content {
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

<div class="battle">
    <div class="battle-content">
        <h1>Batalha contra o Rei Og</h1>
        <p>Você enfrenta o terrível rei Og. Prepare-se para o duelo!</p>
        <button on:click={endGame}>Lutar</button>
    </div>
</div>