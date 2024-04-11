import { createRouter, createWebHashHistory } from "vue-router";
import Welcome from "@/views/welcome/index.vue";
import Login from "@/views/login/index.vue";
import User from "@/views/index/user/index.vue";
import Index from "@/views/index/index.vue";
import PetGoods from "@/views/index/petGoods/index.vue";

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
                    name: "petGoods",
                    path: "/petGoods",
                    component: PetGoods,
                },
                {
                    name: "user",
                    path: "/index",
                    component: User,
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

function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}

function isLogin() {
    const token = localStorage.token;
    if (!token) return false;

    const exp = parseJwt(token).exp;
    console.log(Date.now() + " " + exp);
    if (Date.now() < exp * 1000) {
        return true;
    }
    localStorage.removeItem("token");
    return false;
}

export default router;
