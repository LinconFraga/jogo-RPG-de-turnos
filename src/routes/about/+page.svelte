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
        background-image: url('/images/about-background.jpeg');
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

    .logo {
        margin-top: 20px;
        width: 360px; /* Ajuste o tamanho conforme necessário */
    }

    .about-content {
        width: 100vh;
        height: auto;
        background: rgba(0, 0, 0, 0.6);
        padding: 20px;
        border-radius: 10px;
        max-width: 900px;
        font-size: 25px;
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
        <img src="/images/if.PNG" alt="Logotipo" class="logo" /> <!-- imagem do logotipo aqui -->
        <h1>Sobre o Jogo</h1>
        <p>
        PROFESSOR: Allan Lima
        </p>
        <p>
        INTEGRANTES: Lincon Fraga, Mikaias Marinho, Gabriel Luna, Lucas Cavalcanti, Karollayne Firmino.
        </p>
        <p>
            USO DA IA: Destinada à criação da lógica dos códigos, ao aprendizado sobre o funcionamento dos mesmos, para facilitar sua leitura e a realização das adaptações necessárias para a criação do estilo do jogo tal como idealizado, e à criação das imagens usadas no plano de fundo e nos sprites. Foram usadas mais de uma inteligência artificial no projeto, sendo as principais o Claude, para os códigos, e o Microsoft Designer, para as imagens.
        </p>

        <button on:click={goBack}>Voltar</button>
    </div>
</div>
