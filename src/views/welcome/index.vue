<template>
    <div class="container">
        <nav class="navication">
            <div class="logo">
                <i
                    class="iconfont icon-cat logo"
                    style="margin: 0 10px 0 5px"
                ></i>
                <span>Pet Store</span>
            </div>
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
</script>

<style scoped>
.container {
    background: #333;
    height: 100%;
    width: 100%;
    color: #fff;
    background: url("https://ts1.cn.mm.bing.net/th/id/R-C.d580bcb7ced548c5a9db94e3305eeed9?rik=s8GGOCgDekpjmw&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140228%2f1-14022QA425.jpg&ehk=l68Ph3CRJIESWQe6smUc%2fK4qv1ugsP8MTO0TvMQv5Ns%3d&risl=&pid=ImgRaw&r=0");
    background-position: center;
    background-repeat: no-repeat;
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

.logo {
    font-size: 1.5rem;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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

@keyframes card-show {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
