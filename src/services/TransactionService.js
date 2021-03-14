/* eslint-disable prettier/prettier */
import {
    axios_service
} from '@/services/AxiosService.js'

export default {
    get_transactions(customer_keyword = '') {
        return axios_service.get(`/api/transactions?keyword=${customer_keyword}`)
    },

    get_transaction(transaction_id) {
        return axios_service.get(`/api/transactions/${transaction_id}`)
    },

    get_transaction_edit(transaction_id) {
        return axios_service.get(`/api/transactions/${transaction_id}/edit`)
    },

    post_transaction(transaction_body_data) {
        return axios_service.post(`/api/transactions`, transaction_body_data)
    },

    put_transaction(transaction_id, transaction_body_data) {
        return axios_service.put(`/api/transactions/${transaction_id}`, transaction_body_data)
    },

    delete_transaction(transaction_id) {
        return axios_service.delete(`/api/transactions/${transaction_id}`)
    }
}