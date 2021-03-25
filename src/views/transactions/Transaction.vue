<template>
  <!-- Content -->
  <div class="col-md-12 col-lg-12">
    <!-- Title Page -->
    <div class="row">
      <div class="col-lg-9 col-sm-12">
        <h3 class="card-title text-center text-md-left">Daftar Transaksi</h3>
      </div>
      <div class="col-lg-3 col-sm-12">
        <router-link :to="{ name: 'transactions.create' }">
          <button type="button" class="btn btn-sm btn-success btn-block">
            <i class="fas fa-plus fa-lg"></i> Tambah Transaksi
          </button>
        </router-link>
      </div>
    </div>
    <!-- End Title Page -->

    <div class="card mt-3 mb-4">
      <div class="card-block">
        <div class="row mb-md-4 justify-content-end">
          <div class="d-none d-md-block col-12 col-lg-4 mb-2 mb-md-0">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Kata kunci . . ."
                v-model="transaction_keyword"
              />
              <span class="input-group-append">
                <button class="btn btn-primary" type="button">
                  Cari Transaksi
                </button>
              </span>
            </div>
          </div>

          <div class="d-block d-md-none col-12 mb-2 mb-md-0">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Kata kunci . . ."
                v-model="transaction_keyword"
              />
            </div>
          </div>
        </div>

        <!-- Table Data -->
        <div class="table-responsive" v-if="transactions_length > 0">
          <table class="table table-hover text-center text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Kode</th>
                <th>Tanggal Transaksi</th>
                <th>Tipe Lensa</th>
                <th>Total</th>
                <th>Pembayaran</th>
                <th>Status</th>
                <th>Detail</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(transaction, index) in transactions"
                :key="transaction.id"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ transaction.code }}</td>
                <td>
                  {{
                    transaction.transaction_date
                      ? transaction.transaction_date
                      : `---`
                  }}
                </td>
                <td>{{ transaction.lens_type }}</td>
                <td>{{ transaction.total | currency }}</td>
                <td>{{ transaction.payment.name }}</td>

                <td>
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
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'transactions.show',
                      params: { id: transaction.id }
                    }"
                  >
                    <button type="button" class="btn btn-sm btn-primary">
                      <i class="fas fa-eye fa-lg"></i> Lihat
                    </button>
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'transactions.edit',
                      params: { id: transaction.id }
                    }"
                  >
                    <button type="button" class="btn btn-sm btn-warning ml-2">
                      <i class="fas fa-edit fa-lg"></i> Ubah
                    </button>
                  </router-link>

                  <button
                    type="button"
                    class="btn btn-sm btn-danger ml-2"
                    @click="remove_transaction(transaction.id)"
                  >
                    <i class="fas fa-trash-alt fa-lg"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5" v-else>
          <h3 class="text-center">-- Tidak Ada Data Transaksi --</h3>
        </div>
        <!-- End Table Data -->
      </div>
    </div>
    <!-- End Content -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DataTransaction',

  data() {
    return {
      transaction_keyword: ''
    }
  },

  watch: {
    transaction_keyword() {
      this.get_transactions(this.transaction_keyword)
    }
  },

  computed: {
    ...mapGetters('transaction', ['transactions', 'transactions_length'])
  },

  methods: {
    ...mapActions('transaction', ['get_transactions', 'delete_transaction']),

    remove_transaction(transaction_id) {
      this.$swal({
        icon: 'warning',
        title: 'Konfirmasi Hapus Data',
        text: 'Apakah yakin ingin menghapus data ini?',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
      }).then(result => {
        if (result.isConfirmed) {
          this.delete_transaction(transaction_id)
            .then(response => {
              if (response.status === 'success') {
                this.$swal({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Data transaksi berhasil dihapus'
                })
              } else if (response.data.status === 'not found') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data transaksi ini tidak ditemukan'
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data transaksi gagal dihapus'
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
  }
}
</script>

<style></style>
