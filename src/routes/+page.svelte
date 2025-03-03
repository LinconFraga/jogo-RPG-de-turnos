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

<div class="main-menu">
  <h1 class="title">Zatmênia</h1>
  <div class="buttons">
    <a href="/story">Jogar</a>
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
