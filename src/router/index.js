/* eslint-disable prettier/prettier */
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

// Third party library
import NProgress from 'nprogress'

// Login views
import Login from '../views/Login.vue'

// Profile views
import IndexProfile from '../views/profiles/Index.vue'
import EditProfile from '../views/profiles/Edit.vue'

// Dashboard views
import IndexDashboard from '../views/Index.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'

// Product views
import IndexProduct from '../views/products/Index.vue'
import DataProduct from '../views/products/Product.vue'
import CreateProduct from '../views/products/Create.vue'
import EditProduct from '../views/products/Edit.vue'

// Product views
import IndexBrand from '../views/brands/Index.vue'
import DataBrand from '../views/brands/Brand.vue'
import CreateBrand from '../views/brands/Create.vue'
import EditBrand from '../views/brands/Edit.vue'

// Category views
import IndexCategory from '../views/categories/Index.vue'
import DataCategory from '../views/categories/Category.vue'
import CreateCategory from '../views/categories/Create.vue'
import EditCategory from '../views/categories/Edit.vue'

// Employee views
import IndexEmployee from '../views/employees/Index.vue'
import DataEmployee from '../views/employees/Employee.vue'
import CreateEmployee from '../views/employees/Create.vue'
import EditEmployee from '../views/employees/Edit.vue'

// Payments views
import IndexPayment from '../views/payments/Index.vue'
import DataPayment from '../views/payments/Payment.vue'
import CreatePayment from '../views/payments/Create.vue'
import EditPayment from '../views/payments/Edit.vue'

// Stock views
import IndexStock from '../views/stocks/Index.vue'
import DataStock from '../views/stocks/Stock.vue'
import CreateStock from '../views/stocks/Create.vue'
import EditStock from '../views/stocks/Edit.vue'
import ShowStock from '../views/stocks/Show.vue'

// Transaction views
import IndexTransaction from '../views/transactions/Index.vue'
import DataTransaction from '../views/transactions/Transaction.vue'
import CreateTransaction from '../views/transactions/Create.vue'
import EditTransaction from '../views/transactions/Edit.vue'
import ShowTransaction from '../views/transactions/Show.vue'

// Customer views
import IndexCustomer from '../views/customers/Index.vue'
import DataCustomer from '../views/customers/Customer.vue'
import CreateCustomerPrescription from '../views/customers/CreatePrescription.vue'
import EditCustomer from '../views/customers/Edit.vue'
import ShowCustomer from '../views/customers/Show.vue'

Vue.use(VueRouter)

