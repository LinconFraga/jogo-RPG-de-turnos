<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  // Classe dos personagens!!!! 
  class Personagem {
    name: string
    hp: number
    maxHP: number
    baseDamage: number
    damageVariation: number
    mp: number
    maxMp: number
    criticalChance: number
    criticalMultiplier: number
    state: string

    constructor(
      name: string = "",
      hp: number, 
      maxHP: number, 
      baseDamage: number, 
      damageVariation: number, 
      mp: number,
      criticalChance: number = 0.1,
      criticalMultiplier: number = 1.5
    ) {
      this.name = name;
      this.hp = hp;
      this.maxHP = maxHP;
      this.baseDamage = baseDamage;
      this.damageVariation = damageVariation;
      this.mp = mp;
      this.maxMp = mp;
      this.criticalChance = criticalChance;
      this.criticalMultiplier = criticalMultiplier;
      this.state = 'idle';
    }

    atacar(): number {
      // Verifica se é um golpe crítico
      if (Math.random() < this.criticalChance) {
        const damage = Math.floor((this.baseDamage + Math.floor(Math.random() * (this.damageVariation * 2 + 1)) - this.damageVariation) * this.criticalMultiplier);
        return damage;
      }
      
      return this.baseDamage + Math.floor(Math.random() * (this.damageVariation * 2 + 1)) - this.damageVariation;
    }

    curar(healAmount: number = 30): number {
      const healCost = 20;
      if (this.mp >= healCost) {
        this.mp -= healCost;
        const heal = healAmount + Math.floor(Math.random() * 5);
        this.hp = Math.min(this.maxHP, this.hp + heal);
        return heal;
      }
      return 0;
    }
  }

  //personagens
  let heroi = new Personagem("Herói", 100, 100, 15, 5, 100);
  let reiOg = new Personagem("Rei Og de Elderling",120, 120, 20, 3, 0, 0.1, 1.5);

  // Variáveis de controle do jogo
  let currentTurn = 'player';
  let gameMessage = 'Sua vez!';
  
  // Controle de áudio
  let bgMusic: Howl;
  let isSoundOn = true;
  
  // Rastreamento de posição para personagens
  const playerPosition = tweened({ x: 0, y: 0 }, {
    duration: 500,
    easing: cubicOut
  });
  
  const enemyPosition = tweened({ x: 0, y: 0 }, {
    duration: 500,
    easing: cubicOut
  });
  
  // Tempos de animação
  const animationDuration = 1000;
  const attackDistance = 2100; // Distância de ataque para permitir colisão
  
  // Configuração da música de fundo
  onMount(() => {
    bgMusic = new Howl({
      src: ['/sounds/batalha.mp3'],
      loop: true,
      volume: 0.35,
    });
    if (isSoundOn) bgMusic.play();

    return () => {
      bgMusic.stop();
    };
  });

  // Função para controlar o som
  function toggleSound() {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
  }

  async function playerAttack() {
    if (currentTurn !== 'player') return;
    
    heroi.state = 'attack';
    
    // Avance e suba ligeiramente para atacar
    await playerPosition.set({ x: attackDistance, y: -20 });
    
    const damage = heroi.atacar();
    reiOg.hp = Math.max(0, reiOg.hp - damage);
    
    if (Math.random() < heroi.criticalChance) {
      gameMessage = `Você causou um golpe crítico de ${damage} de dano!`;
    } else {
      gameMessage = `Você causou ${damage} de dano!`;
    }
    
    const enemy = document.querySelector('.enemy-sprite');
    if (enemy instanceof HTMLElement) {
      enemy.style.animation = 'impact 0.2s ease-in-out';
      setTimeout(() => (enemy.style.animation = ''), 200);
    }
 
    // retorna para a posição inicial 
    await playerPosition.set({ x: 0, y: 0 });
    
    if (reiOg.hp <= 0) {
      reiOg.state = 'dead';
      gameMessage = 'Vitória! Você derrotou o inimigo!';
      // Adicionar tempo de espera antes de ir para a tela de vitória
      setTimeout(goToVictoryScreen, 3000);
      return;
    }
    
    heroi.state = 'idle';
    currentTurn = 'enemy';
    setTimeout(enemyTurn, 1500);
  }
  
  // Função para ir para a tela de vitória
  function goToVictoryScreen() {
    // Parar a música da batalha se estiver tocando
    if (bgMusic) {
      bgMusic.pause();
    }
    
    // Redirecionar para a tela de vitória
    window.location.href = '/victory'; // Ajuste o caminho conforme necessário
  }

  // Função para ir para a tela de derrota
  function goToDefeatScreen() {
    // Parar a música da batalha se estiver tocando
    if (bgMusic) {
      bgMusic.pause();
    }
    
    // Redirecionar para a tela de derrota
    window.location.href = '/defeat'; // Caminho para a tela de derrota
  }
  
  async function enemyTurn() {
    reiOg.state = 'attack';
    
    // Avance e suba ligeiramente para atacar
    await enemyPosition.set({ x: -attackDistance, y: -20 });
    
    const damage = reiOg.atacar();
    heroi.hp = Math.max(0, heroi.hp - damage);
    
    if (Math.random() < reiOg.criticalChance) {
      gameMessage = `${reiOg.name} causou um golpe crítico de ${damage} de dano!`;
    } else {
      gameMessage = `${reiOg.name} causou ${damage} de dano!`;
    }
    
    const player = document.querySelector('.player-sprite');
    if (player instanceof HTMLElement) {
      player.style.animation = 'impact 0.2s ease-in-out';
      setTimeout(() => (player.style.animation = ''), 200);
    }
    
    // Retornar à posição original
    await enemyPosition.set({ x: 0, y: 0 });
    
    if (heroi.hp <= 0) {
      heroi.state = 'dead';
      gameMessage = 'Fim de Jogo! Você foi derrotado!';
      // Adicionar tempo de espera antes de ir para a tela de derrota
      setTimeout(goToDefeatScreen, 3000);
      return;
    }
    
    reiOg.state = 'idle';
    currentTurn = 'player';
  }
  
  async function playerHeal() {
    if (currentTurn !== 'player' || heroi.mp < 20) return;
    
    heroi.state = 'cast';
    await new Promise(resolve => setTimeout(resolve, animationDuration));
    
    const heal = heroi.curar();
    gameMessage = `Você se curou em ${heal} pontos de vida!`;
    
    heroi.state = 'idle';
    currentTurn = 'enemy';
    setTimeout(enemyTurn, 1500);
  }
