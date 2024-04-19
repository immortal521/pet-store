<template>
    <div class="container">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
            <a-menu-item key="petOrder" @click="page = 1">宠物订单</a-menu-item>
            <a-menu-item key="goodOrder" @click="page = 2"
                >商品订单</a-menu-item
            >
            <a-menu-item key="boardOrder" @click="page = 3"
                >寄养订单</a-menu-item
            >
        </a-menu>
        <div class="main">
            <PetOrder v-if="page === 1"></PetOrder>
            <GoodOrder v-if="page === 2"></GoodOrder>
            <BoardOrder v-if="page === 3"></BoardOrder>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import PetOrder from "./components/petOrder.vue";
import GoodOrder from "./components/goodOrder.vue";
import BoardOrder from "./components/boardOrder.vue";
const current = ref(["petOrder"]);
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
