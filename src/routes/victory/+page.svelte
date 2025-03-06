<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';

    let music: Howl;
    let isMusicPlaying = true;
    
    onMount(() => {
        music = new Howl({
            src: ['/sounds/end-theme.mp3'],
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
        <h1>Vitória!</h1>
        <p>Você derrotou o rei Og e recuperou o tesouro de Zatmênia! O reino está salvo!</p>
        <button on:click={goToMainMenu}>VOLTAR AO MENU INICIAL</button>
    </div>
</div>