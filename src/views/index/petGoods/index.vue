<template>
    <div class="container">
        <div class="main">
            <GoodCard
                v-for="item in goodsList"
                :key="item.goodId"
                :good-id="item.goodId"
                :good-name="item.goodName"
                :price="item.goodPrice"
                :good-img="item.goodImageUrl"
            ></GoodCard>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import httpService from "@/utils/http.service";
import GoodCard from "./components/goodCard/index.vue";
const goodsList = ref([]);

onMounted(async () => {
    await getGoodList();
});

async function getGoodList() {
    const result = await httpService.get("/good/getList");
    if (result.code == 200) {
        goodsList.value = result.data;
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}
.main {
    justify-content: start;
    align-content: start;
    width: 100%;
    height: 100%;
    display: flex;
    overflow-y: scroll;
    flex-wrap: wrap;
}

.main::-webkit-scrollbar {
    width: 0;
}
</style>
