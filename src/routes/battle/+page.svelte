<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  // Game state
  let playerHealth = 100;
  let playerMana = 50;
  let currentTurn = 'player';
  let gameMessage = 'Sua vez!';
  let playerState = 'idle';
  let enemyState = 'idle';
  
  // Enemy customizable stats
  let enemyStats = {
    health: 100,
    maxHealth: 100,
    baseDamage: 12,
    damageVariation: 5,
    name: "Inimigo",
    level: 1,
    criticalChance: 0.1,
    criticalMultiplier: 1.5
  };

  // Getter/Setter for enemy health to ensure it stays within bounds
  $: enemyHealth = enemyStats.health;
  $: {
    enemyStats.health = Math.max(0, Math.min(enemyStats.maxHealth, enemyHealth));
  }
  
  // Controle de áudio
  let bgMusic;
  let isMusicPlaying = false;
  
  // Position tracking for characters
  const playerPosition = tweened({ x: 0, y: 0 }, {
    duration: 500,
    easing: cubicOut
  });
  
  const enemyPosition = tweened({ x: 0, y: 0 }, {
    duration: 500,
    easing: cubicOut
  });
  
  // Combat stats
  const playerAttackDamage = 15;
  const healAmount = 25;
  const healManaCost = 15;

  // Animation timings
  const animationDuration = 1000;
  const attackDistance = 150; // Reduzida a distância de ataque para permitir colisão
  
  // Function to update enemy stats
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
    
    // Move forward and slightly up for attack
    await playerPosition.set({ x: attackDistance, y: -20 });
    
    const damage = playerAttackDamage + Math.floor(Math.random() * 5);
    enemyStats.health = Math.max(0, enemyStats.health - damage);
    gameMessage = `Você causou ${damage} de dano!`;
    
    const enemy = document.querySelector('.enemy-sprite');
    enemy.style.animation = 'impact 0.2s ease-in-out';
    
    // Return to original position
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
    
    // Move forward and slightly up for attack
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
    player.style.animation = 'impact 0.2s ease-in-out';
    
    // Return to original position
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
    // Sprite loading logic here
  }
</script>

<div class="battle-container">
  <div class="audio-control">
    <button class="music-button" on:click={toggleMusic}>
      {isMusicPlaying ? '🔇' : '🔊'}
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
      <div class="enemy-info">
        <span class="enemy-name">Nível {enemyStats.level} {enemyStats.name}</span>
      </div>
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

<style>
  .battle-container {
    width: 100%;
    height: 100vh;
    background: url('/images/medieval-battlefield.png') center/cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    color: #fff;
    font-family: 'MedievalFont', fantasy;
    overflow: hidden;
  }

  .battle-scene {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60%;
    padding: 0 100px;
    margin-top: 100px; /* Moved characters down */
  }

  .character {
    width: 200px;
    height: 200px;
    position: relative;
    transition: transform 0.5s ease;
  }

  .sprite {
    position: relative;
    top: 120%;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .player-sprite {
    background-image: url('/sprites/player.png');
  }

  .enemy-sprite {
    background-image: url('/sprites/enemy.png');
  }

  .player-sprite.attack {
    animation: attack-swing 0.5s ease-in-out;
  }

  .enemy-sprite.attack {
    animation: attack-swing 0.5s ease-in-out;
  }

  @keyframes attack-swing {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-30deg); }
    100% { transform: rotate(0deg); }
  }

  @keyframes impact {
    0% { transform: scale(1); }
    50% { transform: scale(0.9) rotate(5deg); }
    100% { transform: scale(1); }
  }

  .player-sprite.cast {
    animation: cast-spell 1s;
  }

  .stats {
    position: absolute;
    bottom: -30px;
    width: 100%;
  }

  .health-bar, .mana-bar {
    height: 10px;
    background: #333;
    border: 2px solid #000;
    margin: 5px 0;
    border-radius: 5px;
    overflow: hidden;
  }

  .health-fill {
    height: 100%;
    background: linear-gradient(to right, #ff0000, #ff3333);
    transition: width 0.3s ease;
  }

  .mana-fill {
    height: 100%;
    background: linear-gradient(to right, #0000ff, #3333ff);
    transition: width 0.3s ease;
  }

  .battle-ui {
    background: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    border-radius: 10px;
    border: 2px solid #gold;
    z-index: 10;
    margin-top: auto;
  }

  .message-box {
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    text-align: center;
    font-size: 1.2rem;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .action-button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .action-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .action-button.attack {
    background: #8b0000;
    color: white;
  }

  .action-button.heal {
    background: #006400;
    color: white;
  }

  .player-dead, .enemy-dead {
    opacity: 0.5;
    transform: rotate(90deg);
    transition: all 0.5s ease;
  }

  .audio-control {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
  }

  .music-button {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: 2px solid #gold;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  .music-button:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  .enemy-info {
    position: absolute;
    top: 190px;
    width: 100%;
    text-align: center;
  }

  .enemy-name {
    background: rgba(0, 0, 0, 0.7);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
  }
</style>