<template>
    <div class="dialog" :style="{ width: width + 'px' }" v-if="DialogVisible">
        <header class="title">
            <h1>{{ title }}</h1>
        </header>
        <slot></slot>
        <div class="btn-container">
            <div class="btn" @click="exitDialog">取消</div>
            <div class="btn" @click="confirm">确定</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    width: {
        type: String,
        default: "400",
    },
    title: {
        type: String,
        default: "",
    },
    callback: {
        type: Function,
        default: () => {
            return;
        },
    },
});

const DialogVisible = defineModel();
function confirm() {
    DialogVisible.value = false;
    props.callback();
}
function exitDialog() {
    DialogVisible.value = false;
}
</script>

<style scoped>
.dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 200px;
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    padding: 10px;
}

.title {
    text-align: center;
    width: 100%;
}

.btn-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 100%;
    justify-content: end;
}

.btn {
    cursor: pointer;
    border: 2px #79a9ff solid;
    border-radius: 5px;
    width: 77px;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    margin: 20px;
}

.btn-container > .btn:nth-child(1):hover {
    background-color: #ecf5ff;
    color: #79a9ff;
}

.btn-container > .btn:nth-child(2) {
    background-color: #79a9ff;
    color: #fff;
}

.btn-container > .btn:nth-child(2):hover {
    background-color: #79bbff;
}
</style>
