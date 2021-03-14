/* eslint-disable prettier/prettier */
import ProductService from '@/services/ProductService.js'

export default {
    namespaced: true,

    state() {
        return {
            products: [],

            product: {
                id: '',
                code: '',
                name: ''
            }
        }
    },

    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },

        SET_PRODUCT(state, product) {
            state.product = {
                id: product.id,
                code: product.code,
                name: product.name
            }
        },

        CLEAR_PRODUCT(state) {
            state.product = {
                id: '',
                code: '',
                name: ''
            }
        }
    },

    actions: {
        get_products({
            commit
        }, product_keyword) {
            let keyword =
                typeof product_keyword != 'undefined' ? product_keyword : ''

            return new Promise((resolve, reject) => {
                ProductService.get_products(keyword)
                    .then(response => {
                        commit('SET_PRODUCTS', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_product({
            commit
        }, product_id) {
            return new Promise((resolve, reject) => {
                ProductService.get_product(product_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_PRODUCT', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_product({
            state,
            commit
        }, product) {
            return new Promise((resolve, reject) => {
                commit('SET_PRODUCT', product)

                ProductService.post_product(state.product)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_product({
            commit
        }, product_id) {
            return new Promise((resolve, reject) => {
                ProductService.get_product_edit(product_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_PRODUCT', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_product({
            state,
            commit
        }, product) {
            return new Promise((resolve, reject) => {
                commit('SET_PRODUCT', product)

                ProductService.put_product(state.product.id, state.product)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_product({
            dispatch
        }, product_id) {
            return new Promise((resolve, reject) => {
                ProductService.delete_product(product_id)
                    .then(response => {
                        dispatch('get_products')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        products: state => state.products,

        product: state => state.product,

        products_length: state => state.products.length,
    }
}