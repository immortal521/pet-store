<template>
    <div class="container">
        <div class="main">
            <PetCard
                v-for="item in petsList"
                :key="item.petId"
                :pet-id="item.petId"
                :pet-name="item.petName"
                :price="item.petPrice"
                :pet-type="petType"
                :pet-img="item.petImageUrl"
            ></PetCard>
        </div>
    </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import httpService from "@/utils/http.service";
import PetCard from "./components/petCard/index.vue";

const route = useRoute();
const petsList = ref([]);
const petTypes = { dog: "1", cat: "2", another: "3" };
const petType = ref("1");
watch(
    () => route.params.petType,
    async (e) => {
        petType.value = petTypes[e];
        const result = await httpService.get("/pet/getList", {
            params: {
                petType: petType.value,
            },
        });
        if (result.code == 200) {
            petsList.value = result.data;
        }
    },
    {
        immediate: true,
    }
);

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
