<template>
  <!-- Content -->
  <div class="col-md-12 col-lg-12">
    <!-- Title Page -->
    <div class="row">
      <div class="col-lg-9 col-sm-12">
        <h3 class="card-title text-center text-md-left">Daftar Pelanggan</h3>
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
                v-model="customer_keyword"
              />
              <span class="input-group-append">
                <button class="btn btn-primary" type="button">
                  Cari Pelanggan
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
                v-model="customer_keyword"
              />
            </div>
          </div>
        </div>

        <!-- Table Data -->
        <div class="table-responsive" v-if="customers_length > 0">
          <table class="table table-hover text-center text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Kode</th>
                <th>Nama</th>
                <th>No. Telp</th>
                <th>Resep</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(customer, index) in customers" :key="customer.id">
                <td>{{ index + 1 }}</td>
                <td>{{ customer.code }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.phone }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'customers.prescription.create',
                      params: { id: customer.id }
                    }"
                    class="btn btn-sm btn-success text-white"
                  >
                    <i class="fas fa-plus fa-lg"></i> Tambah
                  </router-link>

                  <router-link
                    :to="{
                      name: 'customers.show',
                      params: { id: customer.id }
                    }"
                    class="btn btn-sm btn-primary ml-2"
                  >
                    <i class="fas fa-eye fa-lg"></i> Lihat
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'customers.edit',
                      params: { id: customer.id }
                    }"
                    class="btn btn-sm btn-warning text-dark"
                  >
                    <i class="fas fa-edit fa-lg"></i> Ubah
                  </router-link>

                  <button
                    type="button"
                    class="btn btn-sm btn-danger ml-2"
                    @click="remove_customer(customer.id)"
                  >
                    <i class="fas fa-trash-alt fa-lg"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5" v-else>
          <h3 class="text-center">-- Tidak Ada Data Pelanggan --</h3>
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
  name: 'DataCustomer',

  data() {
    return {
      customer_keyword: ''
    }
  },

  watch: {
    customer_keyword() {
      this.get_customers(this.customer_keyword)
    }
  },

  computed: {
    ...mapGetters('customer', ['customers', 'customers_length'])
  },

  methods: {
    ...mapActions('customer', ['get_customers', 'delete_customer']),

    remove_customer(customer_id) {
      this.$swal({
        icon: 'warning',
        title: 'Konfirmasi Hapus Data',
        text:
          'Apakah yakin ingin menghapus data ini? (Semua resep akan terhapus)',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
      }).then(result => {
        if (result.isConfirmed) {
          this.delete_customer(customer_id)
            .then(response => {
              if (response.status === 'success') {
                this.$swal({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Data pelanggan berhasil dihapus'
                })
              } else if (response.status === 'not found') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data pelanggan ini tidak ditemukan'
                })
              } else if (response.status === 'restricted') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data pelanggan ini masih memiliki transaksi'
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data pelanggan gagal dihapus'
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
