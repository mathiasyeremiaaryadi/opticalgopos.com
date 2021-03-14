/* eslint-disable prettier/prettier */
import CustomerService from '@/services/CustomerService.js'

export default {
    namespaced: true,

    state() {
        return {
            customers: [],

            prescriptions: [],

            customer: {
                id: '',
                code: '',
                name: '',
                phone: '',
                email: '',
                address: '',
            },

            prescription: {
                id: '',
                right_spherical: '',
                right_cylinder: '',
                right_plus: '',
                right_axis: '',
                right_pupil_distance: '',
                left_spherical: '',
                left_cylinder: '',
                left_plus: '',
                left_axis: '',
                left_pupil_distance: '',
                customers_id: ''
            },
        }
    },

    mutations: {
        SET_CUSTOMERS(state, customers) {
            state.customers = customers
        },

        SET_PRESCRIPTIONS(state, prescriptions) {
            state.prescriptions = prescriptions
        },

        SET_CUSTOMER(state, customer) {
            state.customer = {
                id: customer.id,
                code: customer.code,
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                address: customer.address,
            }
        },

        SET_PRESCRIPTION(state, prescription) {
            state.prescription = {
                id: prescription.id,
                right_spherical: prescription.right_spherical,
                right_cylinder: prescription.right_cylinder,
                right_plus: prescription.right_plus,
                right_axis: prescription.right_axis,
                right_pupil_distance: prescription.right_pupil_distance,
                left_spherical: prescription.left_spherical,
                left_cylinder: prescription.left_cylinder,
                left_plus: prescription.left_plus,
                left_axis: prescription.left_axis,
                left_pupil_distance: prescription.left_pupil_distance,
                customers_id: prescription.customers_id
            }
        },

        CLEAR_CUSTOMER(state) {
            state.customer = {
                id: '',
                code: '',
                name: '',
                phone: '',
                email: '',
                address: '',
            }
        },

        CLEAR_PRESCRIPTION(state) {
            state.prescription = {
                id: '',
                right_spherical: '',
                right_cylinder: '',
                right_plus: '',
                right_axis: '',
                right_pupil_distance: '',
                left_spherical: '',
                left_cylinder: '',
                left_plus: '',
                left_axis: '',
                left_pupil_distance: '',
                customers_id: ''
            }
        }
    },

    actions: {
        get_customers({
            commit
        }, customer_keyword) {
            let keyword =
                typeof customer_keyword != 'undefined' ? customer_keyword : ''

            return new Promise((resolve, reject) => {
                CustomerService.get_customers(keyword)
                    .then(response => {
                        commit('SET_CUSTOMERS', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        get_customer_prescriptions({
            commit
        }, customer_id) {
            return new Promise((resolve, reject) => {
                CustomerService.get_customer_prescriptions(customer_id)
                    .then(response => {
                        commit('SET_CUSTOMER', response.data.data.customer)
                        commit('SET_PRESCRIPTIONS', response.data.data.prescriptions)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        show_customer({
            commit
        }, customer_id) {
            return new Promise((resolve, reject) => {
                CustomerService.get_customer(customer_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_CUSTOMER', response.data.data.customer)
                            commit('SET_PRESCRIPTION', response.data.data.prescriptions)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_customer_prescriptions({
            state,
            dispatch,
            commit,
        }, prescription) {
            return new Promise((resolve, reject) => {
                commit('SET_PRESCRIPTION', prescription)

                CustomerService.post_customer_prescriptions(state.prescription.customers_id, state.prescription)
                    .then(response => {
                        dispatch('get_customer_prescriptions', state.prescription.customers_id)
                        commit('CLEAR_PRESCRIPTION')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },

        edit_customer({
            commit
        }, customer_id) {
            return new Promise((resolve, reject) => {
                CustomerService.get_customer_edit(customer_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_CUSTOMER', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_customer({
            state,
            commit
        }, customer) {
            return new Promise((resolve, reject) => {
                commit('SET_CUSTOMER', customer)

                CustomerService.put_customer(state.customer.id, state.customer)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_customer({
            dispatch
        }, customer_id) {
            return new Promise((resolve, reject) => {
                CustomerService.delete_customer(customer_id)
                    .then(response => {
                        dispatch('get_customers')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_customer_prescription({
            state,
            dispatch
        }, prescription_id) {
            return new Promise((resolve, reject) => {
                CustomerService.delete_customer_prescription(prescription_id)
                    .then(response => {
                        dispatch('get_customer_prescriptions', state.customer.id)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        customers: state => state.customers,

        prescriptions: state => state.prescriptions,

        customer: state => state.customer,

        prescription: state => state.prescription,

        customers_length: state => state.customers.length,

        prescriptions_length: state => state.prescriptions.length
    }
}