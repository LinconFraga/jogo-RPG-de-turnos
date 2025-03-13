<script lang="ts">
    import { writable } from 'svelte/store';

    const activeSection = writable('');

    function goBack() {
        window.location.href = '/'; // Redireciona para a tela inicial
    }
</script>

<div class="about">
    <div class="about-content">
        <img src="/images/if.PNG" alt="Logotipo" class="logo" /> <!-- imagem do logotipo aqui -->
        
        <h1>Sobre o Jogo</h1>

        <div class="button-group">
            <button on:click={() => activeSection.set('professor')}>Professor</button>
            <button on:click={() => activeSection.set('integrantes')}>Integrantes</button>
            <button on:click={() => activeSection.set('uso_ia')}>Uso da IA</button>
        </div>

        {#if $activeSection === 'professor'}
            <div class="info-box">
                <h4>PROFESSOR</h4>
                <h5>Allan Diego Silva Lima | allan.lima@igarassu.ifpe.edu.br</h5>
            </div>
        {/if}
        {#if $activeSection === 'integrantes'}
            <div class="info-box">
                <ul class="no-bullets">
                    <h4>INTEGRANTES</h4>
                    <h5>Lincon Fraga | labf@discente.ifpe.edu.br</h5>
                    <h5>Mikaias Marinho | mms59@discente.ifpe.edu.br</h5>
                    <h5>Gabriel Luna | glr3@discente.ifpe.edu.br</h5>
                    <h5>Lucas Cavalcanti | lcod@discente.ifpe.edu.br</h5>
                    <h5>Karolayne Firmino | kfsl@discente.ifpe.edu.br</h5>
                </ul>
            </div>
        {/if}
        {#if $activeSection === 'uso_ia'}
            <div class="info-box">
                <h4>USO DA IA</h4>
                <h5> Destinada ao apoio à criação da lógica dos códigos, ao aprendizado sobre
                     o funcionamento dos mesmos, para facilitar sua leitura e a realização
                      das adaptações necessárias para a criação do estilo do jogo tal
                       como idealizado; criação das imagens usadas no plano de fundo
                        e nos sprites. Foram usadas mais de uma inteligência artificial 
                        no projeto, sendo as principais o Claude, para os códigos, e o 
                        Microsoft Designer, para as imagens.
                </h5>
            </div>
        {/if}
    </div>

    <div class="button-back">
        <button on:click={goBack}>Voltar</button>
    </div>
</div>

<svelte:head>
    <link rel="stylesheet" href="/about.css">
</svelte:head>
