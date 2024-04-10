const REGEXP_PWD =
    /(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*()-_+=])[a-zA-Z0-9!@#$%^&*()-_+=]{8,18}/;

export function checkPassword(password) {
    if (password == "" || typeof password == "undefined") {
        return false;
    }
    if (REGEXP_PWD.test(password) == false) {
        return true;
    }
    return false;
}

export function checkPasswordIsSame(firstPwd, scecondPwd) {
    return firstPwd === scecondPwd;
}
