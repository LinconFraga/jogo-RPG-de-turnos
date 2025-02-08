<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';

    let music: Howl;

    onMount(() => {
        music = new Howl({
            src: ['/sounds/main-theme.mp3'],
            loop: true,
            volume: 0.5,
        });
        music.play();

        return () => {
            music.stop();
        };
    });

    function goBack() {
        music.stop();
        window.location.href = '/'; // Redireciona para a tela inicial
    }
</script>

<style>
    .about {
        background-image: url('/images/about-background.jpg');
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

    .about-content {
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

<div class="about">
    <div class="about-content">
        <h1>Sobre o Jogo</h1>
        <p>
            Este RPG medieval transporta jogadores para um universo de perigos e maravilhas, onde cada escolha molda o destino do reino.<br>
            Prepare-se para embarcar em uma jornada repleta de batalhas, intrigas e mistérios!<br>
            Desenvolvido por: Gabriel Luna, Karolayne Firmino, Mikaias Santos, Lucas Cavalcanti, Lincoln Fraga no ano de 2025.<br>
            Desenvolvido como um projeto de RPG medieval de turnos, utilizando Svelte e TypeScript.<br>
            Inspirado em histórias clássicas de aventura e enigmas.
        </p>
        <button on:click={goBack}>Voltar</button>
    </div>
</div>