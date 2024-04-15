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

const petType = ref("cat");
watch(
    () => route.params.petType,
    (e) => {
        petType.value = e;
    }
);
const petsList = ref([]);
// let res = await httpService.get("/petProduct/list");

petsList.value = [
    {
        id: 10,
        name: "1cat",
        price: 1.234,
    },
    {
        id: 9,
        name: "2cat",
        price: 1.234,
    },
    {
        id: 8,
        name: "3cat",
        price: 1.234,
    },
    {
        id: 7,
        name: "4cat",
        price: 1.234,
    },
    {
        id: 6,
        name: "5cat",
        price: 1.234,
    },
    {
        id: 5,
        name: "1cat",
        price: 1.234,
    },
    {
        id: 4,
        name: "2cat",
        price: 1.234,
    },
    {
        id: 3,
        name: "3cat",
        price: 1.234,
    },
    {
        id: 2,
        name: "4cat",
        price: 1.234,
    },
    {
        id: 1,
        name: "5cat",
        price: 1.234,
    },
];
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
