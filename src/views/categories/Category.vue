<template>
  <!-- Content -->
  <div class="col-md-12 col-lg-12">
    <!-- Title Page -->
    <div class="row">
      <div class="col-lg-9 col-sm-12">
        <h3 class="card-title text-center text-md-left">Daftar Kategori</h3>
      </div>
      <div class="col-lg-3 col-sm-12">
        <router-link
          :to="{ name: 'categories.create' }"
          class="btn btn-sm btn-success btn-block text-white"
        >
          <i class="fas fa-plus fa-lg"></i> Tambah Kategori
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
                v-model="category_keyword"
              />
              <span class="input-group-append">
                <button class="btn btn-primary" type="button">
                  Cari Kategori
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
                v-model="category_keyword"
              />
            </div>
          </div>
        </div>

        <!-- Table Data -->
        <div class="table-responsive" v-if="categories_length > 0">
          <table class="table table-hover text-center text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Kode</th>
                <th>Nama</th>
                <th>Keterangan</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(category, index) in categories" :key="category.id">
                <td>{{ index + 1 }}</td>
                <td>{{ category.code }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>{{ category.price | currency }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'categories.edit',
                      params: { id: category.id }
                    }"
                    class="btn btn-sm btn-warning text-dark"
                  >
                    <i class="fas fa-edit fa-lg"></i> Ubah
                  </router-link>

                  <button
                    type="button"
                    class="btn btn-sm btn-danger ml-2"
                    @click="remove_category(category.id)"
                  >
                    <i class="fas fa-trash-alt fa-lg"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-5" v-else>
          <h3 class="text-center">-- Tidak Ada Data Kategori --</h3>
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
  name: 'DataCategory',

  data() {
    return {
      category_keyword: ''
    }
  },

  watch: {
    category_keyword() {
      this.get_categories(this.category_keyword)
    }
  },

  computed: {
    ...mapGetters('category', ['categories', 'categories_length'])
  },

  methods: {
    ...mapActions('category', ['get_categories', 'delete_category']),

    remove_category(category_id) {
      this.$swal({
        icon: 'warning',
        title: 'Konfirmasi Hapus Data',
        text: 'Apakah yakin ingin menghapus data ini?',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
      }).then(result => {
        if (result.isConfirmed) {
          this.delete_category(category_id)
            .then(response => {
              if (response.status === 'success') {
                this.$swal({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Data kategori berhasil dihapus'
                })
              } else if (response.status === 'restricted') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text:
                    'Data kategori ini masih memiliki stok, mohon untuk menghapus data stok tersebut'
                })
              } else if (response.status === 'not found') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data kategori ini tidak ditemukan'
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data kategori gagal dihapus'
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
