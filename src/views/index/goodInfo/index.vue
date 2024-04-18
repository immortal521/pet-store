<template>
    <div class="spin" v-if="isSpin">
        <a-spin size="large" />
    </div>
    <div class="container" v-else>
        <div class="info">
            <div class="image">
                <a-image :width="300" :src="goodInfo.goodImageUrl" />
            </div>
            <div class="description">
                <div class="title">
                    <div>商品名称</div>
                    <div>宠物价格</div>
                </div>
                <div class="content">
                    <div>{{ goodInfo.goodName }}</div>
                    <div>{{ goodInfo.goodPrice }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import httpService from "@/utils/http.service.js";
import { useRoute } from "vue-router";
const route = useRoute();
const isSpin = ref(true);
const goodInfo = ref({});
const goodId = ref(0);

watch(
    () => route.params.id,
    (e) => {
        goodId.value = e;
    },
    {
        immediate: true,
    }
);

onMounted(() => {
    getGoodInfo();
});

async function getGoodInfo() {
    const result = await httpService.get("/good/getInfo", {
        params: { goodId: goodId.value },
    });

    if (result.code == 200) {
        goodInfo.value = result.data;
        isSpin.value = false;
        goodInfo.value.goodPrice = Number(goodInfo.value.goodPrice).toFixed(2);
    }
}
</script>

<style scoped>
.spin {
    text-align: center;
    padding: 100px;
    width: 100%;
    height: 100%;
}

.container {
    width: 100%;
    height: 100%;
    padding: 20px;
}

.info {
    display: flex;
    width: 100%;
    height: 300px;
}

.description {
    width: calc(100% - 300px);
    display: flex;
    padding: 20px;
    padding-left: 100px;
}

.description > .title {
    width: 15%;
    font-size: 20px;
    color: #000;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.description > .content {
    width: 85%;
    font-size: 16px;
    color: #000;
    display: flex;
    padding-left: 50px;
    color: #33333399;
    flex-direction: column;
    justify-content: space-around;
}

.image {
    width: 300px;
    height: 300px;
    border-radius: 10px;
    border: 1px solid #000;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-content: center;
}
</style>
