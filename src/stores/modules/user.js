import { defineStore } from "pinia";
import { store } from "@/stores";
import httpService from "@/utils/http.service";
import { parseJwt } from "@/utils/jwt";

const userType = ["管理员", "工作人员", "普通用户", "会员用户"];
const sexType = ["男", "女", "保密"];

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        userName: localStorage.userName ? localStorage.userName : "",
        userAvatar: localStorage.userAvatar ? localStorage.userAvatar : "",
        currentPage: 0,
        userId: localStorage.userId ? localStorage.userId : 0,
        phone: localStorage.phone ? localStorage.phone : "",
        sex: localStorage.sex ? localStorage.sex : "保密",
        userType: localStorage.userType ? localStorage.userType : "",
    }),

    actions: {
        SET_USERINFO(user) {
            this.userName = user?.user_name;
            localStorage.userName = this.userName;
            this.userId = user?.id;
            localStorage.userId = this.userId;
            this.sex = sexType[user?.sex];
            localStorage.sex = this.sex;
            this.phone = user?.phone;
            localStorage.phone = this.phone;
            this.userType = userType[user?.user_type];
            localStorage.userType = this.userType;
            this.userAvatar = user?.avatar;
            localStorage.userAvatar = this.userAvatar;
        },
        SET_USERNAME(userName) {
            this.userName = userName;
        },
        SET_CURRENTPAGE(value) {
            this.currentPage = value;
        },
        SET_USERAVATAR(userAvatar) {
            this.userAvatar = userAvatar;
        },
        async CHANGE_USERINFO(data) {
            const phone = data.phoneNumber ? data.phoneNumber : this.phone;
            const sex = data.sex ? data.sex : this.sex;
            const user = {
                userId: this.userId,
                userName: this.userName,
                phoneNumber: phone,
                sex: { 男: "0", 女: "1", 保密: "2" }[data.sex],
            };
            const res = await httpService.put("/updateUser", user);
            if (res.data == true) {
                this.phone = phone;
                this.sex = sex;
                localStorage.phone = this.phone;
                localStorage.sex = this.sex;
            }
        },
        async loginByUserName(data) {
            const res = await httpService.post("/login", data);
            if (res.code === 200) {
                localStorage.token = res.data;
                const user = parseJwt(res.data);
                this.SET_USERINFO(user);
                return true;
            } else {
                return false;
            }
        },
        async registByUserName(data) {
            return await httpService.post("/register", data);
        },
    },
});

export function useUserStoreHook() {
    return useUserStore(store);
}
