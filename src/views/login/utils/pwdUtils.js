import CryptoJS from "crypto-js";
/**
 * 密码加密函数
 * @param {*} password 密码
 */
export function encryptPassword(password) {
    const hash = CryptoJS.SHA256(password);
    // 将密码转换为哈希值，并以十六进制编码输出
    const hashedPassword = hash.toString();
    return hashedPassword;
}
