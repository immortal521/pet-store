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
            <form
                @submit.prevent="login"
                class="login"
                v-if="currentPage === 0"
            >
                <div class="login-title">Login</div>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    autocomplete="username"
                    v-model="loginForm.username"
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    v-model="loginForm.password"
                    @change="inputError = checkPassword(loginForm.password)"
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
                    <div
                        class="btn"
                        @click="useUserStoreHook().SET_CURRENTPAGE(1)"
                    >
                        Register
                    </div>
                </div>
            </form>
            <Regist v-if="currentPage === 1"> </Regist>
        </div>
    </div>
    <PetDialog width="200" v-model="loginDialog">{{ loginError }}</PetDialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStoreHook } from "@/stores/modules/user";
import Regist from "./components/regist.vue";
import { checkPassword } from "./utils/rule";
import router from "@/router/index.js";
import { checkForm } from "./utils/formUtils";
import PetDialog from "@/components/PetDialog/index.vue";
import { encryptPassword } from "./utils/pwdUtils";

/**
 * 表单接收数据
 */
const loginForm = ref({
    username: "",
    password: "",
});

const inputError = ref(false);

/**
 * 登录
 */
async function login() {
    if (inputError.value || checkForm(loginForm.value)) {
        inputError.value = true;
        return;
    }

    const user = {
        userName: loginForm.value.username,
        password: encryptPassword(loginForm.value.password),
    };

    const result = await useUserStoreHook().loginByUserName(user);

    if (result.code == 200) {
        localStorage.token = result.data;
        router.push("/goods");
    } else {
        loginError.value = result.msg;
        loginDialog.value = true;
    }
}

const loginDialog = ref(false);
const loginError = ref("");

const currentPage = computed(() => {
    return useUserStoreHook().currentPage;
});
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
