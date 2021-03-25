/* eslint-disable prettier/prettier */
import axios from 'axios'
import NProgress from 'nprogress'

export const axios_service = axios.create({
    baseURL: `http://api.opticalgopos.com`,
    withCredentials: true,
    headers: {
        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
    }
})

axios_service.interceptors.request.use(
    config => {
        NProgress.start()

        let token = sessionStorage.getItem('user-pos-token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    },

    error => {
        return Promise.reject(error)
    }
)


axios_service.interceptors.response.use(response => {
    NProgress.done()

    return response
})

axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('auth/logout')
        }
        throw err;
    });
});