<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';
    import { goto } from '$app/navigation'; // Importação para navegação programática

    // Variáveis do jogo
    let music: Howl;
    let showChallengeButton = true; // Mostrar botão "Desafiar Guardião"
    let showGuardianDialog = false; // Mostrar diálogo do guardião
    let showSphinxDialog = false; // Mostrar diálogo da esfinge
    let showRiddles = false; // Mostrar enigmas
    let showFeedbackDialog = false; // Mostrar feedback do guardião
    let feedbackMessage = ''; // Mensagem de feedback
    let currentRiddle = 0; // Enigma atual
    let playerAnswer = ''; // Resposta do jogador
    let correctAnswers = 0; // Número de respostas corretas
    let gameOver = false; // Fim de jogo
    let gameWon = false; // Jogador venceu
    let isSoundOn = true; // Controle de som ligado/desligado

    // Enigmas
    const riddles = [
        {
            question: 'Sou o passado e o futuro, mas nunca o presente sou. Sou inevitável e corro, mas não tenho forma ou cor.',
            answer: 'o tempo',
        },
        {
            question: 'Eu te sigo sem descanso, mas nunca posso te tocar. Sou maior ao amanhecer, e à noite deixo de estar.',
            answer: 'a sombra',
        },
        {
            question: 'Tenho dentes, mas não mordo. Abro portas sem esforço. Pequena sou, mas sem mim, ficarás preso no fim',
            answer: 'a chave',
        },
    ];

    // Configuração da música de fundo
    onMount(() => {
        music = new Howl({
            src: ['/sounds/forest-theme.mp3'],
            loop: true,
            volume: 0.2,
        });
        if (isSoundOn) music.play();

        return () => {
            music.stop();
        };
    });

    // Função para controlar o som
    function toggleSound() {
        isSoundOn = !isSoundOn;
        if (isSoundOn) {
            music.play();
        } else {
            music.pause();
        }
    }

    // Função para iniciar o diálogo do guardião
    function startGuardianDialog() {
        showChallengeButton = false;
        showGuardianDialog = true;
    }

    // Função para iniciar o diálogo da esfinge
    function startSphinxDialog() {
        showGuardianDialog = false;
        showSphinxDialog = true;
    }

    // Função para iniciar os enigmas
    function startRiddles() {
        showSphinxDialog = false;
        showRiddles = true;
    }

    // Função para verificar a resposta do jogador
    function checkAnswer() {
        if (playerAnswer.toLowerCase() === riddles[currentRiddle].answer) {
            correctAnswers += 1;
            feedbackMessage = `Muito bem, Herói! Você acertou. Faltam ${2 - correctAnswers} enigmas para vencer.`;
        } else {
            if (correctAnswers === 0 && currentRiddle === 0) {
                feedbackMessage = 'Cuidado, Herói! Errou pela primeira vez. Mais um erro e você será meu escravo!';
            } else {
                feedbackMessage = 'Você errou novamente! Agora você é meu escravo para sempre.';
                endGame();
            }
        }
        showFeedbackDialog = true;
        playerAnswer = ''; // Limpa a resposta do jogador
        currentRiddle += 1; // Avança para o próximo enigma, mesmo se errar
        if (currentRiddle >= riddles.length || gameOver) {
            endGame();
        }
    }

    // Função para finalizar o jogo
    function endGame() {
        gameOver = true;
        if (correctAnswers >= 2) {
            gameWon = true;
        }
    }

    // Função para prosseguir para a rota "battle"
    function proceedToBattle() {
        goto('/battle'); // Navega para a rota "battle"
    }

    // Função para voltar ao menu
    function returnToMenu() {
        goto('/'); // Navega para o menu principal
    }
</script>

