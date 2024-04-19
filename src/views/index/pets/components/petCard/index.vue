<template>
    <div class="pet-card">
        <RouterLink :to="path" class="container">
            <div class="image">
                <img :src="props.petImg" alt="1" />
            </div>
            <footer class="info">
                <div style="font-size: 20px; text-align: center">
                    <span>{{ props.petName }}</span>
                </div>
                <div style="color: red; text-align: end; margin-right: 20px">
                    <span>{{ "￥" + props.price }}</span>
                </div>
            </footer>
        </RouterLink>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
    petImg: {
        type: String,
        default: "",
    },
    petName: {
        type: String,
        default: "1",
    },
    price: {
        type: Number,
        default: 0.0,
    },
    petId: {
        type: Number,
        default: 1,
    },
    petType: {
        type: String,
        default: "",
    },
});

const path = ref("/petInfo/" + props.petId);
</script>

<style scoped>
.pet-card {
    max-width: 250px;
    max-height: 300px;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 1px solid #3e3e3e;
    box-shadow: 0 0 2px #3e3e3e, 0 0 5px #3e3e3e80;
    overflow: hidden;
    transition: 0.5s;
    animation: card-show 0.5s linear;
    margin: 20px;
}

.pet-card:hover {
    border: 1px solid #5590ff;
    box-shadow: 0 0 2px #5590ff, 0 0 5px #5590ff80;
    transform: scale(1.03);
}

.container {
    display: block;
    width: 100%;
    height: inherit;
    display: flex;
    flex-direction: column;
    color: #000;
    text-decoration: none;
}

.image {
    display: flex;
    height: 80%;
    justify-content: center;
    align-items: center;
}

.image > img {
    height: 100%;
}

.info {
    padding: 5px;
    height: 20%;
}

@keyframes card-show {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
