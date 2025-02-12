<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let isSoundOn = true;
  let audio: HTMLAudioElement;

  function toggleSound() {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  onMount(() => {
    audio = new Audio('/sounds/tela-de-fundo.mp3');
    audio.loop = true;
    if (isSoundOn) {
      audio.play();
    }
  });

  onDestroy(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
</script>

<style>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
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
    padding: 12px 26px;
    font-size: 24px; /* Aumentei um pouco o tamanho para melhor visibilidade */
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: 2px solid white;
    border-radius: 5px;
    font-family: 'OldLondon', serif; /* Mudança principal aqui */
    text-decoration: none;
    transition: all 0.3s ease; /* Adicionei uma transição suave */
  }

  button:hover, a:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
  }

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
    font-family: inherit; /* Mantém a fonte padrão para o botão de som */
    font-size: 16px; /* Tamanho específico para o botão de som */
  }
</style>

<div class="main-menu">
  <h1 class="title">Zatmênia</h1>
  <div class="buttons">
    <a href="/play">Jogar</a>
    <a href="/about">Sobre</a>
  </div>
  <button class="sound-button" on:click={toggleSound}>
    {#if isSoundOn}
      🔈
    {:else}
      🔇
    {/if}
  </button>
</div>