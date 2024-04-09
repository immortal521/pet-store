import { createRouter, createWebHashHistory } from "vue-router";
import Welcome from "@/views/welcome/index.vue";
import Login from "@/views/login/index.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: Welcome,
        },
        {
            path: "/login",
            component: Login,
        },
    ],
});

export default router;
