<template>
    <div class="good-card">
        <RouterLink :to="path" class="container">
            <div class="image">
                <img :src="props.goodImg" alt="1" />
            </div>
            <footer class="info">
                <div
                    style="
                        font-size: 20px;
                        text-align: center;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        white-space: nowrap;
                    "
                >
                    <span>{{ props.goodName }}</span>
                </div>
                <div
                    style="color: #ffaaff; text-align: end; margin-right: 20px"
                >
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
    goodImg: {
        type: String,
        default: "",
    },
    goodName: {
        type: String,
        default: "1",
    },
    price: {
        type: Number,
        default: 0.0,
    },
    goodId: {
        type: Number,
        default: 1,
    },
});

const path = ref("/goodInfo/" + props.goodId);
</script>

<style scoped>
.good-card {
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

.good-card:hover {
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
