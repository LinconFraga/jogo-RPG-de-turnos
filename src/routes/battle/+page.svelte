<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';
  
    // Variáveis do jogo
    let playerHealth = 100;
    let playerMana = 50;
    let enemyHealth = 100;
    let battleLog: string[] = [];
    let stageTitle = "Batalha contra o Rei Og";
    let music: Howl;
    let playerPosition = { x: 0, y: 0 };
    let enemyPosition = { x: 0, y: 0 };
    let isAttacking = false;
    let isMusicOn = true;
  
    // Inicializa o som de fundo
    onMount(() => {
      music = new Howl({
        src: ['/sounds/batalha.mp3'], // Música de fundo
        loop: true,
        volume: 0.5,
      });
      if (isMusicOn) music.play();
  
      return () => {
        music.stop();
      };
    });
  
    // Função para ligar/desligar o som
    function toggleMusic() {
      isMusicOn = !isMusicOn;
      if (isMusicOn) {
        music.play();
      } else {
        music.pause();
      }
    }
  
    // Funções de batalha
    async function attack() {
      if (isAttacking) return;
      isAttacking = true;
  
      // Animação do herói atacando: avança em direção ao inimigo
      playerPosition.x += 150; // Move o herói para a frente
      await new Promise((resolve) => setTimeout(resolve, 400)); // Tempo de avanço
      playerPosition.x -= 150; // Retorna o herói à posição inicial
      await new Promise((resolve) => setTimeout(resolve, 300)); // Tempo de espera antes do dano
  
      const damage = Math.floor(Math.random() * 20) + 10; // Dano entre 10 e 30
      enemyHealth -= damage;
      battleLog.push(`Você atacou o Rei Og e causou ${damage} de dano!`);
  
      if (enemyHealth <= 0) {
        battleLog.push("Você derrotou o Rei Og!");
        endGame(true);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800)); // Tempo de espera antes do contra-ataque
        await enemyTurn();
      }
      isAttacking = false;
    }
  
    async function heal() {
      if (playerMana >= 20) {
        const healAmount = Math.floor(Math.random() * 20) + 10; // Cura entre 10 e 30
        playerHealth += healAmount;
        playerMana -= 20;
        battleLog.push(`Você usou cura e recuperou ${healAmount} de vida!`);
        await new Promise((resolve) => setTimeout(resolve, 800)); // Tempo de espera antes do contra-ataque
        await enemyTurn();
      } else {
        battleLog.push("Mana insuficiente para curar!");
      }
    }
  
    async function specialAttack() {
      if (playerMana >= 30) {
        isAttacking = true;
  
        // Animação do herói atacando: avança em direção ao inimigo
        playerPosition.x += 150; // Move o herói para a frente
        await new Promise((resolve) => setTimeout(resolve, 400)); // Tempo de avanço
        playerPosition.x -= 150; // Retorna o herói à posição inicial
        await new Promise((resolve) => setTimeout(resolve, 300)); // Tempo de espera antes do dano
  
        const damage = Math.floor(Math.random() * 30) + 20; // Dano entre 20 e 50
        enemyHealth -= damage;
        playerMana -= 30;
        battleLog.push(`Você usou um golpe especial e causou ${damage} de dano!`);
  
        if (enemyHealth <= 0) {
          battleLog.push("Você derrotou o Rei Og!");
          endGame(true);
        } else {
          await new Promise((resolve) => setTimeout(resolve, 800)); // Tempo de espera antes do contra-ataque
          await enemyTurn();
        }
        isAttacking = false;
      } else {
        battleLog.push("Mana insuficiente para o golpe especial!");
      }
    }
  
    async function enemyTurn() {
      // Animação do inimigo atacando: avança em direção ao herói
      enemyPosition.x -= 150; // Move o inimigo para a frente
      await new Promise((resolve) => setTimeout(resolve, 400)); // Tempo de avanço
      enemyPosition.x += 150; // Retorna o inimigo à posição inicial
      await new Promise((resolve) => setTimeout(resolve, 300)); // Tempo de espera antes do dano
  
      const damage = Math.floor(Math.random() * 15) + 5; // Dano entre 5 e 20
      playerHealth -= damage;
      battleLog.push(`O Rei Og atacou você e causou ${damage} de dano!`);
  
      if (playerHealth <= 0) {
        battleLog.push("Você foi derrotado pelo Rei Og...");
        endGame(false);
      }
    }
  
    function endGame(victory: boolean) {
      music.stop();
      if (victory) {
        window.location.href = '/final'; // Tela final (vitória)
      } else {
        window.location.href = '/defeat'; // Tela de derrota
      }
    }
  </script>
  
  <style>
    /* Estilos globais */
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      font-family: 'OldLondon', serif;
      color: white;
      background-color: black;
    }
  
    .battle {
      display: grid;
      grid-template-areas:
        "title title music"
        "player main enemy"
        "log log log"
        "actions actions actions";
      grid-template-rows: 100px 1fr 150px 100px; /* Aumentei o espaço do log */
      grid-template-columns: 200px 1fr 200px;
      height: 100vh;
      background-image: url('/images/fundo-fase2.png');
      background-size: cover;
      background-position: center;
    }
  
    .title {
      grid-area: title;
      text-align: center;
      font-size: 40px;
      padding: 25px;
      background: rgba(0, 0, 0, 0.8);
      border-bottom: 3px solid gold;
    }
  
    .music-button {
      grid-area: music;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 25px;
      background: rgba(0, 0, 0, 0.8);
      border-bottom: 3px solid gold;
    }
  
    .music-button button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border: 2px solid gold;
      border-radius: 5px;
      font-family: 'OldLondon', serif;
      transition: background-color 0.3s, transform 0.3s;
    }
  
    .music-button button:hover {
      background-color: rgba(255, 215, 0, 0.8);
      color: black;
      transform: scale(1.05);
    }
  
    .player-info {
      grid-area: player;
      background: rgb(255, 255, 255);
      padding: 15px;
      border-right: 3px solid gold;
    }
  
    .enemy-info {
      grid-area: enemy;
      background: rgb(255, 255, 255);
      padding: 15px;
      border-left: 3px solid gold;
    }
  
    .main {
      grid-area: main;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: rgb(255, 255, 255);
      position: relative;
    }
  
    .log {
      grid-area: log;
      background: rgba(0, 0, 0, 0.8);
      padding: 15px;
      overflow-y: auto;
      border-top: 3px solid gold;
      font-size: 18px;
    }
  
    .actions {
      grid-area: actions;
      display: flex;
      justify-content: center;
      gap: 20px;
      background: rgba(0, 0, 0, 0.8);
      padding: 15px;
      border-top: 3px solid gold;
    }
  
    button {
      padding: 15px 30px;
      font-size: 18px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border: 2px solid gold;
      border-radius: 5px;
      font-family: 'OldLondon', serif;
      transition: background-color 0.3s, transform 0.3s;
    }
  
    button:hover {
      background-color: rgba(255, 215, 0, 0.8);
      color: black;
      transform: scale(1.05);
    }
  
    .health-bar, .mana-bar {
      width: 100%;
      height: 12px;
      background: #444;
      border-radius: 5px;
      margin: 8px 0;
    }
  
    .health-bar div, .mana-bar div {
      height: 100%;
      border-radius: 5px;
    }
  
    .health-bar div {
      background: red;
    }
  
    .mana-bar div {
      background: blue;
    }
  
    .character {
      position: absolute;
      transition: transform 0.4s ease-in-out;
    }
  
    .hero {
      width: 120px;
      height: 120px;
      left: 25%;
      bottom: 20%;
    }
  
    .enemy {
      width: 120px;
      height: 120px;
      right: 25%;
      bottom: 20%;
    }
  </style>
  
  <div class="battle">
    <!-- Título do estágio -->
    <div class="title">
      {stageTitle}
    </div>
  
    <!-- Botão de ligar/desligar música -->
    <div class="music-button">
      <button on:click={toggleMusic}>
        {#if isMusicOn}
          🔈
        {:else}
          🔇
        {/if}
      </button>
    </div>
  
    <!-- Informações do jogador -->
    <div class="player-info">
      <h2>Herói</h2>
      <p>Vida: {playerHealth}</p>
      <div class="health-bar">
        <div style={`width: ${playerHealth}%;`}></div>
      </div>
      <p>Mana: {playerMana}</p>
      <div class="mana-bar">
        <div style={`width: ${playerMana}%;`}></div>
      </div>
    </div>
  
    <!-- Área principal (batalha) -->
    <div class="main">
      <img
        src="/images/hero-sprite.png"
        alt="Herói"
        class="character hero"
        style={`transform: translate(${playerPosition.x}px, ${playerPosition.y}px);`}
      />
      <img
        src="/images/enemy-sprite.png"
        alt="Rei Og"
        class="character enemy"
        style={`transform: translate(${enemyPosition.x}px, ${enemyPosition.y}px);`}
      />
    </div>
  
    <!-- Informações do inimigo -->
    <div class="enemy-info">
      <h2>Rei Og</h2>
      <p>Vida: {enemyHealth}</p>
      <div class="health-bar">
        <div style={`width: ${enemyHealth}%;`}></div>
      </div>
    </div>
  
    <!-- Log de batalha -->
    <div class="log">
      {#each battleLog as message}
        <p>{message}</p>
      {/each}
    </div>
  
    <!-- Ações -->
    <div class="actions">
      <button on:click={attack}>Atacar</button>
      <button on:click={heal}>Curar (20 Mana)</button>
      <button on:click={specialAttack}>Golpe Especial (30 Mana)</button>
    </div>
  </div>