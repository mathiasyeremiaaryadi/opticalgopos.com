/* eslint-disable prettier/prettier */
import TransactionService from '@/services/TransactionService.js'

export default {
    namespaced: true,

    state() {
        return {
            transactions: [],

            transaction: {
                id: '',
                code: '',
                lens_type: '',
                total: '',
                status: '',
                transaction_date: '',
                payments_id: '',
                categories_id: '',
                customers_id: '',
                customer: ''
            },

            customer: {
                id: '',
                code: '',
                name: '',
                phone: '',
                email: '',
                address: ''
            },

            category: {
                id: '',
                code: '',
                name: '',
                description: '',
                price: ''
            },

            payment: {
                id: '',
                name: ''
            },
        }
    },

    mutations: {
        SET_TRANSACTIONS(state, transactions) {
            state.transactions = transactions
        },

        SET_TRANSACTION(state, {
            transaction,
            customer = ''
        }) {
            state.transaction = {
                id: transaction.id,
                code: transaction.code,
                lens_type: transaction.lens_type,
                total: transaction.total,
                status: transaction.status,
                transaction_date: transaction.transaction_date,
                payments_id: transaction.payments_id,
                categories_id: transaction.categories_id,
                customers_id: transaction.customers_id,
                customer: customer
            }
        },

        SET_CUSTOMER(state, customer) {
            state.customer = {
                id: customer.id,
                code: customer.code,
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                address: customer.address
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

        SET_PAYMENT(state, payment) {
            state.payment = {
                id: payment.id,
                name: payment.name
            }
        },

        CLEAR_TRANSACTION(state) {
            state.transaction = {
                id: '',
                code: '',
                lens_type: '',
                total: '',
                status: '',
                transaction_date: '',
                payments_id: '',
                categories_id: '',
                customers_id: '',
                customer: ''
            }
        },

        CLEAR_CUSTOMER(state) {
            state.customer = {
                id: '',
                code: '',
                name: '',
                phone: '',
                email: '',
                address: ''
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

        CLEAR_PAYMENT(state) {
            state.payment = {
                id: '',
                name: ''
            }
        },
    },

    actions: {
        get_transactions({
            commit
        }, transaction_keyword) {
            let keyword =
                typeof transaction_keyword != 'undefined' ? transaction_keyword : ''

            return new Promise((resolve, reject) => {
                TransactionService.get_transactions(keyword)
                    .then(response => {
                        commit('SET_TRANSACTIONS', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_transaction({
            commit
        }, transaction_id) {
            return new Promise((resolve, reject) => {
                TransactionService.get_transaction(transaction_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_TRANSACTION', {
                                transaction: response.data.data
                            })
                            commit('SET_CUSTOMER', response.data.data.customer)
                            commit('SET_CATEGORY', response.data.data.category)
                            commit('SET_PAYMENT', response.data.data.payment)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_transaction({
            state,
            commit
        }, {
            transaction,
            customer
        }) {
            return new Promise((resolve, reject) => {
                commit('SET_TRANSACTION', {
                    transaction,
                    customer
                })

                TransactionService.post_transaction(state.transaction)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_transaction({
            commit
        }, transaction_id) {
            return new Promise((resolve, reject) => {
                TransactionService.get_transaction_edit(transaction_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_TRANSACTION', {
                                transaction: response.data.data
                            })
                            commit('SET_CUSTOMER', response.data.data.customer)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_transaction({
            state,
            commit
        }, transaction) {
            return new Promise((resolve, reject) => {
                commit('SET_TRANSACTION', {
                    transaction
                })

                TransactionService.put_transaction(state.transaction.id, state.transaction)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_transaction({
            dispatch
        }, transaction_id) {
            return new Promise((resolve, reject) => {
                TransactionService.delete_transaction(transaction_id)
                    .then(response => {
                        dispatch('get_transactions')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        transactions: state => state.transactions,

        transaction: state => state.transaction,

        customer: state => state.customer,

        category: state => state.category,

        payment: state => state.payment,

        transactions_length: state => state.transactions.length,
    }
}