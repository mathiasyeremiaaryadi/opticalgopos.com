<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title text-center text-md-left">Detail Transaksi</h3>

      <section>
        <div class="form-group row mt-5">
          <div class="col text-center text-md-left">
            <!-- brand and product detail section -->
            <section>
              <h5>Informasi Pelanggan</h5>

              <div class="row mt-4">
                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Kode Pelanggan</strong></p>
                  <p>{{ customer.code }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Nama Pelanggan</strong></p>
                  <p>{{ customer.name }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Nomor Telepon Pelanggan</strong></p>
                  <p>{{ customer.phone }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Email Pelanggan</strong></p>
                  <p>{{ customer.email ? customer.email : `---` }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Alamat Pelanggan</strong></p>
                  <p>{{ customer.address ? customer.address : `---` }}</p>
                </div>
              </div>
            </section>
            <!-- end brand and product detail section -->

            <!-- category detail section -->
            <section class="mt-5">
              <h5>Informasi Kategori</h5>

              <div class="row mt-4">
                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Kode Kategori</strong></p>
                  <p>{{ category.code }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Nama Kategori</strong></p>
                  <p>{{ category.name }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Harga Kategori</strong></p>
                  <p>{{ category.price | currency }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Keterangan Kategori</strong></p>
                  <p>{{ category.description }}</p>
                </div>
              </div>
            </section>
            <!-- end category detail section -->

            <!-- stock detail section -->
            <section class="mt-5">
              <h5>Informasi Transaksi</h5>

              <div class="row mt-4">
                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Kode Transaksi</strong></p>
                  <p>{{ transaction.code }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Tipe Lensa</strong></p>
                  <p>{{ transaction.lens_type }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Total Transaksi (Rp)</strong></p>
                  <p>{{ transaction.total }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Cara Pembayaran Transaksi</strong></p>
                  <p>{{ payment.name }}</p>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Status Transaksi</strong></p>
                  <h5
                    class="badge badge-danger p-2"
                    v-if="transaction.status === 'Gagal'"
                  >
                    {{ transaction.status }}
                  </h5>
                  <h5
                    class="badge badge-success p-2"
                    v-else-if="transaction.status === 'Sukses'"
                  >
                    {{ transaction.status }}
                  </h5>
                  <h5 class="badge badge-warning p-2" v-else>
                    {{ transaction.status }}
                  </h5>
                </div>

                <div class="col-12 col-sm-6 col-lg-3">
                  <p><strong>Tanggal Transaksi</strong></p>
                  <p>
                    {{
                      transaction.transaction_date
                        ? transaction.transaction_date
                        : `---`
                    }}
                  </p>
                </div>
              </div>
            </section>
            <!-- end stock detail section -->

            <div class="row">
              <div class="col-lg-3 col-md-12 col-12 offset-lg-9">
                <router-link :to="{ name: 'transactions.data' }">
                  <button
                    type="submit"
                    class="btn btn-lg btn-block btn-success mt-3 text-white"
                  >
                    Kembali
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'ShowTransaction',

  created() {
    this.show_transaction(this.$route.params.id).then(response => {
      if (response.status === 'not found') {
        this.$swal({
          icon: 'error',
          title: 'Gagal',
          text: 'Data transaksi ini tidak ditemukan'
        })

        this.$router.push({ name: 'transactions.data' })
      }
    })
  },

  computed: {
    ...mapGetters('transaction', [
      'transaction',
      'customer',
      'category',
      'payment'
    ])
  },

  methods: {
    ...mapActions('transaction', ['show_transaction']),
    ...mapMutations('transaction', [
      'CLEAR_CUSTOMER',
      'CLEAR_CATEGORY',
      'CLEAR_PAYMENT',
      'CLEAR_TRANSACTION'
    ])
  },

  destroyed() {
    this.CLEAR_CUSTOMER()
    this.CLEAR_CATEGORY()
    this.CLEAR_PAYMENT()
    this.CLEAR_TRANSACTION()
  }
}
</script>

<style></style>
