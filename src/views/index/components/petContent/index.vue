<template>
    <div class="content">
        <RouterView></RouterView>
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
.content {
    width: 100%;
    height: 100%;
    padding: 20px;
    /* background-color: red; */
}
</style>
