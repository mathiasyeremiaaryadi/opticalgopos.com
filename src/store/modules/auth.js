/* eslint-disable prettier/prettier */
import AuthService from '@/services/AuthService.js'

export default {
    namespaced: true,

    state() {
        return {
            credential: {
                email: '',
                password: ''
            }
        }
    },

    mutations: {
        SET_CREDENTIAL(state, credential) {
            state.credential = {
                email: credential.email,
                password: credential.password
            }
        },

        CLEAR_CREDENTIAL(state) {
            state.credential = {
                email: '',
                password: ''
            }
        }
    },

    actions: {
        login({
            state,
            commit,
        }, credential) {
            commit('SET_CREDENTIAL', credential)

            sessionStorage.setItem('user-pos-token', null)

            return new Promise((resolve, reject) => {
                AuthService.get_csrf_token().then(() => {
                        AuthService.post_login(state.credential)
                            .then(response => {
                                if (response.data.status === 'success') {
                                    sessionStorage.setItem('user-pos-token', response.data.token)

                                    commit('SET_TOKEN', response.data.token, {
                                        root: true
                                    })
                                }

                                resolve(response.data)
                            })
                            .catch(error => {
                                reject(error)
                            })
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        credential: state => state.credential,
    }
}