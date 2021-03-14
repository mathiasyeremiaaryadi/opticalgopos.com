/* eslint-disable prettier/prettier */
import BrandService from '@/services/BrandService.js'

export default {
    namespaced: true,

    state() {
        return {
            brands: [],

            brand: {
                id: '',
                name: '',
                products_id: ''
            },
        }
    },

    mutations: {
        SET_BRANDS(state, brands) {
            state.brands = brands
        },

        SET_BRAND(state, brand) {
            state.brand = {
                id: brand.id,
                name: brand.name,
                products_id: brand.products_id
            }
        },

        CLEAR_BRAND(state) {
            state.brand = {
                id: '',
                name: '',
                products_id: ''
            }
        },
    },

    actions: {
        get_brands({
            commit
        }, brand_keyword) {
            let keyword =
                typeof brand_keyword != 'undefined' ? brand_keyword : ''

            return new Promise((resolve, reject) => {
                BrandService.get_brands(keyword)
                    .then(response => {
                        commit('SET_BRANDS', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_brand({
            commit
        }, brand_id) {
            return new Promise((resolve, reject) => {
                BrandService.get_brand(brand_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_BRAND', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_brands_product({
            commit
        }, selected_product) {
            let product =
                typeof selected_product != 'undefined' ? selected_product : ''

            return new Promise((resolve, reject) => {
                BrandService.get_brands_with_products(product)
                    .then(response => {
                        commit('SET_BRANDS', response.data.data)

                        resolve(response.data.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_brand({
            state,
            commit
        }, brand) {
            return new Promise((resolve, reject) => {
                commit('SET_BRAND', brand)

                BrandService.post_brand(state.brand)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_brand({
            commit
        }, brand_id) {
            return new Promise((resolve, reject) => {
                BrandService.get_brand_edit(brand_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_BRAND', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_brand({
            state,
            commit
        }, brand) {
            return new Promise((resolve, reject) => {
                commit('SET_BRAND', brand)

                BrandService.put_brand(state.brand.id, state.brand)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_brand({
            dispatch
        }, brand_id) {
            return new Promise((resolve, reject) => {
                BrandService.delete_brand(brand_id)
                    .then(response => {
                        dispatch('get_brands')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        brands: state => state.brands,

        brand: state => state.brand,

        brands_length: state => state.brands.length,
    }
}