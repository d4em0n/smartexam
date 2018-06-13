export const SET_PROFILE = "SET_PROFILE";
export function setProfile(data) {
    return {
        type: SET_PROFILE,
        data: data
    }
}

export const UNSET_PROFILE = "UNSET_PROFILE";
export function unsetProfile() {
    return {
        type: UNSET_PROFILE
    }
}
