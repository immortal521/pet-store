import { createRouter, createWebHashHistory } from "vue-router";
import Welcome from "@/views/welcome/index.vue";
import Login from "@/views/login/index.vue";
import User from "@/views/index/user/index.vue";
import Index from "@/views/index/index.vue";
import PetGoods from "@/views/index/petGoods/index.vue";
import Pets from "@/views/index/pets/index.vue";
import PetInfo from "@/views/index/petInfo/index.vue";
import GoodInfo from "@/views/index/goodInfo/index.vue";
import { parseJwt } from "@/utils/jwt";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: "welcome",
            path: "/",
            component: Welcome,
        },
        {
            name: "index",
            path: "/index",
            component: Index,
            children: [
                {
                    name: "pets",
                    path: "/pets/:petType",
                    component: Pets,
                },
                {
                    name: "petGoods",
                    path: "/petGoods",
                    component: PetGoods,
                },
                {
                    name: "user",
                    path: "/user",
                    component: User,
                },
                {
                    name: "petInfo",
                    path: "/petInfo/:id",
                    component: PetInfo,
                },
                {
                    name: "goodInfo",
                    path: "/goodInfo/:id",
                    component: GoodInfo,
                },
            ],
        },
        {
            name: "login",
            path: "/login",
            component: Login,
        },
    ],
});

router.beforeEach(async (to, from) => {
    if (
        // 检查用户是否已登录
        !isLogin() &&
        // ❗️ 避免无限重定向
        to.name !== "login" &&
        to.name !== "welcome"
    ) {
        // 将用户重定向到登录页面
        return { name: "login" };
    }
    if (to.name === "login" && isLogin()) {
        return { name: "index" };
    }
});

function isLogin() {
    const token = localStorage.token;
    if (token == "" || typeof token === "undefined" || token == null)
        return false;

    const exp = parseJwt(token).exp;

    if (Date.now() < exp * 1000) {
        return true;
    }
    localStorage.removeItem("token");
    return false;
}

export default router;
