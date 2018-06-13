export const SET_AUTH = "SET_AUTH";
export function setAuth(data) {
    return {
        type: SET_AUTH,
        data: data,
    }
}

export const UNSET_AUTH = "UNSET_AUTH";
export function unsetAuth() {
    return {
        type: UNSET_AUTH
    }
}

