<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Karyawan</h3>

      <form class="form" @submit.prevent="submit()">
        <div class="form-group row">
          <label class="col-md-3 col-form-label">Kode Karyawan</label>

          <div class="col-md-9">
            <input
              class="form-control"
              type="text"
              autocomplete="off"
              placeholder="Akan di generate otomatis"
              disabled
            />

            <span class="help-block">Contoh: KRY0001</span>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nama Karyawan</label>

          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Nama karyawan . . ."
              autocomplete="off"
              v-model="employee.name"
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Nomor Telepon Karyawan</label>

          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Nomor telepon karyawan . . ."
              autocomplete="off"
              v-model="employee.phone"
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Alamat Karyawan</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Alamat karyawan . . ."
              autocomplete="off"
              v-model="employee.address"
            />
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Tanggal Lahir Karyawan</label>

          <div class="col-md-9">
            <div>
              <date-picker
                v-model="employee.date_of_birth"
                type="date"
                valueType="YYYY-MM-DD"
              ></date-picker>
            </div>
          </div>
        </div>

        <div class="form-group row">
          <label class="col-md-3 col-form-label">Email Karyawan</label>

          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              placeholder="Email karyawan . . ."
              autocomplete="off"
              v-model="employee.email"
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
  name: 'CreateEmployee',

  computed: {
    ...mapGetters('employee', ['employee'])
  },

  methods: {
    ...mapActions('employee', ['create_employee']),
    ...mapMutations('employee', ['CLEAR_EMPLOYEE']),

    submit() {
      this.create_employee(this.employee)
        .then(response => {
          if (response.status === 'success') {
            this.$swal({
              icon: 'success',
              title: 'Berhasil',
              text: 'Data karyawan berhasil ditambahkan'
            })
          } else {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Data karyawan gagal ditambahkan'
            })
          }

          this.$router.push({ name: 'employees.data' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  destroyed() {
    this.CLEAR_EMPLOYEE()
  }
}
</script>

<style scoped>
.mx-datepicker.is-invalid {
  border: 1px solid #dc3545;
}
</style>
