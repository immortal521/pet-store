import { defineStore } from "pinia";
import { store } from "@/stores";
import httpService from "@/utils/http.service";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        userName: "",
        currentPage: 0,
    }),

    actions: {
        SET_USERNAME(userName) {
            this.userName = userName;
        },
        SET_CURRENTPAGE(value) {
            this.currentPage = value;
        },
        async loginByUserName(data) {
            return await httpService.post("/login", data);
        },
        async registByUserName(data) {
            return await httpService.post("/register", data);
        },
    },
});

export function useUserStoreHook() {
    return useUserStore(store);
}
