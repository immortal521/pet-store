<template>
    <a-table
        :columns="columns"
        :data-source="data"
        :row-key="(record) => record.orderId"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
    >
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'operation'">
                <a-button
                    type="primary"
                    size="small"
                    style="margin-right: 10px"
                    :disabled="record.orderStatus == '已完成'"
                    >支付</a-button
                >
                <a-popconfirm
                    title="确认删除？"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteOrder(record)"
                >
                    <a-button type="primary" danger size="small">删除</a-button>
                </a-popconfirm>
            </template>
        </template>
    </a-table>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import httpService from "@/utils/http.service.js";
import { useUserStoreHook } from "@/stores/modules/user";
const current = ref(1);
const total = ref(20);
const pagination = computed(() => ({
    // 分页功能配置
    total: total.value,
    current: current.value,
    position: ["bottomCenter"],
    pageSize: 5, // 每页显示的数据条数
    showSizeChanger: false, // 每页显示的数据条数是否可编辑
    pageSizeOptions: ["10", "20", "50", "100"], // 每页显示的数据条数的可选值
    showTotal: (total) => `共有${total}数据`, // 分页中一共有多少条数据
}));

onMounted(async () => {
    await getPageData();
});

const handleTableChange = async (pag) => {
    current.value = pag.current;
    await getPageData();
};
const columns = [
    {
        title: "订单号",
        dataIndex: "orderId",
        key: "orderId",
    },
    {
        title: "宠物名称",
        dataIndex: "petName",
        key: "petName",
    },
    {
        title: "订单价格",
        dataIndex: "petPrice",
        key: "petPrice",
    },
    {
        title: "订单时间",
        key: "orderCreateDate",
        dataIndex: "orderCreateDate",
    },
    {
        title: "订单状态",
        key: "orderStatus",
        dataIndex: "orderStatus",
    },
    {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 200,
    },
];

const orderStatus = ["已完成", "待完成", "已取消"];
const loading = ref(true);
const userId = useUserStoreHook().$state.userId;
async function getPageData() {
    loading.value = true;
    const result = await httpService.get("/pet/getOrders", {
        params: {
            userId: userId,
            page: current.value,
            pageSize: 5,
        },
    });
    if (result.code === 200) {
        data.value = result.data.data;
        total.value = result.data.total;
        loading.value = false;
    }
    for (let i = 0; i < data.value.length; i++) {
        data.value[i].petPrice = data.value[i].petPrice.toFixed(2) + " RMB";
        data.value[i].orderStatus = orderStatus[data.value[i].orderStatus];
    }
}

const data = ref([]);

async function deleteOrder(record) {
    console.log(record);
    const headers = {
        token: localStorage.token,
    };

    const deleteResult = await httpService.delete("/pet/deleteOrder", {
        params: {
            userId: useUserStoreHook().$state.userId,
            orderId: record.orderId,
        },
        headers: headers,
    });
    if ((data.value.length - 1) % 5 == 0 && current.value != 1) {
        current.value -= 1;
    }

    if (deleteResult.code == 200) {
        await getPageData();
    }
}
</script>
