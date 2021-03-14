/* eslint-disable prettier/prettier */
import CategoryService from '@/services/CategoryService.js'

export default {
    namespaced: true,

    state() {
        return {
            categories: [],

            category: {
                id: '',
                code: '',
                name: '',
                description: '',
                price: ''
            }
        }
    },

    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories
        },

        SET_CATEGORY(state, category) {
            state.category = {
                id: category.id,
                code: category.code,
                name: category.name,
                description: category.description,
                price: category.price
            }
        },

        CLEAR_CATEGORY(state) {
            state.category = {
                id: '',
                code: '',
                name: '',
                description: '',
                price: ''
            }
        }
    },

    actions: {
        get_categories({
            commit
        }, category_keyword) {
            let keyword =
                typeof category_keyword != 'undefined' ? category_keyword : ''

            return new Promise((resolve, reject) => {
                CategoryService.get_categories(keyword)
                    .then(response => {
                        commit('SET_CATEGORIES', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_category({
            commit
        }, category_id) {
            return new Promise((resolve, reject) => {
                CategoryService.get_category(category_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_CATEGORY', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_category({
            state,
            commit
        }, category) {
            return new Promise((resolve, reject) => {
                commit('SET_CATEGORY', category)

                CategoryService.post_category(state.category)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_category({
            commit
        }, category_id) {
            return new Promise((resolve, reject) => {
                CategoryService.get_category_edit(category_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_CATEGORY', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_category({
            state,
            commit
        }, category) {
            return new Promise((resolve, reject) => {
                commit('SET_CATEGORY', category)

                CategoryService.put_category(state.category.id, state.category)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_category({
            dispatch
        }, category_id) {
            return new Promise((resolve, reject) => {
                CategoryService.delete_category(category_id)
                    .then(response => {
                        dispatch('get_categories')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        categories: state => state.categories,

        category: state => state.category,

        categories_length: state => state.categories.length,
    }
}