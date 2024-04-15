<template>
    <div class="container">
        <div class="main">
            <PetCard
                v-for="item in petsList"
                :key="item.id"
                :pet-id="item.id"
                :pet-name="item.name"
                :price="item.price"
                :pet-type="petType"
            ></PetCard>
        </div>
    </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import httpService from "@/utils/http.service";
import PetCard from "./components/petCard/index.vue";

const route = useRoute();
const petsList = ref([]);
const petType = ref("cat");
watch(
    () => route.params.petType,
    async (e) => {
        petType.value = e;
    }
);

// let res = await httpService.get("/petProduct/list");

</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}
.main {
    justify-content: start;
    align-content: start;
    width: 100%;
    height: 100%;
    display: flex;
    overflow-y: scroll;
    flex-wrap: wrap;
}

.main::-webkit-scrollbar {
    width: 0;
}
</style>
