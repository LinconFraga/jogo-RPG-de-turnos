<script lang="ts">
</script>

<style>
    .main-menu {
        background-image: url('/images/background.jpg');
        background-size: cover;
        background-position: center;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: relative;
    }

    .title {
        font-family: 'OldLondon', serif;
        font-size: 112px;
        margin: 5%;
        color: rgb(243, 227, 206);
        text-shadow: 3px 3px 5px #ee2424;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    button, a {
        margin: 10px;
        padding: 15px 30px;
        font-size: 20px;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border: 2px solid white;
        border-radius: 5px;
        font-family: 'BroncoPersonalUse', sans-serif;
        text-decoration: none;
    }
</style>

<div class="main-menu">
    <h1 class="title">Zatmênia</h1>
    <div class="buttons">
        <a href="/story">Jogar</a>
        <a href="/about">Sobre</a>
    </div>
</div>