/* eslint-disable prettier/prettier */
import Vue from 'vue'
import Vuex from 'vuex'

import AuthService from '@/services/AuthService.js'

// Modules
import product from '@/store/modules/product.js'
import brand from '@/store/modules/brand.js'
import category from '@/store/modules/category.js'
import employee from '@/store/modules/employee.js'
import payment from '@/store/modules/payment.js'
import stock from '@/store/modules/stock.js'
import customer from '@/store/modules/customer.js'
import transaction from '@/store/modules/transaction.js'
import auth from '@/store/modules/auth.js'
import admin from '@/store/modules/admin.js'
import dashboard from '@/store/modules/dashboard.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    product,
    brand,
    category,
    employee,
    payment,
    stock,
    customer,
    transaction,
    auth,
    admin,
    dashboard
  },

  state: {
    is_navbar_toggled: false,
    token: sessionStorage.getItem('user-pos-token'),
    logged_user: {}
  },

  mutations: {
    SET_NAVBAR_TOGGLE(state) {
      state.is_navbar_toggled = !state.is_navbar_toggled
    },

    SET_TOKEN(state, token) {
      state.token = token
    },

    SET_LOGGED_USER(state, logged_user) {
      state.logged_user = logged_user
    },

    CLEAR_LOGGED_USER(state) {
      state.logged_users = {}
    },
  },

  actions: {
    change_navbar_toggle({
      commit
    }) {
      commit('SET_NAVBAR_TOGGLE')
    },

    get_logged_user({
      commit
    }) {
      return new Promise((resolve, reject) => {
        AuthService.get_auth_user().then(response => {
            commit('SET_LOGGED_USER', response.data.data)

            resolve()
          })
          .catch(error => {
            console.log(error)

            reject(error)
          })
      })
    }
  },

  getters: {
    is_navbar_toggled: state => state.is_navbar_toggled,

    is_logged_in: state => state.token != 'null' && state.token != null,

    logged_user: state => state.logged_user
  }
})