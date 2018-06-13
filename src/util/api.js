import axios from 'axios';

export function checkLogin (user, pass) {
    let loginUrl = "/api/profile";
    let config = {
        auth : {
            username: user,
            password: pass
        }
    }
    return axios.get(loginUrl, config).then(response => {
        return response.data
    })
}