const routes = [
  // Authentication routes
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // Dashboard routes
  {
    path: '/',
    component: IndexDashboard,
    meta: {
      auth: true
    },
    children: [{
        path: '',
        name: 'dashboard',
        component: Dashboard
      },

      // Profile Routes
      {
        path: 'profil',
        component: IndexProfile,
        children: [{
          path: 'ubah/:id',
          name: 'profiles.edit',
          component: EditProfile
        }]
      },

      // Product routes
      {
        path: 'produk',
        component: IndexProduct,
        children: [{
            path: '',
            name: 'products.data',
            component: DataProduct,
            beforeEnter(to, from, next) {
              store.dispatch('product/get_products',
                  to.params.id)
                .then(products => {
                  to.params.products = products

                  next()
                })
            }
          },
          {
            path: 'tambah',
            name: 'products.create',
            component: CreateProduct
          },
          {
            path: 'ubah/:id',
            name: 'products.edit',
            component: EditProduct,
            beforeEnter(to, from, next) {
              store.dispatch('product/edit_product',
                  to.params.id)
                .then(product => {
                  to.params.product = product

                  next()
                })
            }
          }
        ]
      },

      // Brand routes
      {
        path: 'merk',
        component: IndexBrand,
        children: [{
            path: '',
            name: 'brands.data',
            component: DataBrand,
            beforeEnter(to, from, next) {
              store.dispatch('brand/get_brands',
                  to.params.id)
                .then(brands => {
                  to.params.brands = brands

                  next()
                })
            }
          },
          {
            path: 'tambah',
            name: 'brands.create',
            component: CreateBrand
          },
          {
            path: 'ubah/:id',
            name: 'brands.edit',
            component: EditBrand,
            beforeEnter(to, from, next) {
              store.dispatch('brand/edit_brand',
                  to.params.id)
                .then(brand => {
                  to.params.brand = brand

                  next()
                })
            }
          }
        ]
      },

      // Category routes
      {
        path: 'kategori',
        component: IndexCategory,
        children: [{
            path: '',
            name: 'categories.data',
            component: DataCategory,
            beforeEnter(to, from, next) {
              store.dispatch('category/get_categories')
                .then(categories => {
                  to.params.categories = categories

                  next()
                })
            }
          },
          {
            path: 'tambah',
            name: 'categories.create',
            component: CreateCategory
          },
          {
            path: 'ubah/:id',
            name: 'categories.edit',
            component: EditCategory,
            beforeEnter(to, from, next) {
              store.dispatch('category/edit_category',
                  to.params.id)
                .then(category => {
                  to.params.category = category

                  next()
                })
            }
          }
        ]
      },

      // Employee routes
      {
        path: 'karyawan',
        component: IndexEmployee,
        meta: {
          owner: true
        },
        children: [{
            path: '',
            name: 'employees.data',
            component: DataEmployee,
            beforeEnter(to, from, next) {
              store.dispatch('employee/get_employees')
                .then(employees => {
                  to.params.employees = employees

                  next()
                })
            }
          },
          {
            path: 'tambah',
            name: 'employees.create',
            component: CreateEmployee
          },
          {
            path: 'ubah/:id',
            name: 'employees.edit',
            component: EditEmployee,
            beforeEnter(to, from, next) {
              store.dispatch('employee/edit_employee',
                  to.params.id)
                .then(employee => {
                  to.params.employee = employee

                  next()
                })
            }
          }
        ]
      },

      // Payment routes
      {
        path: 'pembayaran',
        component: IndexPayment,
        children: [{
            path: '',
            name: 'payments.data',
            component: DataPayment,
            beforeEnter(to, from, next) {
              store.dispatch('payment/get_payments')
                .then(payments => {
                  to.params.payments = payments

                  next()
                })
            }
          },
          {
            path: 'tambah',
            name: 'payments.create',
            component: CreatePayment
          },
          {
            path: 'ubah/:id',
            name: 'payments.edit',
            component: EditPayment,
            beforeEnter(to, from, next) {
              store.dispatch('payment/edit_payment',
                  to.params.id)
                .then(payment => {
                  to.params.payment = payment

                  next()
                })
            }
          }
        ]
      },

      // Stock routes
      {
        path: 'stok',
        component: IndexStock,
        children: [{
            path: '',
            name: 'stocks.data',
            component: DataStock,
            beforeEnter(to, from, next) {
              store.dispatch('stock/get_stocks')
                .then(stocks => {
                  to.params.stocks = stocks

                  next()
                })
            }
          },
          {
            path: 'tambah',
            name: 'stocks.create',
            component: CreateStock
          },
          {
            path: 'ubah/:id',
            name: 'stocks.edit',
            component: EditStock,
            beforeEnter(to, from, next) {
              store.dispatch('stock/edit_stock',
                  to.params.id)
                .then(stock => {
                  to.params.stock = stock

                  next()
                })
            }
          },
          {
            path: 'detail/:id',
            name: 'stocks.show',
            component: ShowStock,
            beforeEnter(to, from, next) {
              store.dispatch('stock/show_stock',
                  to.params.id)
                .then(stock => {
                  to.params.stock = stock

                  next()
                })
            }
          }
        ]
      },

      // Transaction routes
      {
        path: 'transaksi',
        component: IndexTransaction,
        children: [{
            path: '',
            name: 'transactions.data',
            component: DataTransaction,
            beforeEnter(to, from, next) {
              store.dispatch('transaction/get_transactions')
                .then(transactions => {
                  to.params.transactions = transactions

                  next()
                })
            }
          },
          {
            path: 'tambah',
            name: 'transactions.create',
            component: CreateTransaction
          },
          {
            path: 'ubah/:id',
            name: 'transactions.edit',
            component: EditTransaction,
            beforeEnter(to, from, next) {
              store.dispatch('transaction/edit_transaction',
                  to.params.id)
                .then(transaction => {
                  to.params.transaction = transaction

                  next()
                })
            }
          },
          {
            path: 'detail/:id',
            name: 'transactions.show',
            component: ShowTransaction,
            beforeEnter(to, from, next) {
              store.dispatch('transaction/show_transaction',
                  to.params.id)
                .then(transaction => {
                  to.params.transaction = transaction

                  next()
                })
            }
          }
        ]
      },

      // Customer routes
      {
        path: 'pelanggan',
        component: IndexCustomer,
        children: [{
            path: '',
            name: 'customers.data',
            component: DataCustomer,
            beforeEnter(to, from, next) {
              store.dispatch('customer/get_customers')
                .then(customers => {
                  to.params.customers = customers

                  next()
                })
            }
          },
          {
            path: 'tambah/resep-mata/:id',
            name: 'customers.prescription.create',
            component: CreateCustomerPrescription
          },
          {
            path: 'ubah/:id',
            name: 'customers.edit',
            component: EditCustomer,
            beforeEnter(to, from, next) {
              store.dispatch('customer/edit_customer',
                  to.params.id)
                .then(customers => {
                  to.params.customers = customers

                  next()
                })
            }
          },
          {
            path: 'detail/:id',
            name: 'customers.show',
            component: ShowCustomer
          }
        ]
      }

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.matched.some(record => record.meta.auth) && !store.getters.is_logged_in) {
    next({
      name: 'login'
    })
  }

  if (to.matched.some(record => record.meta.auth) && store.getters.logged_user.role === 1) {
    next({
      name: 'dashboard'
    })
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router