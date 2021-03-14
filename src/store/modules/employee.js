/* eslint-disable prettier/prettier */
import EmployeeService from '@/services/EmployeeService.js'

export default {
    namespaced: true,

    state() {
        return {
            employees: [],

            employee: {
                id: '',
                code: '',
                name: '',
                phone: '',
                address: '',
                date_of_birth: '',
                email: ''
            },
        }
    },

    mutations: {
        SET_EMPLOYEES(state, employees) {
            state.employees = employees
        },

        SET_EMPLOYEE(state, employee) {
            state.employee = {
                id: employee.id,
                code: employee.code,
                name: employee.name,
                phone: employee.phone,
                address: employee.address,
                date_of_birth: employee.date_of_birth,
                email: employee.email
            }
        },

        CLEAR_EMPLOYEE(state) {
            state.employee = {
                id: '',
                code: '',
                name: '',
                phone: '',
                address: '',
                date_of_birth: '',
                email: ''
            }
        },
    },

    actions: {
        get_employees({
            commit
        }, employee_keyword) {
            let keyword =
                typeof employee_keyword != 'undefined' ? employee_keyword : ''

            return new Promise((resolve, reject) => {
                EmployeeService.get_employees(keyword)
                    .then(response => {
                        commit('SET_EMPLOYEES', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        get_employee({
            commit
        }, employee_id) {
            return new Promise((resolve, reject) => {
                EmployeeService.get_employee(employee_id)
                    .then(response => {
                        commit('SET_EMPLOYEE', response.data.data)

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        create_employee({
            state,
            commit
        }, employee) {
            return new Promise((resolve, reject) => {
                commit('SET_EMPLOYEE', employee)

                EmployeeService.post_employee(state.employee)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        edit_employee({
            commit
        }, employee_id) {
            return new Promise((resolve, reject) => {
                EmployeeService.get_employee_edit(employee_id)
                    .then(response => {
                        if (response.data.status === 'success') {
                            commit('SET_EMPLOYEE', response.data.data)
                        }

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        update_employee({
            state,
            commit
        }, employee) {
            return new Promise((resolve, reject) => {
                commit('SET_EMPLOYEE', employee)

                EmployeeService.put_employee(state.employee.id, state.employee)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        delete_employee({
            dispatch
        }, employee_id) {
            return new Promise((resolve, reject) => {
                EmployeeService.delete_employee(employee_id)
                    .then(response => {
                        dispatch('get_employees')

                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },

    getters: {
        employees: state => state.employees,

        employee: state => state.employee,

        employees_length: state => state.employees.length,
    }
}