<template>
    <div class="container">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
            <a-menu-item key="newBoard" @click="page = 1">新增寄养</a-menu-item>
            <!-- <a-menu-item key="renewalBoard" @click="page = 2"
                >寄养续期</a-menu-item
            > -->
        </a-menu>
        <div class="main">
            <NewBoard v-if="page === 1"></NewBoard>
            <!-- <RenewalBoard v-if="page === 2"></RenewalBoard> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import NewBoard from "./components/newBoard.vue"
// import RenewalBoard from "./components/renewalBoard.vue"
const current = ref(["newBoard"]);
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
