<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Ubah Pembayaran</h3>

      <form class="form" @submit.prevent="submit()">
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nama Pembayaran</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
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
              Ubah
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
  name: 'EditPayment',

  created() {
    this.edit_payment(this.$route.params.id)
      .then(response => {
        if (response.status === 'not found') {
          this.$swal({
            icon: 'error',
            title: 'Gagal',
            text: 'Data pembayaran ini tidak ditemukan'
          })

          this.$router.push({ name: 'payments.data' })
        }
      })
      .catch(error => {
        console.log(error)
      })
  },

  computed: {
    ...mapGetters('payment', ['payment'])
  },

  methods: {
    ...mapActions('payment', ['edit_payment', 'update_payment']),
    ...mapMutations('payment', ['CLEAR_PAYMENT']),

    submit() {
      this.update_payment(this.payment)
        .then(response => {
          if (response.status === 'success') {
            this.$swal({
              icon: 'success',
              title: 'Berhasil',
              text: 'Data pembayaran berhasil diubah'
            })

            this.$router.push({ name: 'payments.data' })
          } else if (response.status === 'not found') {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Data pembayaran ini tidak ditemukan'
            })
          } else {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Data pembayaran gagal diubah'
            })
          }
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
