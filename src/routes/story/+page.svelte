<script lang="ts">
  import { onMount } from 'svelte';
  import { Howl } from 'howler';

  let music: Howl;
  let isPlaying = true;

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

  // Função para controlar o áudio
  function toggleAudio() {
    if (isPlaying) {
      music.pause();
    } else {
      music.play();
    }
    isPlaying = !isPlaying;
  }

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


<div class="story">
  <!-- Botão de áudio -->
  <button class="audio-button" on:click={toggleAudio}>
      {isPlaying ? '🔊' : '🔇'}
  </button>

  <!-- Botão de voltar -->
  <button class="back-button" on:click={goBack}>
    Voltar
  </button>

  <!-- Botão de prosseguir -->
  <button class="next-button" on:click={startGame}>
    Seguir
  </button>
</div>