</script>

<div class="battle-container">
  <div class="audio-control">
     <!-- Botão de ligar/desligar som -->
     <button class="sound-button" on:click={toggleSound}>
      {#if isSoundOn}
          🔈
      {:else}
          🔇
      {/if}
    </button>
  </div>

  <div class="battle-scene">
    <div class="character player" 
         class:player-dead={heroi.state === 'dead'}
         style="transform: translate({$playerPosition.x}px, {$playerPosition.y}px)">
      <div class="sprite player-sprite {heroi.state}"></div>
      <div class="stats">
        <div class="health-bar">
          <div class="health-fill" style="width: {(heroi.hp / heroi.maxHP) * 100}%"></div>
        </div>
        <div class="mana-bar">
          <div class="mana-fill" style="width: {(heroi.mp / heroi.maxMp) * 100}%"></div>
        </div>
      </div>
    </div>
    
    <div class="character enemy" 
         class:enemy-dead={reiOg.state === 'dead'}
         style="transform: translate({$enemyPosition.x}px, {$enemyPosition.y}px)">

      <div class="sprite enemy-sprite {reiOg.state}"></div>
      <div class="stats">
        <div class="health-bar">
          <div class="health-fill" style="width: {(reiOg.hp / reiOg.maxHP) * 100}%"></div>
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
        class="action-button attack">
        Atacar
      </button>
      <button 
        on:click={playerHeal} 
        class="action-button heal">
        Curar (20 MP)
      </button>
    </div>
  </div>
</div>