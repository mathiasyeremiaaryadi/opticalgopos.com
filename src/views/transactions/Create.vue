<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Transaksi dan Pelanggan</h3>

      <form class="form" @submit.prevent="submit()">
        <!-- transaction form section -->
        <section>
          <div class="form-group row mt-5">
            <div class="col">
              <h5>Tambah Transaksi</h5>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Kode Transaksi</label>

            <div class="col-md-9">
              <input
                class="form-control"
                type="text"
                autocomplete="off"
                placeholder="Akan di generate otomatis"
                disabled
              />
              <span class="help-block">Contoh: TRX0001</span>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Tipe Lensa</label>

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Tipe lensa . . ."
                v-model="transaction.lens_type"
                :class="{ 'is-invalid': $v.transaction.lens_type.$error }"
                @blur="$v.transaction.lens_type.$touch()"
              />

              <template v-if="$v.transaction.lens_type.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.transaction.lens_type.required"
                  >Tipe lensa wajib diisi</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Total Transaksi</label>

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Total transaksi . . ."
                v-model="transaction.total"
                :class="{ 'is-invalid': $v.transaction.total.$error }"
                @blur="$v.transaction.total.$touch()"
              />

              <template v-if="$v.transaction.total.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.transaction.total.required"
                  >Total transaksi wajib diisi</span
                >

                <span
                  class="help-block text-danger"
                  v-if="!$v.transaction.total.numeric"
                  >Total transaksi harus dalam angka</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Status Transaksi</label>

            <div class="col-md-9">
              <select
                class="form-control form-control-md"
                v-model="transaction.status"
                :class="{ 'is-invalid': $v.transaction.status.$error }"
                @blur="$v.transaction.status.$touch()"
              >
                <option value="" disabled>Pilih Status Transaksi . . .</option>
                <option value="Gagal">Gagal</option>
                <option value="Sukses">Sukses</option>
                <option value="Pending">Pending</option>
              </select>

              <template v-if="$v.transaction.status.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.transaction.status.required"
                  >Status transaksi wajib diisi</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label"
              >Cara Pembayaran Transaksi</label
            >

            <div class="col-md-9">
              <select
                class="form-control form-control-md"
                v-model="transaction.payments_id"
                :class="{ 'is-invalid': $v.transaction.payments_id.$error }"
                @blur="$v.transaction.payments_id.$touch()"
              >
                <option value="" disabled
                  >Pilih Cara Pembayaran Transaksi . . .</option
                >
                <option
                  v-for="payment in payments"
                  :key="payment.id"
                  :value="payment.id"
                  >{{ payment.name }}</option
                >
              </select>

              <template v-if="$v.transaction.payments_id.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.transaction.payments_id.required"
                  >Cara pembayaran transaksi wajib diisi</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Kategori Produk</label>

            <div class="col-md-9">
              <select
                class="form-control form-control-md"
                v-model="transaction.categories_id"
                :class="{ 'is-invalid': $v.transaction.categories_id.$error }"
                @blur="$v.transaction.categories_id.$touch()"
              >
                <option value="" disabled>Pilih Kategori Produk . . .</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  >{{ category.code }} - {{ category.name }}</option
                >
              </select>

              <template v-if="$v.transaction.categories_id.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.transaction.categories_id.required"
                  >Kategori produk wajib diisi</span
                >
              </template>

              <div class="card mt-3" v-show="category_exist">
                <div class="card-header">
                  <p><strong>Detail Kategori</strong></p>
                </div>

                <div class="card-body text-justify">
                  <div class="row">
                    <div class="col-6">
                      <p><strong>Kode</strong></p>
                      <p>{{ category.code }}</p>
                    </div>
                    <div class="col-6">
                      <p><strong>Nama</strong></p>
                      <p>{{ category.name }}</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-6">
                      <p><strong>Harga</strong></p>
                      <p>{{ category.price | currency }}</p>
                    </div>
                    <div class="col-6">
                      <p><strong>Keterangan</strong></p>
                      <p>
                        {{ category.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- end transaction form section -->

        <!-- customer form section -->
        <section>
          <div class="form-group row mt-5">
            <div class="col">
              <h5>Tambah Pelanggan</h5>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Kode Pelanggan</label>
            <div class="col-md-9">
              <input
                class="form-control"
                type="text"
                autocomplete="off"
                placeholder="Akan di generate otomatis"
                disabled
              />
              <span class="help-block">Contoh: PLG0001</span>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Nama Pelanggan</label>

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Nama pelanggan . . ."
                v-model="customer.name"
                :class="{ 'is-invalid': $v.customer.name.$error }"
                @blur="$v.customer.name.$touch()"
              />

              <template v-if="$v.customer.name.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.name.required"
                  >Nama pelanggan wajib diisi</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label"
              >Nomor Telepon Pelanggan</label
            >

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Nomor telepon pelanggan . . ."
                v-model="customer.phone"
                :class="{ 'is-invalid': $v.customer.phone.$error }"
                @blur="$v.customer.phone.$touch()"
              />

              <template v-if="$v.customer.phone.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.phone.required"
                  >Nomor telepon pelanggan wajib diisi</span
                >

                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.phone.numeric"
                  >Nomor telepon pelanggan harus dalam angka</span
                >
              </template>
            </div>
          </div>
        </section>
        <!-- end customer form section -->

        <div class="form-group row">
          <div class="col-lg-3 col-md-12 col-12 offset-lg-9">
            <button
              type="submit"
              class="btn btn-lg btn-block btn-success mt-3 text-white"
            >
              Tambah
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

import { required, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'CreateCustomer',

  created() {
    this.get_categories()
    this.get_payments()
  },

  data() {
    return {
      category_exist: false
    }
  },

  validations: {
    transaction: {
      lens_type: {
        required
      },

      total: {
        required,
        numeric
      },

      status: {
        required
      },

      payments_id: {
        required
      },

      categories_id: {
        required
      }
    },

    customer: {
      name: {
        required
      },

      phone: {
        required,
        numeric
      }
    }
  },

  watch: {
    'transaction.categories_id'() {
      this.show_category(this.transaction.categories_id)
        .then(() => {
          this.category_exist = true
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  computed: {
    ...mapGetters('transaction', ['transaction', 'customer']),

    ...mapGetters('payment', ['payments']),

    ...mapGetters('category', ['categories', 'category'])
  },

  methods: {
    ...mapActions('transaction', ['create_transaction']),
    ...mapMutations('transaction', ['CLEAR_CUSTOMER', 'CLEAR_TRANSACTION']),

    ...mapActions('payment', ['get_payments']),

    ...mapActions('category', ['get_categories', 'show_category']),

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.create_transaction({
          transaction: this.transaction,
          customer: this.customer
        })
          .then(response => {
            console.log(this.transaction)

            if (response.status === 'success') {
              this.$swal({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data transaksi berhasil ditambahkan'
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Gagal',
                text: 'Data transaksi gagal ditambahkan'
              })
            }

            this.$router.push({ name: 'transactions.data' })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  destroyed() {
    this.CLEAR_CUSTOMER()
    this.CLEAR_TRANSACTION()
  }
}
</script>

<style></style>
