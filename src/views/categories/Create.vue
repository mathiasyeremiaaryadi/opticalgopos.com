<template>
  <div class="col-md-12 col-lg-12">
    <div class="card mb-4">
      <div class="card-block">
        <h3 class="card-title">Tambah Kategori</h3>

        <form class="form" @submit.prevent="submit()">
          <div class="form-group row">
            <label class="col-md-3 col-form-label">Kode Kategori</label>
            <div class="col-md-9">
              <input
                class="form-control"
                type="text"
                autocomplete="off"
                placeholder="Akan di generate otomatis"
                disabled
              />
              <span class="help-block">Contoh: KTG0001</span>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Nama Kategori</label>
            <div class="col-md-9">
              <input
                type="text"
                autocomplete="off"
                class="form-control"
                placeholder="Nama kategori . . ."
                v-model="category.name"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Keterangan Kategori</label>
            <div class="col-md-9">
              <input
                type="text"
                autocomplete="off"
                class="form-control"
                placeholder="Keterangan kategori . . ."
                v-model="category.description"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Harga (Rp)</label>
            <div class="col-md-9">
              <input
                type="text"
                autocomplete="off"
                class="form-control"
                placeholder="Harga kategori . . ."
                v-model="category.price"
              />
            </div>
          </div>

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
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'CreateCategory',

  computed: {
    ...mapGetters('category', ['category'])
  },

  methods: {
    ...mapActions('category', ['create_category']),
    ...mapMutations('category', ['CLEAR_CATEGORY']),

    submit() {
      this.create_category(this.category)
        .then(response => {
          if (response.status === 'success') {
            this.$swal({
              icon: 'success',
              title: 'Berhasil',
              text: 'Data kategori berhasil ditambahkan'
            })
          } else {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Data kategori gagal ditambahkan'
            })
          }

          this.$router.push({ name: 'categories.data' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  destroyed() {
    this.CLEAR_CATEGORY()
  }
}
</script>

<style></style>
