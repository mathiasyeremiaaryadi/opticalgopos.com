/* eslint-disable prettier/prettier */
import DashboardService from '@/services/DashboardService.js'

export default {
    namespaced: true,

    state() {
        return {
            transactions: [],

            last_transactions: [],

            date_filter: {
                start_date: '',
                last_date: ''
            }
        }
    },

    mutations: {
        SET_TRANSACTIONS(state, transactions) {
            state.transactions = transactions
        },

        SET_LAST_TRANSACTIONS(state, last_transactions) {
            state.last_transactions = last_transactions
        },

        CLEAR_DATE_FILTER(state) {
            state.date_filter = {
                start_date: '',
                last_date: ''
            }
        }
    },

    actions: {
        get_transactions({
            commit
        }, date_filter) {
            let start_date = ''
            let last_date = ''

            if (typeof date_filter != 'undefined') {
                start_date = date_filter.start_date != null ? date_filter.start_date : ''
                last_date = date_filter.last_date != null ? date_filter.last_date : ''
            }

            return new Promise((resolve, reject) => {
                DashboardService.get_transactions(start_date, last_date)
                    .then(response => {
                        commit('SET_TRANSACTIONS', response.data.data.transactions)
                        commit('SET_LAST_TRANSACTIONS', response.data.data.last_transactions)

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

        last_transactions: state => state.last_transactions,

        date_filter: state => state.date_filter,

        transactions_length: state => state.transactions.length,

        total_transactions: state => state.transactions.length > 0 ? (state.transactions.map(transaction => transaction.total).reduce((accumulator, current_value) => accumulator + current_value)) : 0,

        success_count: state => state.transactions.length > 0 ? (state.transactions.filter(transaction => transaction.status === 'Sukses').length) : 0,

        failed_count: state => state.transactions.length > 0 ? (state.transactions.filter(transaction => transaction.status === 'Gagal').length) : 0,

        pending_count: state => state.transactions.length > 0 ? (state.transactions.filter(transaction => transaction.status === 'Pending').length) : 0,

        success_portion: state => state.transactions.length > 0 ? (state.transactions.filter(transaction => transaction.status === 'Sukses').length / state.transactions.length * 100).toFixed(2) : 0,

        failed_portion: state => state.transactions.length > 0 ? (state.transactions.filter(transaction => transaction.status === 'Gagal').length / state.transactions.length * 100).toFixed(2) : 0,

        pending_portion: state => state.transactions.length > 0 ? (state.transactions.filter(transaction => transaction.status === 'Pending').length / state.transactions.length * 100).toFixed(2) : 0
    }
}