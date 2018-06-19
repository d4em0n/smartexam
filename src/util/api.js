import axios from 'axios';
import {store} from '../stores/store.js';

function getConfig() {
    return {
        auth: store.getState().auth
    }
}

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

export function getUjian() {
    let config = getConfig()
    let ujianUrl = "/api/ujian";
    return axios.get(ujianUrl, config).then(response => {
        return response.data
    });
}

export function addUjian(deskripsi) {
    let config = getConfig();
    let data = { deskripsi };
    let ujianUrl = "/api/ujian";
    return axios.post(ujianUrl, data, config).then(response => {
        return response.data
    })
}

export function deleteUjian(id_ujian) {
    let config = getConfig();
    let ujianUrl = `/api/ujian/${id_ujian}`;
    return axios.delete(ujianUrl, config).then(response => {
        return response.data;
    })
}

export function editUjian(data_ujian) {
    let config = getConfig();
    let data = {
        deskripsi: data_ujian.deskripsi,
        is_aktif: data_ujian.is_aktif
    }
    let ujianUrl = `/api/ujian/${data_ujian.id_ujian}`;
    return axios.put(ujianUrl, data, config).then(response => {
        return response.data
    })
}
