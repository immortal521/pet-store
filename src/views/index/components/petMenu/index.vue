<template>
    <div class="menu" :class="{ closeMenu: collapsed }">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="light"
            mode="inline"
            style="border-inline-end: none"
            :inline-collapsed="collapsed"
        >
            <a-menu-item key="1">
                <PieChartOutlined />
                <span><RouterLink to="/index">首页</RouterLink></span>
            </a-menu-item>
            <a-sub-menu key="sub1">
                <template #title>
                    <span>
                        <UserOutlined />
                        <span>宠物</span>
                    </span>
                </template>
                <a-menu-item key="2"
                    ><RouterLink to="/pets/cat">猫</RouterLink></a-menu-item
                >
                <a-menu-item key="3"
                    ><RouterLink to="/pets/dog">狗</RouterLink></a-menu-item
                >
                <a-menu-item key="4"
                    ><RouterLink to="/pets/another"
                        >其他</RouterLink
                    ></a-menu-item
                >
            </a-sub-menu>
            <a-menu-item key="5">
                <DesktopOutlined />
                <span><RouterLink to="/petGoods">宠物用品</RouterLink></span>
            </a-menu-item>
            <a-menu-item key="6">
                <FileOutlined />
                <span>寄养</span>
            </a-menu-item>
            <a-menu-item key="7">
                <FileOutlined />
                <span>订单</span>
            </a-menu-item>
        </a-menu>
        <div class="openMenu" @click="toggleCollapsed">
            <CaretRightOutlined v-if="collapsed" />
            <CaretLeftOutlined v-else />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    FileOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
} from "@ant-design/icons-vue";
import { RouterLink } from "vue-router";

const selectedKeys = ref(["1"]);
const collapsed = ref(false);
function toggleCollapsed() {
    collapsed.value = !collapsed.value;
}

const route = ref(useRoute());

const page = {
    index: "1",
    cat: "2",
    dog: "3",
    another: "4",
    petGoods: "5",
};

watch(
    () => route.value.fullPath,
    (e) => {
        const parts = e.split("/");
        const lastPart = parts[parts.length - 1];
        selectedKeys.value[0] = page[lastPart];
    },
    { immediate: true }
);
</script>

<style scoped>
.menu {
    position: relative;
    height: 100%;
    width: 256px;
    padding: 5px 5px 0 5px;
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
    overflow-y: scroll;
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
}

.menu::-webkit-scrollbar {
    width: 0;
}

.openMenu {
    position: relative;
    width: calc(100% - 6px);
    margin: auto;
    background-color: #e6f4ff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
}

.closeMenu {
    width: 90px;
}
</style>
