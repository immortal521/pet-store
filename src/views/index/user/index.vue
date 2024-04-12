<template>
    <div class="container">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
            <a-menu-item key="userInfo" @click="page = 1">个人信息</a-menu-item>
            <a-menu-item key="accountMannger" @click="page = 2"
                >账号管理</a-menu-item
            >
        </a-menu>
        <div class="main">
            <UserInfo v-if="page === 1"></UserInfo>
            <AccountMannger v-if="page === 2"></AccountMannger>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import AccountMannger from "./components/accountMannger.vue";
import UserInfo from "./components/userInfo.vue";
const current = ref(["userInfo"]);
const page = ref(1);
</script>

<style scoped>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.main {
    position: relative;
    padding: 15px;
    width: 100%;
    height: 100%;
}
</style>
