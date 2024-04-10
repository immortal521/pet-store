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
        <div class="form-container">
            <form @submit.prevent="login" class="login" v-if="isLogining">
                <div class="login-title">Login</div>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    autocomplete="username"
                    v-model="loginData.username"
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    v-model="loginData.password"
                    @change="checkPassword(loginData.password)"
                />
                <span
                    v-if="inputError"
                    style="
                        color: red;
                        font-size: 12px;
                        display: block;
                        font-weight: normal;
                    "
                    >密码格式应为8-18位字母加数字或字符的组合</span
                >
                <div class="btn-container">
                    <input type="submit" value="Login" id="login" class="btn" />
                    <div class="btn" @click="toRegister">Register</div>
                </div>
            </form>
            <form @submit.prevent="register" class="login" v-if="!isLogining">
                <div class="login-title">Register</div>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    autocomplete="username"
                    v-model="registerData.username"
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    v-model="registerData.firstPassword"
                    @change="checkPassword(registerData.firstPassword)"
                />
                <input
                    type="password"
                    placeholder="Password again"
                    name="password"
                    v-model="registerData.secondPassword"
                    @change="
                        () => {
                            checkPassword(registerData.secondPassword);
                            checkPasswordIsSame();
                        }
                    "
                />
                <span
                    v-if="inputError"
                    style="
                        color: red;
                        font-size: 12px;
                        display: block;
                        font-weight: normal;
                    "
                    >密码格式应为8-18位字母加数字或字符的组合</span
                >

                <input
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    v-model="registerData.phone"
                />
                <span
                    v-if="!passwordIsSame"
                    style="
                        color: red;
                        font-size: 12px;
                        display: block;
                        font-weight: normal;
                    "
                    >两次密码不相同</span
                >

                <div class="btn-container">
                    <input
                        type="submit"
                        value="Register"
                        id="Register"
                        class="btn"
                    />
                    <div class="btn" @click="toLogin">back</div>
                </div>
            </form>
        </div>
    </div>
    <PetDialog width="200" v-model="DialogVisible"
        ><div style="text-align: center; padding: 20px">
            {{ registerInfo }}
        </div></PetDialog
    >
</template>

<script setup>
import { ref } from "vue";
import CryptoJS from "crypto-js";
import router from "@/router/index.js";
import httpService from "@/utils/http.service.js";
import PetDialog from "@/components/PetDialog/index.vue";
const DialogVisible = ref(false);

const isLogining = ref(true);

/**
 * 表单接收数据
 */
const loginData = ref({
    username: "",
    password: "",
});

const registerData = ref({
    username: "",
    firstPassword: "",
    secondPassword: "",
    phone: "",
});

/**
 * 密码格式错误判断
 */
const inputError = ref(false);
function checkPassword(password) {
    if (password == "" || typeof password == "undefined") {
        inputError.value = false;
        return;
    }
    // 匹配字母+数字或字母+字符或字母+数字+字符
    const regexp =
        /(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{8,18}/;
    if (regexp.test(password) == false) {
        inputError.value = true;
    } else {
        inputError.value = false;
    }
}

/**
 * 登录
 */
async function login() {
    if (
        inputError.value ||
        loginData.value.password == "" ||
        loginData.value.username == ""
    ) {
        inputError.value = true;
        return;
    }

    const user = {
        userName: loginData.value.username,
        password: encryptPassword(loginData.value.password),
    };
    const result = await httpService.post("/login", user);
    if (result.code == 200) {
        localStorage.token = result.data;
        router.push("/goods");
    }
}

const registerInfo = ref("");

async function register() {
    if (
        !passwordIsSame.value ||
        inputError.value ||
        registerData.value.firstPassword == "" ||
        registerData.value.username == "" ||
        registerData.value.secondPassword == "" ||
        registerData.value.phone == ""
    ) {
        inputError.value = true;
        return;
    }
    const newUser = {
        userName: registerData.value.username,
        password: encryptPassword(registerData.value.firstPassword),
        phone: registerData.value.phone,
    };
    const result = await httpService.post("/register", newUser);
    if (result.code == 200) {
        registerInfo.value = "注册成功";
        DialogVisible.value = true;
        toLogin();
    } else {
        registerInfo.value = result.msg;
        DialogVisible.value = true;
    }
}

/**
 * 密码加密函数
 * @param {*} password 密码
 */
function encryptPassword(password) {
    const hash = CryptoJS.SHA256(password);
    // 将密码转换为哈希值，并以十六进制编码输出
    const hashedPassword = hash.toString();
    return hashedPassword;
}

function toRegister() {
    isLogining.value = false;
    loginData.userName = "";
    loginData.password = "";
}

function toLogin() {
    isLogining.value = true;
    registerData.userName = "";
    registerData.phone = "";
    registerData.secondPassword = "";
    registerData.firstPassword = "";
    inputError.value = false;
}

const passwordIsSame = ref(true);
function checkPasswordIsSame() {
    passwordIsSame.value =
        registerData.value.firstPassword == registerData.value.secondPassword;
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
.form-container {
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
    .form-container {
        width: 100%;
    }
}

.login {
    width: 100%;
}

.login > input[type="text"],
.login > input[type="password"] {
    width: 100%;
    padding: 10px 10px 10px 20px;
    border-radius: 10px;
    border: none;
    outline: none;
    color: rgb(0, 0, 0);
    max-width: 300px;
    margin-top: 2vh;
    font-size: 16px;
    color: #7597ff;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
    color: #7597ff9f;
}

.btn-container {
    margin-top: 2vh;
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
