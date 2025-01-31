<script lang="ts">
    import { onMount } from 'svelte';
    import { Howl } from 'howler';

    let music: Howl;
    let answer: string = '';

    onMount(() => {
        music = new Howl({
            src: ['/sounds/sphinx-theme.mp3'],
            loop: true,
            volume: 0.5,
        });
        music.play();

        return () => {
            music.stop();
        };
    });

    function checkAnswer() {
        if (answer.toLowerCase() === 'buraco') {
            alert('Resposta correta! Você derrotou a esfinge e avança para o rei Og.');
            music.stop();
            window.location.href = '/battle'; // Redireciona para a batalha
        } else {
            alert('Resposta errada! Tente novamente.');
        }
    }
</script>

<style>
    .sphinx {
        background-image: url('/images/sphinx-background.jpg');
        background-size: cover;
        background-position: center;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        text-align: center;
    }

    .sphinx-content {
        background: rgba(0, 0, 0, 0.7);
        padding: 20px;
        border-radius: 10px;
        max-width: 600px;
    }

    input {
        margin-top: 20px;
        padding: 10px;
        font-size: 16px;
        width: 100%;
    }

    button {
        margin-top: 20px;
        padding: 15px 30px;
        font-size: 20px;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border: 2px solid white;
        border-radius: 5px;
        font-family: 'BroncoPersonalUse', sans-serif;
    }
</style>

<div class="sphinx">
    <div class="sphinx-content">
        <h1>Enigma da Esfinge</h1>
        <p>Resolva o enigma para prosseguir:</p>
        <p>O que é, o que é? Quanto mais você tira, maior ele fica?</p>
        <input type="text" bind:value={answer} placeholder="Sua resposta..." />
        <button on:click={checkAnswer}>Responder</button>
    </div>
</div>