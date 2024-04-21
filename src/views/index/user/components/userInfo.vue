<template>
    <div class="main">
        <div class="container">
            <header class="avatar">
                <img
                    :src="user.userAvatar"
                    alt="1"
                    v-if="existAvatar"
                    style="
                        object-fit: cover;
                        float: right;
                        width: 100%;
                        height: 100%;
                    "
                />
                <UserOutlined v-else />
            </header>
            <main class="info">
                <div class="title">
                    <div class="title-item">用户名</div>
                    <div class="title-item">联系方式</div>
                    <div class="title-item">性别</div>
                    <div class="title-item">账号类型</div>
                </div>
                <div class="text">
                    <div class="text-item">{{ user.userName }}</div>
                    <div class="text-item">{{ user.phoneNumber }}</div>
                    <div class="text-item">{{ user.sex }}</div>
                    <div class="text-item">{{ user.userType }}</div>
                </div>
            </main>
            <div class="control">
                <a-button type="primary" @click="showModal">修改</a-button>
                <a-modal
                    v-model:open="open"
                    title="修改用户信息"
                    @ok="handleOk"
                >
                    <template #footer>
                        <a-button key="back" @click="handleCancel"
                            >取消</a-button
                        >
                        <a-button
                            key="submit"
                            type="primary"
                            :loading="loading"
                            @click="handleOk"
                            >修改</a-button
                        >
                    </template>
                    <a-form
                        labelAlign="right"
                        :label-col="{ style: { width: '120px' } }"
                        :wrapper-col="{
                            span: 14,
                        }"
                        layout="horizontal"
                        :disabled="componentDisabled"
                        style="max-width: 600px"
                    >
                        <a-form-item
                            style="
                                display: flex;
                                justify-content: center;
                                width: 100%;
                            "
                        >
                            <a-upload
                                v-model:file-list="fileList"
                                name="avatar"
                                :max-count="1"
                                :headers="headers"
                                list-type="picture-card"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                :customRequest="uploadAvatar"
                                @change="handleChange"
                                :before-upload="beforeUpload"
                                style="
                                    display: flex;
                                    justify-content: center;
                                    width: 100%;
                                "
                            >
                                <img
                                    v-if="imageUrl"
                                    :src="imageUrl"
                                    alt="avatar"
                                    style="width: 100px; height: 100px"
                                />
                                <div v-else>
                                    <loading-outlined
                                        v-if="imageloading"
                                    ></loading-outlined>
                                    <plus-outlined v-else></plus-outlined>
                                    <div class="ant-upload-text">上传</div>
                                </div>
                            </a-upload>
                        </a-form-item>
                        <a-form-item label="联系方式">
                            <a-input v-model:value="userForm.phoneNumber" />
                        </a-form-item>
                        <a-form-item label="性别">
                            <a-select v-model:value="userForm.sex">
                                <a-select-option value="男">男</a-select-option>
                                <a-select-option value="女">女</a-select-option>
                                <a-select-option value="保密"
                                    >保密</a-select-option
                                >
                            </a-select>
                        </a-form-item>
                    </a-form>
                </a-modal>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStoreHook } from "@/stores/modules/user";
import httpService from "@/utils/http.service";
import {
    UserOutlined,
    PlusOutlined,
    LoadingOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref, computed } from "vue";
const componentDisabled = ref(false);
const user = useUserStoreHook().$state;
const userForm = ref({
    phoneNumber: user.phoneNumber,
    sex: user.sex,
    userAvatar: "",
});

const loading = ref(false);
const open = ref(false);
const showModal = () => {
    open.value = true;
};

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

const imageloading = ref(false);
const fileList = ref([]);
const imageUrl = ref("");
const headers = {
    token: localStorage.token,
    "Content-Type": "multipart/form-data",
};
const newAvatarUrl = ref("");
async function uploadAvatar(e) {
    const file = e.file;
    let formData = new FormData();
    formData.append("avatar", file);
    const result = await httpService({
        url: "/uploadAvatar",
        method: "POST",
        headers: e.headers,
        data: formData,
    });
    if (result.code == 200) {
        getBase64(e.file, (base64Url) => {
            imageUrl.value = base64Url;
            loading.value = false;
        });
        newAvatarUrl.value = result.data;
    }
}

const handleChange = (info) => {
    if (info.file.status === "uploading") {
        imageloading.value = true;
        return;
    }
    if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url) => {
            imageUrl.value = base64Url;
            loading.value = false;
        });
    }
    if (info.file.status === "error") {
        loading.value = false;
        message.error("upload error");
    }
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};

const handleOk = async () => {
    loading.value = true;
    userForm.value.userAvatar = newAvatarUrl.value;
    await useUserStoreHook().CHANGE_USERINFO(userForm.value);
    loading.value = false;
    open.value = false;
};
const handleCancel = () => {
    open.value = false;
    imageUrl.value = user.userAvatar;
    fileList.value = [];
};

const existAvatar = computed(() => {
    return (
        user.userAvatar !== "" &&
        typeof user.userAvatar !== "undefined" &&
        user.userAvatar !== "null"
    );
});
</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.container {
    max-width: 300px;
    width: 100%;
    height: 100%;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    font-size: 100px;
    background: rgba(5, 5, 5, 0.2);
    margin: auto;
    overflow: hidden;
    margin-bottom: 50px;
}
.info {
    width: 100%;
    display: flex;
    line-height: 18px;
    margin-bottom: 20px;
}

.info > .title {
    width: 50%;
    text-align: start;
    font-size: 18px;
}

.info > .title > .title-item {
    margin-bottom: 20px;
}

.info > .text {
    width: 50%;
    text-align: center;
    font-size: 16px;
}

.info > .text > .text-item {
    margin-bottom: 20px;
    color: rgba(5, 5, 5, 0.5);
}

.control {
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>
