/* eslint-disable prettier/prettier */
import AdminService from '@/services/AdminService.js'

export default {
    namespaced: true,

    state() {
        return {
            admin: {
                id: '',
                name: '',
                email: '',
                image: ''
            },
        }
    },

    mutations: {
        SET_ADMIN(state, admin) {
            state.admin = {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                image: admin.image,
            }
        },

        CLEAR_ADMIN(state) {
            state.admin = {
                id: '',
                name: '',
                email: '',
                image: ''
            }
        }
    },

    actions: {
        edit_admin({
            commit
        }, admin_id) {
            return new Promise((resolve, reject) => {
                AdminService.get_admin_edit(admin_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_ADMIN', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_admin({
            state,
            commit
        }, admin) {
            return new Promise((resolve, reject) => {
                commit('SET_ADMIN', admin)

                AdminService.put_admin(state.admin.id, state.admin)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

    }
}