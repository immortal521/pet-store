<template>
    <div class="logo">
        <i class="iconfont icon-cat"></i>
        <span style="display: block">Pet Store</span>
    </div>
</template>

<script setup></script>

<style scoped>
.logo {
    display: flex;
    line-height: 1.725;
    font-size: clamp(1.5rem, 1.625vw, 2.225vw);
    font-weight: bold;
}

.logo > i {
    line-height: 1.725;
    margin-right: 10px;
    font-size: clamp(1.725rem, 1.725vw, 2.625vw) !important;
}
</style>
