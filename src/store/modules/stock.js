/* eslint-disable prettier/prettier */
import StockService from '@/services/StockService.js'

export default {
    namespaced: true,

    state() {
        return {
            stocks: [],

            stock: {
                id: '',
                code: '',
                type: '',
                color: '',
                quantity: '',
                brands_id: '',
                categories_id: ''
            },

            product: {
                id: '',
                code: '',
                name: '',
                brands_id: ''
            },

            brand: {
                id: '',
                name: ''
            },

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
        SET_STOCKS(state, stocks) {
            state.stocks = stocks
        },

        SET_STOCK(state, stock) {
            state.stock = {
                id: stock.id,
                code: stock.code,
                type: stock.type,
                color: stock.color,
                quantity: stock.quantity,
                brands_id: stock.brands_id,
                categories_id: stock.categories_id
            }
        },

        SET_PRODUCT(state, product) {
            state.product = {
                id: product.id,
                code: product.code,
                name: product.name,
                brands_id: product.brands_id
            }
        },

        SET_BRAND(state, brand) {
            state.brand = {
                id: brand.id,
                name: brand.name
            }
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

        CLEAR_STOCK(state) {
            state.stock = {
                id: '',
                code: '',
                type: '',
                color: '',
                quantity: '',
                brands_id: '',
                categories_id: ''
            }
        },

        CLEAR_PRODUCT(state) {
            state.product = {
                id: '',
                code: '',
                name: '',
                brands_id: ''
            }
        },

        CLEAR_BRAND(state) {
            state.brand = {
                id: '',
                name: ''
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
        },
    },

    actions: {
        get_stocks({
            commit
        }, stock_keyword) {
            let keyword =
                typeof stock_keyword != 'undefined' ? stock_keyword : ''

            return new Promise((resolve, reject) => {
                StockService.get_stocks(keyword)
                    .then(response => {
                        commit('SET_STOCKS', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_stock({
            commit,
        }, stock_id) {
            return new Promise((resolve, reject) => {
                StockService.get_stock(stock_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_PRODUCT', response.data.data.brand.product)
                            commit('SET_BRAND', response.data.data.brand)
                            commit('SET_CATEGORY', response.data.data.category)
                            commit('SET_STOCK', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_stock({
            state,
            commit
        }, stock) {
            return new Promise((resolve, reject) => {
                commit('SET_STOCK', stock)

                StockService.post_stock(state.stock)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_stock({
            commit
        }, stock_id) {
            return new Promise((resolve, reject) => {
                StockService.get_stock_edit(stock_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_STOCK', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_stock({
            state,
            commit
        }, stock) {
            return new Promise((resolve, reject) => {
                commit('SET_STOCK', stock)

                StockService.put_stock(state.stock.id, state.stock)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_stock({
            dispatch
        }, stock_id) {
            return new Promise((resolve, reject) => {
                StockService.delete_stock(stock_id)
                    .then(response => {
                        dispatch('get_stocks')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        stocks: state => state.stocks,

        stock: state => state.stock,

        product: state => state.product,

        brand: state => state.brand,

        category: state => state.category,

        stocks_length: state => state.stocks.length,
    }
}