<style>
    /* Importação da fonte OldLondon */
    @font-face {
        font-family: 'OldLondon';
        src: url('/fonts/OldLondon.ttf') format('truetype');
    }

    .game-container {
        position: relative;
        width: 100%;
        height: 100vh;
        background-image: url('/images/forest-background.jpg');
        background-size: cover;
        background-position: center;
        overflow: hidden;
        font-family: 'OldLondon', serif;
    }

    .dialog-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 15px;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        font-size: 1.5rem;
    }

    .dialog-box h2 {
        font-size: 2.5rem;
        margin-bottom: 10px;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
    }

 /* Modificação na classe challenge-button */
    .challenge-button {
    position: absolute;
    top: 50%;
    left: 35%;
    font-size: 2rem;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #333333;
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'OldLondon', serif;
    text-transform: uppercase;
    box-shadow: 0 0 10px rgba(204, 204, 204, 0.8);
    transition: box-shadow 0.2s; /* Removida a transição do transform */
}

    .challenge-button:hover {
    box-shadow: 0 0 15px rgba(204, 204, 204, 1);
    /* Removido o transform: scale() */
}

    .dialog-box button {
        font-size: 1.2rem; /* Tamanho reduzido para os outros botões */
        padding: 8px 16px; /* Reduzido o padding para diminuir as laterais */
    }

    .dialog-box button:hover, .challenge-button:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(204, 204, 204, 1);
    }

    input {
        margin-top: 10px;
        padding: 10px;
        font-size: 1.5rem;
        width: 100%;
        font-family: 'OldLondon', serif;
        background-color: rgba(255, 255, 255, 0.8);
        border: 2px solid #D2B48C;
        border-radius: 5px;
    }

    .return-button {
        position: absolute;
        bottom: 20px;
        left: 20px;
        padding: 10px 20px;
        font-size: 1.2rem;
        cursor: pointer;
        background-color: #333333; /* Cinza escuro */
        color: white;
        border: none;
        border-radius: 10px;
        font-family: 'OldLondon', serif;
        text-transform: uppercase;
        box-shadow: 0 0 10px rgba(204, 204, 204, 0.8); /* Sombra cinza claro */
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .return-button:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(204, 204, 204, 1);
    }

    .sound-button {
        position: absolute;
        bottom: 20px;
        right: 20px;
        padding: 10px;
        font-size: 1rem;
        cursor: pointer;
        background-color: #333333; /* Cinza escuro */
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px rgba(204, 204, 204, 0.8); /* Sombra cinza claro */
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .sound-button:hover {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(204, 204, 204, 1);
    }

    .riddle-container {
        display: flex;
        flex-direction: column;
        gap: 20px; /* Espaçamento entre input e botão */
    }
</style>

<div class="game-container">
    <!-- Botão "Desafiar Guardião" -->
    {#if showChallengeButton}
        <button class="challenge-button" on:click={startGuardianDialog}>
            Desafiar Guardião
        </button>
    {/if}

    <!-- Diálogo do Guardião -->
    {#if showGuardianDialog}
        <div class="dialog-box">
            <h2>Herói de Zatmênia</h2>
            <p>
                Eu sou o cavaleiro do reino de Zatmênia e desejo encontrar o caminho para a Cidade de Elderling. Sei que conheces todos os lugares desta floresta. Mostre-me onde se esconde o flagelo do meu povo: o maldito rei Og!
            </p>
            <button on:click={startSphinxDialog}>Continuar</button>
        </div>
    {/if}

    <!-- Diálogo da Esfinge -->
    {#if showSphinxDialog}
        <div class="dialog-box">
            <h2>Guardião dos Caminhos</h2>
            <p>Então buscas o caminho perdido,
                A rota até o Reino Escondido?
                Se assim o queres, tens que acertar
                Os três enigmas que vou perguntar.
                Se dois errares, teu fim será certo,
                Serás meu servo neste bosque deserto.
                Mas se me vences, te darei a visão:
                O mapa que guia ao teu coração.
                Queres mesmo este fardo carregar,
                Ó bravo herói de Zatmênia a lutar?
                Pensa bem antes de decidir,
                Pois poucos voltam ao partir.
            </p>
            <button on:click={startRiddles}>Aceitar Desafio</button>
        </div>
    {/if}

    <!-- Enigmas -->
    {#if showRiddles && !gameOver && currentRiddle < 3}
        <div class="dialog-box">
            <h2>Enigma da Esfinge</h2>
            <p>{riddles[currentRiddle].question}</p>
            <div class="riddle-container">
                <input type="text" bind:value={playerAnswer} placeholder="Sua resposta..." />
                <button on:click={checkAnswer}>Responder</button>
            </div>
        </div>
    {/if}

    <!-- Feedback do Guardião -->
    {#if showFeedbackDialog}
        <div class="dialog-box">
            <h2>Guardião dos Caminhos</h2>
            <p>{feedbackMessage}</p>
            <button on:click={() => { showFeedbackDialog = false; if (gameOver) endGame(); }}>Continuar</button>
        </div>
    {/if}

    <!-- Fim de jogo -->
    {#if gameOver}
        <div class="dialog-box">
            {#if gameWon}
                <h2>Vitória!</h2>
                <p>Parabéns! Você venceu a esfinge e recebeu o mapa para o Reino de Elderling.</p>
                <button on:click={proceedToBattle}>Prosseguir</button>
            {:else}
                <h2>Derrota!</h2>
                <p>Você perdeu! Agora você é escravo da esfinge para sempre.</p>
                <button on:click={returnToMenu}>Voltar ao Menu</button>
            {/if}
        </div>
    {/if}

    <!-- Botão de voltar -->
    <button class="return-button" on:click={returnToMenu}>Voltar</button>

    <!-- Botão de ligar/desligar som -->
    <button class="sound-button" on:click={toggleSound}>
        {#if isSoundOn}
            🔈
        {:else}
            🔇
        {/if}
    </button>
</div>