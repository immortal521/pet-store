<template>
    <div class="user">
        <a-popover placement="topRight">
            <template #content>
                <ul style="list-style: none">
                    <slot></slot>
                </ul>
            </template>
            <div class="head-image">
                <img
                    :src="userAvatar"
                    alt="1"
                    v-if="existAvatar"
                    style="
                        object-fit: cover;
                        float: right;
                        width: 100%;
                        height: 100%;
                    "
                />
                <UserOutlined v-else />
            </div>
        </a-popover>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
const props = defineProps({
    userAvatar: {
        type: String,
        default: "",
    },
});

const existAvatar = computed(() => {
    return (
        props.userAvatar !== "" &&
        typeof props.userAvatar !== "undefined" &&
        props.userAvatar !== "null"
    );
});
</script>

<style scoped>
.head-image {
    width: 44px;
    height: 44px;
    background-color: rgba(5, 5, 5, 0.2);
    margin: auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-self: center;
    overflow: hidden;
    cursor: pointer;
    line-height: 46px;
    font-size: 46px;
    box-shadow: 0 0 6px rgba(5, 5, 5, 0.6);
}
</style>
