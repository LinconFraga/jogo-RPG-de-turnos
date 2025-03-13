<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';

    let music: Howl;
    let isMusicPlaying = true;
    
    onMount(() => {
        music = new Howl({
            src: ['/sounds/defeat-theme.mp3'],
            loop: true,
            volume: 0.5,
        });
        music.play();

        return () => {
            music.stop();
        };
    });

    function goToMainMenu() {
        music.stop();
        window.location.href = '/'; // Redireciona para a tela inicial
    }
    
    function toggleMusic() {
        if (isMusicPlaying) {
            music.pause();
        } else {
            music.play();
        }
        isMusicPlaying = !isMusicPlaying;
    }
</script>

<div class="end">
    <div class="audio-control">
        <button class="music-button" on:click={toggleMusic}>
            {isMusicPlaying ? '🔊' : '🔇'}
        </button>
    </div>
    
    <div class="end-content">
        <h1>Derrota!</h1>
        <p>Você perdeu a luta contra o rei Og, e agora o povo está desolado! Tente novamente, herói! Coragem! Zatmênia ainda acredita em você!</p>
        <button on:click={goToMainMenu}>VOLTAR AO MENU E TENTAR NOVAMENTE!</button>
    </div>
</div>