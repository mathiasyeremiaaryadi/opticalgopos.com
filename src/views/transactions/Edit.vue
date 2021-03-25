<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Ubah Transaksi</h3>

      <!-- customer detail section -->
      <section>
        <h5>Informasi Pelanggan</h5>

        <div class="row mt-4">
          <div class="col-6 col-md-4">
            <p><strong>Kode Pelanggan</strong></p>
            <p>{{ customer.code }}</p>
          </div>

          <div class="col-6 col-md-4">
            <p><strong>Nama Pelanggan</strong></p>
            <p>{{ customer.name }}</p>
          </div>

          <div class="col-6 col-md-4">
            <p><strong>Nomor Telepon Pelanggan</strong></p>
            <p>{{ customer.phone }}</p>
          </div>
        </div>
      </section>
      <!-- end customer detail section -->

      <form class="form" @submit.prevent="submit()">
        <!-- transaction form section -->
        <section>
          <div class="form-group row mt-5">
            <div class="col">
              <h5>Ubah Transaksi</h5>
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
              />
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
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Status Transaksi</label>

            <div class="col-md-9">
              <select
                class="form-control form-control-md"
                v-model="transaction.status"
              >
                <option value="" disabled>Pilih Status Transaksi . . .</option>
                <option value="Gagal">Gagal</option>
                <option value="Sukses">Sukses</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Tanggal Transaksi</label>

            <div class="col-md-9">
              <div>
                <date-picker
                  v-model="transaction.transaction_date"
                  type="date"
                  valueType="YYYY-MM-DD"
                ></date-picker>
              </div>
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
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Kategori Produk</label>

            <div class="col-md-9">
              <select
                class="form-control form-control-md"
                v-model="transaction.categories_id"
              >
                <option value="" disabled>Pilih Kategori Produk . . .</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  >{{ category.code }} - {{ category.name }}</option
                >
              </select>

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

        <div class="form-group row">
          <div class="col-lg-3 col-md-12 col-12 offset-lg-9">
            <button
              type="submit"
              class="btn btn-lg btn-block btn-success mt-3 text-white"
            >
              Ubah
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditCustomer',

  created() {
    this.get_categories()

    this.get_payments()
    this.edit_transaction(this.$route.params.id)
      .then(response => {
        if (response.status === 'not found') {
          this.$swal({
            icon: 'error',
            title: 'Gagal',
            text: 'Data transaksi ini tidak ditemukan'
          })

          this.$router.push({ name: 'transactions.data' })
        }
      })
      .catch(error => {
        console.log(error)
      })
  },

  data() {
    return {
      category_exist: false
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
    ...mapActions('transaction', ['edit_transaction', 'update_transaction']),
    ...mapMutations('transaction', ['CLEAR_CUSTOMER', 'CLEAR_TRANSACTION']),

    ...mapActions('category', ['show_category']),

    ...mapActions('payment', ['get_payments']),
    ...mapActions('category', ['get_categories', 'show_category']),

    submit() {
      this.update_transaction(this.transaction)
        .then(response => {
          if (response.status === 'success') {
            this.$swal({
              icon: 'success',
              title: 'Berhasil',
              text: 'Data transaksi berhasil diubah'
            })

            this.$router.push({ name: 'transactions.data' })
          } else {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Data transaksi gagal diubah'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  destroyed() {
    this.CLEAR_CUSTOMER()
    this.CLEAR_TRANSACTION()
  }
}
</script>

<style></style>
