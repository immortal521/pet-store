import axios from "axios";

const httpService = axios.create({
    baseURL: "/api/",
    timeout: 5000,
});

// 添加请求拦截器
httpService.interceptors.request.use(
    function (config) {
        console.log(config);
        // 在请求被发送之前做一些处理，例如添加 token 等
        // 可以在这里对 config 做一些修改
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
httpService.interceptors.response.use(
    function (response) {
        // 对响应数据做一些处理，例如统一处理错误信息等
        return response.data;
    },
    function (error) {
        // 对响应错误做些什么
        return Promise.reject(error);
    }
);

export default httpService;
