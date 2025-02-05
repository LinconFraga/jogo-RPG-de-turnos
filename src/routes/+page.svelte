<script lang="ts">
    import { onMount } from 'svelte';
  
    let isSoundOn = true;
    let audio: HTMLAudioElement;
  
    // Função para ligar/desligar o som
    function toggleSound() {
      isSoundOn = !isSoundOn;
      if (isSoundOn) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  
    // Inicializa o áudio quando o componente é montado
    onMount(() => {
      audio = new Audio('/sounds/tela-de-fundo.mp3'); // Substitua pelo caminho do seu arquivo de som
      audio.loop = true;
      if (isSoundOn) {
        audio.play();
      }
    });
  </script>
  
  <style>
    /* Garante que o body e html ocupem toda a altura da tela */
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden; /* Remove a barra de rolagem */
    }
  
    .main-menu {
      background-image: url('/images/tela-de-fundo.jpeg');
      background-size: cover;
      background-position: center;
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: relative;
    }
  
    .title {
      font-family: 'OldLondon', serif;
      font-size: 112px;
      margin: 5%;
      color: rgb(243, 227, 206);
      text-shadow: 3px 3px 5px #ee2424;
    }
  
    .buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
  
    button, a {
      margin: 10px;
      padding: 15px 30px;
      font-size: 20px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border: 2px solid white;
      border-radius: 5px;
      font-family: 'BroncoPersonalUse', sans-serif;
      text-decoration: none;
    }
  
    /* Estilo do botão de som */
    .sound-button {
      position: absolute;
      bottom: 20px;
      right: 20px;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border: 2px solid white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  </style>
  
  <div class="main-menu">
    <h1 class="title">Zatmênia</h1>
    <div class="buttons">
      <a href="/story">Jogar</a>
      <a href="/about">Sobre</a>
    </div>
    <!-- Botão de som -->
    <button class="sound-button" on:click={toggleSound}>
      {#if isSoundOn}
        🔈
      {:else}
        🔇
      {/if}
    </button>
  </div>