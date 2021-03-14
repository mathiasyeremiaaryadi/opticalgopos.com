<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title">Tambah Pelanggan dan Resep</h3>

      <!-- customer detail section -->
      <section>
        <h5>Informasi Pelanggan</h5>

        <div class="row mt-4">
          <div class="col-6 col-md-4">
            <p><strong>Kode Pelanggan</strong></p>
            <p>{{ customer.code }}</p>
          </div>

          <div class="col-6 col-md-4">
            <p><strong>Nama Pelanggan</strong></p>
            <p>{{ customer.name }}</p>
          </div>

          <div class="col-6 col-md-4">
            <p><strong>Nomor Telepon Pelanggan</strong></p>
            <p>{{ customer.phone }}</p>
          </div>

          <div class="col-6 col-md-4">
            <p><strong>Email Pelanggan</strong></p>
            <p>{{ customer.email ? customer.email : `---` }}</p>
          </div>

          <div class="col col-md-4">
            <p><strong>Alamat Pelanggan</strong></p>
            <p>{{ customer.address ? customer.address : `---` }}</p>
          </div>

          <div class="col col-md-4">
            <p><strong>Jumlah Resep Mata</strong></p>
            <p>{{ prescriptions_length > 0 ? prescriptions_length : 0 }}</p>
          </div>
        </div>
      </section>
      <!-- end customer detail section -->

      <!-- list customer prescriptions section -->
      <section class="mt-3">
        <div class="row">
          <div class="col-12">
            <div
              class="accordion"
              id="accordionExample"
              v-if="prescriptions_length > 0"
            >
              <div
                class="card"
                v-for="(prescription, index) in prescriptions"
                :key="prescription.id"
              >
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left"
                      type="button"
                      data-toggle="collapse"
                      :data-target="`#collapse-${prescription.id}`"
                      aria-expanded="true"
                      :aria-controls="`collapse-${prescription.id}`"
                    >
                      <div class="clearfix">
                        <h5 class="text-dark float-left">
                          Resep #{{ index + 1 }}
                        </h5>

                        <button
                          @click="remove_prescription(prescription.id)"
                          class="btn btn-danger float-right"
                        >
                          <i class="fas fa-trash-alt fa-lg"></i> Hapus Resep
                        </button>
                      </div>
                    </button>
                  </h2>
                </div>

                <div
                  :id="`collapse-${prescription.id}`"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <div class="row">
                      <!-- right eye prescription detail section -->
                      <div class="col-6">
                        <section>
                          <h5>Resep Mata Kanan</h5>

                          <div class="row mt-4">
                            <div class="col-6 col-md-4">
                              <p><strong>SPH</strong></p>
                              <p>
                                {{
                                  prescription.right_spherical
                                    ? prescription.right_spherical.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-md-4">
                              <p><strong>CYL</strong></p>
                              <p>
                                {{
                                  prescription.right_cylinder
                                    ? prescription.right_cylinder.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-md-4">
                              <p><strong>ADD (Plus)</strong></p>
                              <p>
                                {{
                                  prescription.right_plus
                                    ? prescription.right_plus.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-md-4">
                              <p><strong>Axis</strong></p>
                              <p>
                                {{
                                  prescription.right_axis
                                    ? prescription.right_axis.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-md-4">
                              <p><strong>PD</strong></p>
                              <p>
                                {{
                                  prescription.right_pupil_distance
                                    ? prescription.right_pupil_distance
                                    : `---`
                                }}
                              </p>
                            </div>
                          </div>
                        </section>
                      </div>
                      <!-- end right eye prescription detail section -->

                      <!-- left eye prescription detail section -->
                      <div class="col-6">
                        <section>
                          <h5>Resep Mata Kiri</h5>

                          <div class="row mt-4">
                            <div class="col-6 col-md-4">
                              <p><strong>SPH</strong></p>
                              <p>
                                {{
                                  prescription.left_spherical
                                    ? prescription.left_spherical.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-md-4">
                              <p><strong>CYL</strong></p>
                              <p>
                                {{
                                  prescription.left_cylinder
                                    ? prescription.left_cylinder.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-md-4">
                              <p><strong>ADD (Plus)</strong></p>
                              <p>
                                {{
                                  prescription.left_plus
                                    ? prescription.left_plus.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-md-4">
                              <p><strong>Axis</strong></p>
                              <p>
                                {{
                                  prescription.left_axis
                                    ? prescription.left_axis.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col col-md-6">
                              <p><strong>PD</strong></p>
                              <p>
                                {{
                                  prescription.left_pupil_distance
                                    ? prescription.left_pupil_distance
                                    : `---`
                                }}
                              </p>
                            </div>
                          </div>
                        </section>
                      </div>
                      <!-- end left eye prescription detail section -->
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="card p-5">
                <h3 class="text-center">Tidak ada resep</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- end list customer prescriptions section -->

      <form class="form" @submit.prevent="submit()">
        <div class="row">
          <!-- right eye prescription form section -->
          <section class="col-12 col-md-6">
            <div class="form-group row mt-5">
              <div class="col-12">
                <h5>Tambah Resep Mata Kanan</h5>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">SPH</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.right_spherical"
                >
                  <option value="" disabled>Pilih SPH . . .</option>
                  <option
                    v-for="(spherical_value, index) in spherical_values"
                    :key="index"
                    :value="-spherical_value"
                    >-{{ spherical_value.toFixed(2) }}</option
                  >
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">CYL</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.right_cylinder"
                >
                  <option value="" disabled>Pilih CYL . . .</option>
                  <option
                    v-for="(cylinder_value, index) in cylinder_values"
                    :key="index"
                    :value="`-${cylinder_value}`"
                    >-{{ cylinder_value.toFixed(2) }}</option
                  >
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">ADD (Plus)</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.right_plus"
                >
                  <option value="" disabled>Pilih ADD . . .</option>
                  <option
                    v-for="(plus_value, index) in plus_values"
                    :key="index"
                    :value="`${plus_value}`"
                    >+{{ plus_value.toFixed(2) }}</option
                  >
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">Axis</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.right_axis"
                >
                  <option value="" disabled>Pilih axis . . .</option>
                  <option
                    v-for="(axis, index) in axis_values"
                    :key="index"
                    :value="`${axis}`"
                    >{{ axis }}</option
                  >
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">PD</label>

              <div class="col-md-5">
                <input
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  placeholder="PD . . ."
                  v-model="prescription.right_pupil_distance"
                />
              </div>
            </div>
          </section>
          <!-- end left eye prescription form section -->

          <!-- right eye prescription form section -->
          <section class="col-12 col-md-6">
            <div class="form-group row mt-5">
              <div class="col">
                <h5>Tambah Resep Mata Kiri</h5>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">SPH</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.left_spherical"
                >
                  <option value="" disabled>Pilih SPH . . .</option>
                  <option
                    v-for="(spherical_value, index) in spherical_values"
                    :key="index"
                    :value="-spherical_value"
                    >-{{ spherical_value.toFixed(2) }}</option
                  >
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">CYL</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.left_cylinder"
                >
                  <option value="" disabled>Pilih CYL . . .</option>
                  <option
                    v-for="(cylinder_value, index) in cylinder_values"
                    :key="index"
                    :value="`-${cylinder_value}`"
                    >-{{ cylinder_value.toFixed(2) }}</option
                  >
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">ADD (Plus)</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.left_plus"
                >
                  <option value="" disabled>Pilih ADD . . .</option>
                  <option
                    v-for="(plus_value, index) in plus_values"
                    :key="index"
                    :value="`${plus_value}`"
                    >+{{ plus_value.toFixed(2) }}</option
                  >
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">Axis</label>

              <div class="col-md-5">
                <select
                  class="form-control form-control-md text-capitalize"
                  v-model="prescription.left_axis"
                >
                  <option value="" disabled>Pilih axis . . .</option>
                  <option
                    v-for="(axis, index) in axis_values"
                    :key="index"
                    :value="`${axis}`"
                    >{{ axis }}</option
                  >
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-md-3 col-form-label">PD</label>

              <div class="col-md-5">
                <input
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  placeholder="Nilai PD . . ."
                  v-model="prescription.left_pupil_distance"
                />
              </div>
            </div>
          </section>
          <!-- end left eye prescription form section -->
        </div>

        <div class="form-group row">
          <div class="col-lg-3 col-md-12 col-12 offset-lg-6">
            <router-link
              :to="{ name: 'customers.data' }"
              class="btn btn-lg btn-block btn-danger mt-3 text-white"
            >
              Kembali
            </router-link>
          </div>

          <div class="col-lg-3 col-md-12 col-12">
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
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'CreateCustomer',

  created() {
    this.get_customer_prescriptions(this.$route.params.id)
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

  computed: {
    spherical_values() {
      return this.get_prescription_values(0.25, 10.0, 0.25)
    },

    cylinder_values() {
      return this.get_prescription_values(0.25, 600.0, 0.25)
    },

    plus_values() {
      return this.get_prescription_values(0.25, 600.0, 0.25)
    },

    axis_values() {
      return this.get_prescription_values(0.0, 180.0, 1.0)
    },

    ...mapGetters('customer', [
      'customer',
      'prescription',
      'prescriptions',
      'prescriptions_length'
    ])
  },

  methods: {
    ...mapActions('customer', [
      'get_customer_prescriptions',
      'create_customer_prescriptions',
      'delete_customer_prescription'
    ]),
    ...mapMutations('customer', ['CLEAR_CUSTOMER', 'CLEAR_PRESCRIPTION']),

    get_prescription_values(value, limit_value, add_value) {
      const prescription_values_array = []

      while (value <= limit_value) {
        prescription_values_array.push(value)

        value += add_value
      }
      return prescription_values_array
    },

    submit() {
      this.prescription.customers_id = this.customer.id

      this.create_customer_prescriptions(this.prescription)
        .then(response => {
          if (response.status === 'success') {
            this.$swal({
              icon: 'success',
              title: 'Berhasil',
              text: 'Data resep mata berhasil ditambahkan'
            })
          } else {
            this.$swal({
              icon: 'error',
              title: 'Gagal',
              text: 'Data resep mata gagal ditambahkan'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    remove_prescription(prescription_id) {
      this.$swal({
        icon: 'warning',
        title: 'Konfirmasi Hapus Data',
        text: 'Apakah yakin ingin menghapus data ini?',
        showCancelButton: true,
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
      }).then(result => {
        if (result.isConfirmed) {
          this.delete_customer_prescription(prescription_id)
            .then(response => {
              if (response.status === 'success') {
                this.$swal({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Data resep berhasil dihapus'
                })
              } else if (response.data.status === 'not found') {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data resep ini tidak ditemukan'
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Gagal',
                  text: 'Data resep gagal dihapus'
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
  },

  destroyed() {
    this.CLEAR_CUSTOMER()
    this.CLEAR_PRESCRIPTION()
  }
}
</script>

<style></style>
