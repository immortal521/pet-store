<template>
    <div class="container">
        <PetNav></PetNav>
        <div class="main">
            <div class="menu">
                <PetMenu></PetMenu>
            </div>
            <PetContent> </PetContent>
        </div>
    </div>
</template>

<script setup>
import PetMenu from "./components/petMenu/index.vue";
import PetNav from "./components/petNav/index.vue";
import PetContent from "./components/petContent/index.vue";
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
}

.main {
    display: flex;
    position: relative;
    top: 50px;
    height: calc(100% - 50px);
}
</style>
