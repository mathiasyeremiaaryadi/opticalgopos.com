<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Produk</h3>

      <form class="form" @submit.prevent="submit()">
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Kode Produk</label>
          <div class="col-md-9">
            <input
              class="form-control"
              type="text"
              autocomplete="off"
              placeholder="Akan di generate otomatis"
              disabled
            />
            <span class="help-block">Contoh: PRD0001</span>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nama Produk</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Nama jenis produk . . ."
              v-model="product.name"
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
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'CreateProduct',

  computed: {
    ...mapGetters('product', ['product'])
  },

  methods: {
    ...mapActions('product', ['create_product']),
    ...mapMutations('product', ['CLEAR_PRODUCT']),

    submit() {
      this.create_product(this.product)
        .then(response => {
          if (response.status === 'success') {
            this.$swal({
              icon: 'success',
              title: 'Berhasil',
              text: 'Data produk berhasil ditambahkan'
            })
          } else {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Data produk gagal ditambahkan'
            })
          }

          this.$router.push({ name: 'products.data' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  destroyed() {
    this.CLEAR_PRODUCT()
  }
}
</script>

<style></style>
