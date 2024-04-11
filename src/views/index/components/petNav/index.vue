<template>
    <nav class="nav">
        <div class="content">
            <PetLogo style="flex-grow: 1"></PetLogo>
            <div class="user">
                <PetUser></PetUser>
            </div>
        </div>
    </nav>
</template>

<script setup>
import PetLogo from "@/components/petLogo/index.vue";
import PetUser from "@/components/petUser/index.vue";
</script>

<style scoped>
.nav {
    position: fixed;
    display: flex;
    justify-content: center;
    z-index: 10000;
    width: 100%;
    height: 50px;
    box-shadow: 0 2px 2px #000;
    margin-left: auto;
}

.content {
    display: flex;
    width: 100%;
    max-width: 1200px;
    align-items: center;
    height: inherit;
    justify-content: center;
    padding: 0 10px 0 10px;
}

.user {
    display: flex;
    height: inherit;
}
</style>
