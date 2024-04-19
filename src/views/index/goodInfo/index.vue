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
        <div class="control">
            <a-modal v-model:open="modalOpened" title="确认订单" :footer="null">
                <a-descriptions bordered :column="2">
                    <a-descriptions-item label="商品名称">{{
                        goodInfo.goodName
                    }}</a-descriptions-item>
                    <a-descriptions-item label="商品单价">{{
                        goodInfo.goodPrice
                    }}</a-descriptions-item>
                    <a-descriptions-item label="商品数量">{{
                        goodsNumber
                    }}</a-descriptions-item>
                    <a-descriptions-item label="商品总价">{{
                        (goodInfo.goodPrice * goodsNumber).toFixed(2) + " RMB"
                    }}</a-descriptions-item>
                </a-descriptions>
                <div
                    style="
                        display: flex;
                        justify-content: space-around;
                        padding: 30px 20px 10px 20px;
                    "
                >
                    <a-button @click="modalOpened = false">取消</a-button>
                    <a-popconfirm
                        title="确认购买?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="createOrder"
                    >
                        <a-button type="primary">购买</a-button>
                    </a-popconfirm>
                </div>
            </a-modal>
            <a-input-number
                v-model:value="goodsNumber"
                size="large"
                :min="1"
                :max="100000"
                style="position: relative; left: -150px"
                @change="console.log(typeof goodInfo.goodPrice)"
            />
            <a-button type="primary" @click="modalOpened = true" size="large"
                >购买</a-button
            >
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

const goodsNumber = ref(1);

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

const modalOpened = ref(false);

// 未修改
async function createOrder() {
    const config = {
        headers: {
            token: localStorage.token,
        },
    };
    const data = {
        userId: useUserStoreHook().$state.userId,
        petId: petId.value,
        orderPrice: petInfo.value.petPrice,
    };
    const result = await httpService.post("/pet/placeAnOrder", data, config);
    if (result.code === 200) {
        modalOpened.value = false;
        openNotificationWithIcon("info");
    }
}

const openNotificationWithIcon = (type) => {
    notification[type]({
        message: "订单创建成功",
        description: "订单未完成，前往订单页完成订单",
    });
};
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

.control {
    padding: 20px;
    display: flex;
    justify-content: center;
}
</style>
