<template>
    <div class="container">
        <h1>修改密码</h1>
        <div class="main">
            <a-form
                :model="passwordForm"
                autocomplete="off"
                size="large"
                layout="horizontal"
                labelAlign="left"
                :label-col="{ style: { width: '70px' } }"
                :rules="rules"
                @submit="updatePassword"
            >
                <a-form-item label="原密码" name="nowPassword">
                    <a-input-password
                        v-model:value="passwordForm.nowPassword"
                        placeholder="input password"
                    />
                </a-form-item>
                <a-form-item label="新密码" name="newPassword">
                    <a-input-password
                        v-model:value="passwordForm.newPassword"
                        placeholder="input new password"
                    />
                </a-form-item>
                <a-form-item label="重复密码" name="repeatNewPassword">
                    <a-input-password
                        v-model:value="passwordForm.repeatNewPassword"
                        placeholder="repeat new password"
                    />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" htmlType="submit">修改</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStoreHook } from "@/stores/modules/user.js";
import { encryptPassword } from "@/utils/pwdUtils.js";
import httpService from "@/utils/http.service.js";
import { notification } from "ant-design-vue";
const passwordForm = ref({
    nowPassword: "",
    newPassword: "",
    repeatNewPassword: "",
});

const REGEXP_PWD =
    /(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{8,18}/;

const checkPassword = async (_rule, value) => {
    if (!value) {
        return Promise.reject("请输入密码");
    }
    if (REGEXP_PWD.test(value) == false) {
        return Promise.reject("密码格式应为8-18位字母加数字或字符的组合");
    }
    return Promise.resolve();
};

const rules = {
    nowPassword: [
        {
            validator: checkPassword,
            trigger: "change",
        },
    ],
    newPassword: [
        {
            validator: checkPassword,
            trigger: "change",
        },
    ],
    repeatNewPassword: [
        {
            validator: checkPassword,
            trigger: "change",
        },
    ],
};

async function updatePassword() {
    const config = {
        headers: {
            token: localStorage.token,
        },
    };
    const data = {
        userId: useUserStoreHook().$state.userId,
        nowPassword: encryptPassword(passwordForm.value.nowPassword),
        newPassword: encryptPassword(passwordForm.value.newPassword),
        repeatNewPassword: encryptPassword(
            passwordForm.value.repeatNewPassword
        ),
    };
    const result = await httpService.put("/updatePassword", data, config);
    if (result.msg == "UPDATE_SUCCESS") {
        updateSuccess();
    } else {
        updateError(result.msg);
    }
}

const updateSuccess = () => {
    notification["success"]({
        message: "修改成功",
        description: "密码修改成功，下次登录请注意",
    });
};

function getErrorMsg(msg) {
    if (msg == "USER_NOT_FOUND") {
        return "未登录";
    }
    if (msg == "REPEAT_NEW_PASSWORD") {
        return "两次密码不一致";
    }
    if (msg == "PASSWORD_ERROR") {
        return "原密码错误";
    }
    if (msg == "UPDATE_FAILED") {
        return "修改失败";
    }
}

const updateError = (msg) => {
    notification["error"]({
        message: "修改失败",
        description: getErrorMsg(msg),
    });
};
</script>

<style scoped>
.container {
    text-align: center;
    width: 100%;
    height: 100%;
}

.main {
    width: 350px;
    height: 100%;
    margin: auto;
    padding: 30px;
}
</style>
