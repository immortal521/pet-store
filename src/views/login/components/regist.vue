<template>
    <form @submit.prevent="register" class="regist">
        <div class="login-title">Register</div>
        <input
            name="username"
            type="text"
            placeholder="Username"
            autocomplete="username"
            v-model="registForm.username"
        />

        <input
            type="password"
            placeholder="Password"
            name="password"
            v-model="registForm.firstPassword"
        />
        <input
            type="password"
            placeholder="Password again"
            name="password"
            v-model="registForm.secondPassword"
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
            v-model="registForm.phone"
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
            <input type="submit" value="Register" id="Register" class="btn" />
            <div class="btn" @click="useUserStoreHook().SET_CURRENTPAGE(0)">
                back
            </div>
        </div>
    </form>
    <PetDialog width="200" v-model="registDialog">
        {{ registerInfo }}
    </PetDialog>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStoreHook } from "@/stores/modules/user";
import { checkForm, formToEmpty } from "../utils/formUtils";
import PetDialog from "@/components/petDialog/index.vue";
import { encryptPassword } from "../utils/pwdUtils";
import { checkPassword } from "../utils/rule";

const registForm = ref({
    username: "",
    firstPassword: "",
    secondPassword: "",
    phone: "",
});

const inputError = computed(() => {
    return (
        checkPassword(registForm.value.firstPassword) ||
        checkPassword(registForm.value.secondPassword)
    );
});

const registDialog = ref(false);

const passwordIsSame = computed(() => {
    return registForm.value.firstPassword === registForm.value.secondPassword;
});

const registerInfo = ref("");

async function register() {
    if (!passwordIsSame.value || checkForm(registForm.value)) {
        inputError.value = true;
        return;
    }
    const newUser = {
        userName: registForm.value.username,
        password: encryptPassword(registForm.value.firstPassword),
        phoneNumber: registForm.value.phone,
    };
    const result = await useUserStoreHook().registByUserName(newUser);
    if (result.code == 200) {
        registerInfo.value = "注册成功";
        registDialog.value = true;
        formToEmpty(registForm.value);
    } else {
        registerInfo.value = result.msg;
        registDialog.value = true;
    }
}
</script>

<style scoped>
.regist {
    width: 100%;
}

.regist > input[type="text"],
.regist > input[type="password"] {
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
