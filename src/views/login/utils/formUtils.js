export function checkForm(formObj) {
    for (let key in formObj) {
        if (formObj[key].trim() === "") {
            return true; // 如果有任何属性为空，则返回 true
        }
    }
    return false;
}

export function formToEmpty(formObj) {
    for (let key in formObj) {
        formObj[key] = "";
    }
}
