<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Ubah Pelanggan dan Resep</h3>

      <form class="form" @submit.prevent="submit()">
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
                  v-if="!$v.customer.phone.numeric"
                  >Nomor telepon pelanggan harus dalam angka</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Email Pelanggan</label>

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Email pelanggan . . ."
                v-model="customer.email"
                :class="{ 'is-invalid': $v.customer.email.$error }"
                @blur="$v.customer.email.$touch()"
              />

              <template v-if="$v.customer.email.$error">
                <span
                  class="help-block text-danger"
                  v-if="!$v.customer.email.email"
                  >Email pelanggan harus dalam format email</span
                >
              </template>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label">Alamat Pelanggan</label>

            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                placeholder="Alamat pelanggan . . ."
                v-model="customer.address"
              />
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

import { required, numeric, email } from 'vuelidate/lib/validators'

export default {
  name: 'CreateCustomer',

  created() {
    this.edit_customer(this.$route.params.id)
      .then(response => {
        if (response.status === 'not found') {
          this.$swal({
            icon: 'error',
            title: 'Gagal',
            text: 'Data pelanggan ini tidak ditemukan'
          })

          this.$router.push({ name: 'customers.data' })
        }
      })
      .catch(error => {
        console.log(error)
      })
  },

  validations: {
    customer: {
      name: {
        required
      },

      phone: {
        numeric
      },

      email: {
        email
      }
    }
  },

  computed: {
    ...mapGetters('customer', ['customer'])
  },

  methods: {
    ...mapActions('customer', ['edit_customer', 'update_customer']),
    ...mapMutations('customer', ['CLEAR_CUSTOMER']),

    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.update_customer(this.customer)
          .then(response => {
            if (response.status === 'success') {
              this.$swal({
                icon: 'success',
                title: 'Berhasil',
                text: 'Data pelanggan berhasil diubah'
              })
            } else {
              this.$swal({
                icon: 'error',
                title: 'Gagal',
                text: 'Data pelanggan gagal diubah'
              })
            }

            this.$router.push({ name: 'customers.data' })
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },

  destroyed() {
    this.CLEAR_CUSTOMER()
  }
}
</script>

<style></style>
