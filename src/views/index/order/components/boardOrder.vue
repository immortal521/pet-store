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
                    :disabled="
                        record.boardStatus == '寄养中' ||
                        record.boardStatus == '已逾期'
                    "
                    @click="completeTheOrder(record)"
                    >支付</a-button
                >
                <a-popconfirm
                    title="删除订单？"
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
const total = ref(0);
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
        dataIndex: "boardId",
        key: "boardId",
    },
    {
        title: "宠物名称",
        dataIndex: "petName",
        key: "petName",
    },
    {
        title: "订单开始时间",
        dataIndex: "boardStartDate",
        key: "boardStartDate",
    },
    {
        title: "订单结束时间",
        key: "boardEndDate",
        dataIndex: "boardEndDate",
    },
    {
        title: "订单总额",
        key: "boardFee",
        dataIndex: "boardFee",
    },
    {
        title: "订单创建时间",
        key: "boardCreateDate",
        dataIndex: "boardCreateDate",
    },
    {
        title: "订单状态",
        key: "boardStatus",
        dataIndex: "boardStatus",
    },
    {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 200,
    },
];

const boardStatus = ["未支付", "寄养中", "已逾期"];
const loading = ref(true);
const userId = useUserStoreHook().$state.userId;
async function getPageData() {
    loading.value = true;
    const result = await httpService.get("/board/getOrders", {
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
        data.value[i].boardFee = data.value[i].boardFee.toFixed(2) + " RMB";
        data.value[i].boardStatus = boardStatus[data.value[i].boardStatus];
    }

}

const data = ref([]);
const headers = {
    token: localStorage.token,
};

async function deleteOrder(record) {
    const deleteResult = await httpService.delete("/board/deleteBoard", {
        params: {
            userId: useUserStoreHook().$state.userId,
            boardId: record.boardId,
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

async function completeTheOrder(record) {
    const data = {
        boardId: record.boardId,
        boardStatus: "1",
    };
    const config = {
        headers: headers,
    };
    const updateResult = await httpService.put(
        "/board/updateBoardStatus",
        data,
        config
    );
    if (updateResult.code == 200) {
        record.boardStatus = "寄养中";
    }
}
</script>
