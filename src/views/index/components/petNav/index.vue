<template>
    <nav class="nav">
        <div class="content">
            <PetLogo style="flex-grow: 1"></PetLogo>
            <div class="user">
                <PetUser :userAvatar="user.userAvatar">
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
    localStorage.clear();
    router.push("/login");
}

const user = useUserStoreHook().$state;
</script>

<style scoped>
.nav {
    position: fixed;
    display: flex;
    justify-content: center;
    z-index: 1000;
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
