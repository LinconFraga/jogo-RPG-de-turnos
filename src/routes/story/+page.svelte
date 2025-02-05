<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';
  
    let music: Howl;
  
    // Inicializa o som de fundo
    onMount(() => {
      music = new Howl({
        src: ['/sounds/carta-inicio.mp3'],
        loop: true,
        volume: 0.5,
      });
      music.play();
  
      return () => {
        music.stop();
      };
    });
  
    // Função para prosseguir para a próxima tela
    function startGame() {
      music.stop();
      window.location.href = '/sphinx'; // Redireciona para o enigma da esfinge
    }
  
    // Função para voltar à tela anterior
    function goBack() {
      music.stop();
      window.location.href = '/'; // Redireciona para a tela inicial (ou a tela desejada)
    }
  </script>
  
  <style>
    /* Estilos globais para garantir que a tela ocupe todo o espaço */
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden; /* Remove a barra de rolagem */
    }
  
    .story {
      background-image: url('/images/carta-inicio.png');
      background-size: cover;
      background-position: center;
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      position: relative;
    }
  
    /* Estilo da imagem da história */
    .story-image {
      max-width: 80%;
      max-height: 70vh;
      border: 5px solid rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
    }
  
    /* Estilo dos botões */
    .next-button,
    .back-button {
      position: absolute;
      bottom: 40px;
      padding: 15px 30px;
      font-size: 24px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      border: 2px solid white;
      border-radius: 5px;
      font-family: 'OldLondon', serif;
      text-transform: uppercase;
      letter-spacing: 2px;
      transition: background-color 0.3s, transform 0.3s;
    }
  
    .next-button:hover,
    .back-button:hover {
      background-color: rgba(255, 255, 255, 0.8);
      color: black;
      transform: scale(1.05);
    }
  
    /* Posicionamento do botão de prosseguir */
    .next-button {
      right: 40px;
    }
  
    /* Posicionamento do botão de voltar */
    .back-button {
      left: 40px;
    }
  </style>
  
  <div class="story">
    <!-- Imagem da história -->
    <img
      src="/images/story-image.jpg"
      alt="História de Zatmênia"
      class="story-image"
    />
  
    <!-- Botão de voltar -->
    <button class="back-button" on:click={goBack}>
      Voltar
    </button>
  
    <!-- Botão de prosseguir -->
    <button class="next-button" on:click={startGame}>
      Prosseguir
    </button>
  </div>