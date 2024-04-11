<template>
    <div class="container">
        <nav class="navication">
            <PetLogo></PetLogo>
        </nav>
        <div class="scoll-images"></div>

        <div class="welcome">
            <div>WE</div>
            <div style="border: 3px solid #fff">LOVE</div>
            <div>Pet</div>
            <div class="login-btn">
                <RouterLink to="/login">登录</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import PetLogo from "@/components/petLogo/index.vue";
</script>

<style scoped>
.container {
    height: 100%;
    width: 100%;
    color: #fff;
}

.container::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #00000030;
}

.navication {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    max-width: 1200px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px 0 10px;
}

.welcome {
    position: relative;
    margin: auto;
    top: 140px;
    width: 280px;
    text-align: center;
    font-size: 76px;
    animation: card-show 0.5s ease-out;
}

.login-btn {
    margin: auto;
    margin-top: 50px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
}

a:hover {
    border: 2px solid #ffffff99;
    color: #ffffff90;
}

a {
    display: block;
    text-decoration: none;
    color: #fff;
    border: 2px solid #fff;
}
</style>
