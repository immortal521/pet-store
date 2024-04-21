<template>
    <div class="container">
        <div class="main">
            <a-form
                :model="boardForm"
                autocomplete="off"
                size="large"
                layout="horizontal"
                labelAlign="right"
                :label-col="{ style: { width: '70px' } }"
            >
                <a-form-item
                    label="宠物名称"
                    name="petName"
                    style="width: 300px"
                >
                    <a-input
                        v-model:value="boardForm.petName"
                        placeholder="input pet name"
                    />
                </a-form-item>
                <a-form-item
                    label="宠物性别"
                    name="petSex"
                    style="width: 200px"
                >
                    <a-select
                        v-model:value="boardForm.petSex"
                        placeholder="select pet sex"
                        :options="options"
                    ></a-select>
                </a-form-item>
                <a-form-item
                    label="宠物体重"
                    name="petWeight"
                    style="width: 300px"
                >
                    <a-input
                        v-model:value="boardForm.petWeight"
                        placeholder="Input pet weight"
                        :max-length="25"
                        addon-after="kg"
                        @blur="onBlur"
                    />
                </a-form-item>
                <a-form-item label="寄养时间">
                    <a-range-picker
                        v-model:value="boardForm.boardDuringTime"
                        show-time
                        :inputReadOnly="true"
                        format="YYYY-MM-DD"
                        :disabled-date="disabledDate"
                        value-format="YYYY-MM-DD HH:mm:ss"
                    />
                </a-form-item>
                <a-form-item label="备注">
                    <a-textarea
                        v-model:value="boardForm.remark"
                        placeholder="input remark"
                        auto-size
                    />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" @click="modalOpened = true"
                        >提交订单</a-button
                    >
                </a-form-item>
            </a-form>
        </div>
        <a-modal v-model:open="modalOpened" title="确认订单" :footer="null">
            <a-descriptions bordered :column="2">
                <a-descriptions-item label="宠物名称">{{
                    boardForm.petName
                }}</a-descriptions-item>
                <a-descriptions-item label="宠物性别">{{
                    boardForm.petSex
                }}</a-descriptions-item>
                <a-descriptions-item label="宠物体重">{{
                    boardForm.petWeight
                }}</a-descriptions-item>
                <a-descriptions-item label="寄养价格">{{
                    "40.0￥/天"
                }}</a-descriptions-item>
                <a-descriptions-item label="寄养天数">{{
                    boardDays
                }}</a-descriptions-item>
                <a-descriptions-item label="寄养总价">{{
                    (boardDays * 40.0).toFixed(2) + "￥"
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
                    title="确认寄养?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="getOrder"
                >
                    <a-button type="primary">确认寄养</a-button>
                </a-popconfirm>
            </div>
        </a-modal>
    </div>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, watch, computed } from "vue";
import { useUserStoreHook } from "@/stores/modules/user.js";
import httpService from "@/utils/http.service";
import { notification } from "ant-design-vue";
const boardForm = ref({
    petName: "",
    petSex: "",
    petWeight: "",
    boardDuringTime: [],
    remark: "",
});

const options = [{ value: "公" }, { value: "母" }];

const format = (val, preVal) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(+val) && reg.test(val)) || val === "" || val === "-") {
        boardForm.value.petWeight = val;
    } else {
        boardForm.value.petWeight = preVal;
    }
};

const onBlur = () => {
    if (
        boardForm.value.petWeight.charAt(
            boardForm.value.petWeight.length - 1
        ) === "." ||
        boardForm.value.petWeight === "-"
    ) {
        format(
            boardForm.value.petWeight.slice(0, -1),
            boardForm.value.petWeight
        );
    }
};

watch(
    () => boardForm.value.petWeight,
    (val, preVal) => {
        format(val, preVal);
    }
);

async function getOrder() {
    const data = {
        userId: useUserStoreHook().$state.userId,
        petName: boardForm.value.petName,
        petSex: boardForm.value.petSex == "公" ? "0" : "1",
        petWeight: boardForm.value.petWeight,
        boardStartDate: boardForm.value.boardDuringTime[0],
        boardEndDate: boardForm.value.boardDuringTime[1],
        remark: boardForm.value.remark,
    };

    const config = {
        headers: {
            token: localStorage.token,
        },
    };

    const result = await httpService.post("/board/placeAnOrder", data, config);

    if (result.code == 200) {
        getOrderSuccess();
    } else {
        getOrderError();
    }
}

const getOrderSuccess = () => {
    notification["info"]({
        message: "订单创建成功",
        description: "订单未完成，前往订单页完成订单",
    });
};

const getOrderError = () => {
    notification["error"]({
        message: "订单创建失败",
        description: "请重新尝试",
    });
};

const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
};

const boardDays = computed(() => {
    if (
        boardForm.value.boardDuringTime == null ||
        boardForm.value.boardDuringTime.length == 0
    ) {
        return 0;
    }
    const start = dayjs(boardForm.value.boardDuringTime[0]);
    const end = dayjs(boardForm.value.boardDuringTime[1]);
    return end.diff(start, "day");
});

const modalOpened = ref(false);
</script>

<style scoped>
.container {
    text-align: center;
    width: 100%;
    height: 100%;
}

.main {
    width: 450px;
    height: 100%;
    margin: auto;
    padding: 30px;
}
</style>
