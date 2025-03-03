<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';

    let music: Howl;

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
</script>

<div class="end">
    <div class="end-content">
        <h1>Vitória!</h1>
        <p>Você derrotou o rei Og e recuperou o tesouro de Zatmênia! O reino está salvo!</p>
        <button on:click={goToMainMenu}>Voltar ao Menu</button>
    </div>
</div>