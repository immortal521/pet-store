import { defineStore } from "pinia";
import { store } from "@/stores";
import httpService from "@/utils/http.service";
import { parseJwt } from "@/utils/jwt";

const userType = ["普通用户", "会员用户"];
const sexType = ["男", "女", "保密"];

const config = {
    headers: {
        token: localStorage.token,
    },
};

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        userName: localStorage.userName ? localStorage.userName : "",
        userAvatar: localStorage.userAvatar ? localStorage.userAvatar : "",
        currentPage: 0,
        userId: localStorage.userId ? localStorage.userId : 0,
        phoneNumber: localStorage.phoneNumber ? localStorage.phoneNumber : "",
        sex: localStorage.sex ? localStorage.sex : "保密",
        userType: localStorage.userType ? localStorage.userType : "",
    }),

    actions: {
        SET_USERINFO(user) {
            this.userName = user?.user_name;
            this.userId = user?.user_id;
            this.sex = sexType[user?.sex];
            this.phoneNumber = user?.phone_number;
            this.userType = userType[user?.user_type];
            this.userAvatar = user?.avatar;
            localStorage.userName = this.userName;
            localStorage.userId = this.userId;
            localStorage.sex = this.sex;
            localStorage.phoneNumber = this.phoneNumber;
            localStorage.userType = this.userType;
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
            const phoneNumber = data.phoneNumber
                ? data.phoneNumber
                : this.phoneNumber;
            const sex = data.sex ? data.sex : this.sex;
            const userAvatar = data.userAvatar
                ? data.userAvatar
                : this.userAvatar;
            const user = {
                userId: this.userId,
                userName: this.userName,
                phoneNumber: phoneNumber,
                sex: { 男: "0", 女: "1", 保密: "2" }[data.sex],
                avatar: userAvatar,
            };
            const res = await httpService.put("/updateUser", user, config);
            if (res.data == true) {
                this.phoneNumber = phoneNumber;
                this.sex = sex;
                this.userAvatar = userAvatar;
                localStorage.phoneNumber = this.phoneNumber;
                localStorage.sex = this.sex;
                localStorage.userAvatar = this.userAvatar;
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
