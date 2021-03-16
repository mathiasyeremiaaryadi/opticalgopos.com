<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Pembayaran</h3>

      <form class="form" @submit.prevent="submit()">
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nama Pembayaran</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              placeholder="Nama pembayaran . . ."
              v-model="payment.name"
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
  name: 'CreatePayment',

  computed: {
    ...mapGetters('payment', ['payment'])
  },

  methods: {
    ...mapActions('payment', ['create_payment']),
    ...mapMutations('payment', ['CLEAR_PAYMENT']),

    submit() {
      this.create_payment(this.payment)
        .then(response => {
          if (response.status === 'success') {
            this.$swal({
              icon: 'success',
              title: 'Berhasil',
              text: 'Data pembayaran berhasil ditambahkan'
            })
          } else {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Data pembayaran gagal ditambahkan'
            })
          }

          this.$router.push({ name: 'payments.data' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  destroyed() {
    this.CLEAR_PAYMENT()
  }
}
</script>

<style></style>
