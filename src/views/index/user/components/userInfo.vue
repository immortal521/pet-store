<template>
    <div class="main">
        <div class="container">
            <header class="avatar">
                <img :src="user.avatar" alt="1" v-if="user.avatar" />
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
                    <div class="text-item">{{ user.phone }}</div>
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
                                list-type="picture-card"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                :before-upload="beforeUpload"
                                @change="handleChange"
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
                                />
                                <div v-else>
                                    <loading-outlined
                                        v-if="loading"
                                    ></loading-outlined>
                                    <plus-outlined v-else></plus-outlined>
                                    <div class="ant-upload-text">Upload</div>
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
import { UserOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const componentDisabled = ref(false);
const user = useUserStoreHook().$state;
const userForm = ref({
    phoneNumber: user.phone,
    sex: user.sex,
});

const loading = ref(false);
const open = ref(false);
const showModal = () => {
    open.value = true;
};
const handleOk = async () => {
    loading.value = true;
    console.log(userForm.value);
    await useUserStoreHook().CHANGE_USERINFO(userForm.value);
    loading.value = false;
    open.value = false;
};
const handleCancel = () => {
    open.value = false;
};
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
