import { defineStore } from "pinia";
import { store } from "@/stores";
import httpService from "@/utils/http.service";
import { parseJwt } from "@/utils/jwt";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        userName: "",
        userAvatar: "",
        currentPage: 0,
    }),

    actions: {
        SET_USERNAME(userName) {
            this.userName = userName;
        },
        SET_CURRENTPAGE(value) {
            this.currentPage = value;
        },
        SET_USERAVATAR(userAvatar) {
            this.userAvatar = userAvatar;
        },
        async loginByUserName(data) {
            const res = await httpService.post("/login", data);
            localStorage.token = res.data;
            const user = parseJwt(res.data);
            console.log(user);

            return true;
        },
        async registByUserName(data) {
            return await httpService.post("/register", data);
        },
    },
});

export function useUserStoreHook() {
    return useUserStore(store);
}
