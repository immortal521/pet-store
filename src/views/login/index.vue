<template>
    <div class="container">
        <aside class="aside">
            <div class="logo">
                <i
                    class="iconfont icon-cat"
                    style="font-size: 2rem; margin-right: 15px"
                ></i>
                <span style="display: block">Pet Store</span>
            </div>
            <div class="welcome">
                <div>WE</div>
                <div>LOVE</div>
                <div>Pet</div>
            </div>
        </aside>
        <header class="title">
            <form @submit.prevent="login" class="login">
                <div class="login-title">Login</div>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    autocomplete="username"
                    v-model="formData.username"
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    v-model="formData.password"
                />
                <div class="btn-container">
                    <input type="submit" value="Login" id="login" class="btn" />
                    <div class="btn">Register</div>
                </div>
            </form>
        </header>
    </div>
</template>

<script setup>
import { ref } from "vue";
const formData = ref({
    username: "",
    password: "",
});
function login() {
    console.log(formData.value);
}
</script>

<style scoped>
.container {
    color: #fff;
    display: flex;
    position: relative;
    left: 50%;
    top: 50%;
    animation: card-show 0.5s ease-out;
    transform: translate(-50%, -50%);
    width: 75%;
    height: 60%;
    min-height: 440px;
    border: 3px solid #ffffff70;
    border-radius: 20px;
    background-color: #00000060;
}

@keyframes card-show {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
    }
    100% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

.aside {
    text-align: center;
    width: 50%;
}

.logo {
    display: flex;
    position: absolute;
    line-height: 1.725;
    font-size: clamp(1.725rem, 1.725vw, 2.625vw);
    top: 2vh;
    left: 2vw;
    font-weight: bold;
}

.logo > i {
    line-height: 1.725;
    font-size: clamp(1.725rem, 1.725vw, 2.625vw) !important;
}

.welcome {
    font-weight: bold;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 30%;
    margin: auto;
    line-height: 1.725;
    font-size: clamp(1.725rem, 1.725vw, 2.625vw);
}

.welcome > div:nth-child(odd) {
    line-height: 5;
}

.welcome > div:nth-child(even) {
    border-radius: 10px;
    border: 5px solid #fff;
}
.title {
    display: flex;
    padding: 40px;
    width: 50%;
    text-align: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-weight: bolder;
}

@media (max-width: 1080px) {
    .aside {
        width: 0;
        display: none;
    }
    .title {
        width: 100%;
    }
}

.login {
    width: 90%;
}

.login > input[type="text"],
.login > input[type="password"] {
    width: 100%;
    padding: 10px 10px 10px 20px;
    border-radius: 10px;
    border: none;
    outline: none;
    color: rgb(0, 0, 0);
    max-width: 260px;
    margin-bottom: 2vh;
    font-size: 16px;
    color: #7597ff;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
    color: #7597ff9f;
}

.btn-container {
    display: flex;
    justify-content: center;
}

.login-title {
    font-size: clamp(2rem, 2vw, 3vw);
    color: #fff;
    margin-bottom: 30px;
    text-shadow: 0 0 10px #ff9dff80;
}

.btn {
    cursor: pointer;
    width: 120px;
    height: 40px;
    line-height: 35px;
    /* background: darkorchid; */
    background: transparent;
    border: 2px solid #fff;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: normal;
    color: #fff;
    margin: 10px;
    box-shadow: 0 0 2px #000;
}

.btn:hover {
    box-shadow: none;
    border: 2px solid #ffffff90;
    color: #ffffff90;
}
</style>
