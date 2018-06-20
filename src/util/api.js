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

export function getUjianDetail(id_ujian) {
    let config = getConfig();
    let ujianUrl = `/api/ujian/${id_ujian}`;
    return axios.get(ujianUrl, config).then(response => {
        return response.data
    });
}

export function SetJawabanBenar(id_ujian, id_pertanyaan, id_jawaban) {
    let config = getConfig();
    let jawabanUrl = `/api/ujian/${id_ujian}/pertanyaan/${id_pertanyaan}/jawaban/${id_jawaban}/set_true`;
    return axios.put(jawabanUrl, {}, config).then(response => {
        return response.data;
    })
}

export function getPertanyaanFull(id_ujian) {
    let config = getConfig();
    let ujianUrl = `/api/ujian/${id_ujian}/pertanyaan?full`;
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

export function addPertanyaan(id_ujian, pertanyaan) {
    let config = getConfig();
    let pertanyaanUrl = `/api/ujian/${id_ujian}/pertanyaan?full`;
    let data = {
        text: pertanyaan
    };
    return axios.post(pertanyaanUrl, data, config).then(response => {
        return response.data
    })
}

export function deletePertanyaan(id_ujian, id_pertanyaan) {
    let config = getConfig();
    let pertanyaanUrl = `/api/ujian/${id_ujian}/pertanyaan/${id_pertanyaan}`;
    return axios.delete(pertanyaanUrl, config).then(response => {
        return response.data;
    })
}

export function editPertanyaan(id_ujian, id_pertanyaan, newtext) {
    let config = getConfig();
    let pertanyaanUrl = `/api/ujian/${id_ujian}/pertanyaan/${id_pertanyaan}`;
    let data = {
        text: newtext
    };
    return axios.put(pertanyaanUrl, data, config).then(response => {
        return response.data;
    })
}

export function addJawaban(id_ujian, id_pertanyaan, jawaban) {
    let config = getConfig();
    let jawabanUrl = `/api/ujian/${id_ujian}/pertanyaan/${id_pertanyaan}/jawaban`;
    let data = {
        text: jawaban,
        is_benar: false
    }
    return axios.post(jawabanUrl, data, config).then(response => {
        return response.data;
    });
}

export function deleteJawaban(id_ujian, id_pertanyaan, id_jawaban) {
    let config = getConfig();
    let jawabanUrl = `/api/ujian/${id_ujian}/pertanyaan/${id_pertanyaan}/jawaban/${id_jawaban}`;
    return axios.delete(jawabanUrl, config).then(response => {
        return response.data;
    });
}

export function editJawaban(id_ujian, id_pertanyaan, id_jawaban, newJawaban) {
    let config = getConfig();
    let jawabanUrl = `/api/ujian/${id_ujian}/pertanyaan/${id_pertanyaan}/jawaban/${id_jawaban}`;
    let data = {
        text: newJawaban.text,
        is_benar: newJawaban.is_benar
    };
    return axios.put(jawabanUrl, data, config).then(response => {
        return response.data;
    })
}
