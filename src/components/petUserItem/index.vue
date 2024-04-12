<template>
    <li class="item">
        <div class="container">
            <slot></slot>
        </div>
    </li>
</template>

<script setup></script>

<style scoped>
.item {
    width: 140px;
    margin-bottom: 2px;
}

.container {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    text-align: center;
    font-size: 13px;
    cursor: pointer;
    line-height: 30px;
    background: #e6f4ff;
}

.container:hover {
    background: #c0e4ff;
}
</style>
