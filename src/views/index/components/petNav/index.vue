<template>
    <nav class="nav">
        <div class="content">
            <PetLogo style="flex-grow: 1"></PetLogo>
            <div class="user">
                <PetUser :userAvatar="user.avatar">
                    <PetUserItem>
                        <RouterLink
                            to="/user"
                            style="display: block; color: #000"
                            >个人中心</RouterLink
                        >
                    </PetUserItem>
                    <PetUserItem>
                        <div @click="exitLogin">退出登录</div>
                    </PetUserItem>
                </PetUser>
            </div>
        </div>
    </nav>
</template>

<script setup>
import PetLogo from "@/components/petLogo/index.vue";
import PetUser from "@/components/petUser/index.vue";
import PetUserItem from "@/components/petUserItem/index.vue";
import { useUserStoreHook } from "@/stores/modules/user";
import { RouterLink } from "vue-router";
import router from "@/router/index.js";

function exitLogin() {
    localStorage.removeItem("token");
    router.push("/user");
}

useUserStoreHook().SET_USERAVATAR(
    "https://i.pximg.net/img-master/img/2024/04/15/00/00/43/117847824_p0_master1200.jpg"
);
useUserStoreHook().SET_USERNAME("123");

const user = {
    name: useUserStoreHook().$state.userName,
    avatar: useUserStoreHook().$state.userAvatar,
};

console.log(user);
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
