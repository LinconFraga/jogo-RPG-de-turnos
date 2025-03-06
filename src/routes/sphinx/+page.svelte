<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';
    import { goto } from '$app/navigation'; // Importação para navegação programática

    // Variáveis do jogo
    let music: Howl;
    let showChallengeButton = true; // Mostrar botão "Desafiar Guardião"
    let showGuardianDialog = false; // Mostrar diálogo do guardião
    let showSphinxDialog = false; // Mostrar diálogo do guardião
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
            question: 'Sou o passado e o futuro, mas nunca o presente sou. Sou inevitável e corro, mas não tenho forma, nem cor.',
            answer: 'tempo',
        },
        {
            question: 'Eu te sigo sem descanso, mas nunca posso te tocar. Sou maior ao amanhecer, e à noite deixo de estar.',
            answer: 'sombra'
        },
        {
            question: 'Tenho dentes, mas não mordo. Abro portas sem esforço. Pequena sou, mas sem mim, ficarás preso no fim',
            answer: 'chave',
        },
    ];

    // Configuração da música de fundo
    onMount(() => {
        music = new Howl({
            src: ['/sounds/forest-theme.mp3'],
            loop: true,
            volume: 0.35,
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

    // Função para iniciar o diálogo do guardião
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
            feedbackMessage = `Muito bem, Herói! Você acertou.`;
        } else {
            if (correctAnswers === 0 && currentRiddle === 0) {
                feedbackMessage = 'Sinto pelo teu reino, Herói! Erraste pela primeira vez. Mais um erro e serás meu escravo!';
            } else {
                feedbackMessage = 'Você errou novamente! Agora você é meu escravo para sempre!';
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
                Eu sou o cavaleiro do reino de Zatmênia e desejo encontrar o caminho para a Cidade de Elderling! Sei que guardas todos os lugares desta floresta. Mostra-me onde se esconde o flagelo do meu povo: o maldito rei Og!
            </p>
            <button on:click={startSphinxDialog}>Continuar</button>
        </div>
    {/if}

    <!-- Diálogo do guardião -->
    {#if showSphinxDialog}
        <div class="dialog-box">
            <h2>Guardião dos Caminhos</h2>
            <p>Então buscas o caminho perdido,
                a rota até o Reino Escondido?
                Se assim o queres, tens que acertar
                os três enigmas que vou perguntar.
                Se eles errares, teu fim será certo,
                serás meu servo neste bosque deserto.
                Mas se me vences, te darei a visão:
                o mapa que guia ao teu coração.
                Queres mesmo este fardo carregar,
                ó bravo herói de Zatmênia a lutar?
                Pensa bem antes de decidir,
                pois poucos voltam ao prosseguir.
            </p>
            <button on:click={startRiddles}>Aceitar Desafio</button>
        </div>
    {/if}

    <!-- Enigmas -->
    {#if showRiddles && !gameOver && currentRiddle < 3}
        <div class="dialog-box">
            <h2>Enigma do guardião</h2>
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
                <p>Parabéns! Você venceu o guardião e recebeu o mapa para o Reino de Elderling.</p>
                <button on:click={proceedToBattle}>Prosseguir</button>
            {:else}
                <h2>Derrota!</h2>
                <p>Você perdeu! Agora você é escravo do guardião da floresta para sempre!</p>
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