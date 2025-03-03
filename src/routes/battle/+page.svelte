<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  // inicio do jogo
  let playerHealth = 100;
  let playerMana = 100;
  let currentTurn = 'player';
  let gameMessage = 'Sua vez!';
  let playerState = 'idle';
  let enemyState = 'idle';
  
  // Estatísticas personalizáveis ​​do inimigo
  let enemyStats = {
    health: 100,
    maxHealth: 100,
    baseDamage: 20,
    damageVariation: 3,
    name: "rei Og de Elderling",
    criticalChance: 0.1,
    criticalMultiplier: 1.5
  };

  // pegador/levantador para a saúde do inimigo para garantir que ele permaneça dentro dos limites
  $: enemyHealth = enemyStats.health;
  $: {
    enemyStats.health = Math.max(0, Math.min(enemyStats.maxHealth, enemyHealth));
  }
  
  // Controle de áudio

  let bgMusic;
  let isMusicPlaying = true;
  
  // Rastreamento de posição para personagens
  const playerPosition = tweened({ x: 0, y: 0 }, {
    duration: 500,
    easing: cubicOut
  });
  
  const enemyPosition = tweened({ x: 0, y: 0 }, {
    duration: 500,
    easing: cubicOut
  });
  
  // Estatísticas de combate
  const playerAttackDamage = 15;
  const healAmount = 30;
  const healManaCost = 20;

  // Tempos de animação
  const animationDuration = 1000;
  const attackDistance = 2400; // Reduzida a distância de ataque para permitir colisão
  
  // Função para atualizar estatísticas do inimigo
  function updateEnemyStats(newStats) {
    enemyStats = {
      ...enemyStats,
      ...newStats
    };
    enemyStats.health = Math.min(enemyStats.health, enemyStats.maxHealth);
  }

  function toggleMusic() {
    if (!bgMusic) {
      bgMusic = new Audio('/sounds/batalha.mp3');
      bgMusic.loop = true;
    }
    
    if (isMusicPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
    isMusicPlaying = !isMusicPlaying;
  }
  
  async function playerAttack() {
    if (currentTurn !== 'player') return;
    
    playerState = 'attack';
    
    // Avance e suba ligeiramente para atacar
    await playerPosition.set({ x: attackDistance, y: -20 });
    
    const damage = playerAttackDamage + Math.floor(Math.random() * 5);
    enemyStats.health = Math.max(0, enemyStats.health - damage);
    gameMessage = `Você causou ${damage} de dano!`;
    
    const enemy = document.querySelector('.enemy-sprite');
    // enemy.style.animation = 'impact 0.2s ease-in-out';
    if (enemy instanceof HTMLElement) {
      enemy.style.animation = 'impact 0.2s ease-in-out';
      setTimeout(() => (enemy.style.animation = ''), 200);
    }
 
    // retorna para a posição inicial 
    await playerPosition.set({ x: 0, y: 0 });
    
    if (enemyStats.health <= 0) {
      enemyState = 'dead';
      gameMessage = 'Vitória! Você derrotou o inimigo!';
      return;
    }
    
    playerState = 'idle';
    currentTurn = 'enemy';
    setTimeout(enemyTurn, 1500);
  }
  
  async function enemyTurn() {
    enemyState = 'attack';
    
    // Avance e suba ligeiramente para atacar
    await enemyPosition.set({ x: -attackDistance, y: -20 });
    
    let damage = enemyStats.baseDamage + Math.floor(Math.random() * enemyStats.damageVariation);
    
    if (Math.random() < enemyStats.criticalChance) {
      damage = Math.floor(damage * enemyStats.criticalMultiplier);
      gameMessage = `${enemyStats.name} causou um golpe crítico de ${damage} de dano!`;
    } else {
      gameMessage = `${enemyStats.name} causou ${damage} de dano!`;
    }
    
    playerHealth = Math.max(0, playerHealth - damage);
    
    const player = document.querySelector('.player-sprite');
    // player.style.animation = 'impact 0.2s ease-in-out';
    if (player instanceof HTMLElement) {
      player.style.animation = 'impact 0.2s ease-in-out';
      setTimeout(() => (player.style.animation = ''), 200);
    }
    
    // Retornar à posição original
    await enemyPosition.set({ x: 0, y: 0 });
    
    if (playerHealth <= 0) {
      playerState = 'dead';
      gameMessage = 'Fim de Jogo! Você foi derrotado!';
      return;
    }
    
    enemyState = 'idle';
    currentTurn = 'player';
  }
  
  async function playerHeal() {
    if (currentTurn !== 'player' || playerMana < healManaCost) return;
    
    playerMana -= healManaCost;
    playerState = 'cast';
    await new Promise(resolve => setTimeout(resolve, animationDuration));
    
    const heal = healAmount + Math.floor(Math.random() * 5);
    playerHealth = Math.min(100, playerHealth + heal);
    gameMessage = `Você se curou em ${heal} pontos de vida!`;
    
    playerState = 'idle';
    currentTurn = 'enemy';
    setTimeout(enemyTurn, 1500);
  }

  onMount(() => {
    loadSprites();
  });

  function loadSprites() {
    // Lógica de carregamento de Sprite aqui
  }
</script>

<div class="battle-container">
  <div class="audio-control">
    <button class="music-button" on:click={toggleMusic}>
      {isMusicPlaying ? '🔊' : '🔇'}
    </button>
  </div>

  <div class="battle-scene">
    <div class="character player" 
         class:player-dead={playerState === 'dead'}
         style="transform: translate({$playerPosition.x}px, {$playerPosition.y}px)">
      <div class="sprite player-sprite {playerState}"></div>
      <div class="stats">
        <div class="health-bar">
          <div class="health-fill" style="width: {playerHealth}%"></div>
        </div>
        <div class="mana-bar">
          <div class="mana-fill" style="width: {playerMana}%"></div>
        </div>
      </div>
    </div>
    
    <div class="character enemy" 
         class:enemy-dead={enemyState === 'dead'}
         style="transform: translate({$enemyPosition.x}px, {$enemyPosition.y}px)">

      <div class="sprite enemy-sprite {enemyState}"></div>
      <div class="stats">
        <div class="health-bar">
          <div class="health-fill" style="width: {(enemyStats.health / enemyStats.maxHealth) * 100}%"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="battle-ui">
    <div class="message-box">
      {gameMessage}
    </div>
    
    <div class="action-buttons">
      <button 
        on:click={playerAttack} 
        disabled={currentTurn !== 'player' || playerState === 'dead'}
        class="action-button attack">
        Atacar
      </button>
      <button 
        on:click={playerHeal} 
        disabled={currentTurn !== 'player' || playerMana < healManaCost || playerState === 'dead'}
        class="action-button heal">
        Curar ({healManaCost} MP)
      </button>
    </div>
  </div>
</div>
