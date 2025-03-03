
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

<div class="about">
    <div class="about-content">
        <img src="/images/if.PNG" alt="Logotipo" class="logo" /> <!-- imagem do logotipo aqui -->
        <h1>Sobre o Jogo</h1>
        <p>
        PROFESSOR: Allan Lima
        </p>
        <p>
        INTEGRANTES: Lincon Fraga, Mikaias Marinho, Gabriel Luna, Lucas Cavalcanti, Karolayne Firmino.
        </p>
        <p>
            USO DA IA: Destinada à criação da lógica dos códigos, ao aprendizado sobre o funcionamento dos mesmos, para facilitar sua leitura e a realização das adaptações necessárias para a criação do estilo do jogo tal como idealizado, e à criação das imagens usadas no plano de fundo e nos sprites. Foram usadas mais de uma inteligência artificial no projeto, sendo as principais o Claude, para os códigos, e o Microsoft Designer, para as imagens.
        </p>

        <button on:click={goBack}>Voltar</button>
    </div>
</div>
<svelte:head>
    <link rel="stylesheet" href="/about.css">
</svelte:head>