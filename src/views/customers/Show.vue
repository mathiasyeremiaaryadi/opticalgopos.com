<template>
  <div class="col-md-12 col-lg-12">
    <div class="card-block">
      <h3 class="card-title text-center text-md-left">
        Tambah Pelanggan dan Resep
      </h3>

      <!-- customer detail section -->
      <section class="mt-5 mt-md-0 text-center text-md-left">
        <h5>Informasi Pelanggan</h5>

        <div class="row mt-4">
          <div class="col-12 col-sm-6 col-lg-3">
            <p><strong>Kode Pelanggan</strong></p>
            <p>{{ customer.code }}</p>
          </div>

          <div class="col-12 col-sm-6 col-lg-3">
            <p><strong>Nama Pelanggan</strong></p>
            <p>{{ customer.name }}</p>
          </div>

          <div class="col-12 col-sm-6 col-lg-3">
            <p><strong>Nomor Telepon Pelanggan</strong></p>
            <p>{{ customer.phone }}</p>
          </div>

          <div class="col-12 col-sm-6 col-lg-3">
            <p><strong>Email Pelanggan</strong></p>
            <p>{{ customer.email ? customer.email : `---` }}</p>
          </div>

          <div class="col-12 col-sm-6 col-lg-3">
            <p><strong>Alamat Pelanggan</strong></p>
            <p>{{ customer.address ? customer.address : `---` }}</p>
          </div>

          <div class="col-12 col-sm-6 col-lg-3">
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
                      <h5 class="text-dark text-center text-md-left">
                        Resep #{{ index + 1 }}
                      </h5>
                    </button>
                  </h2>
                </div>

                <div
                  :id="`collapse-${prescription.id}`"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body text-center text-md-left">
                    <div class="row">
                      <!-- right eye prescription detail section -->
                      <div class="col-12 col-md-6">
                        <section>
                          <h5>Resep Mata Kanan</h5>

                          <div class="row mt-4">
                            <div class="col-6 col-lg-4">
                              <p><strong>SPH</strong></p>
                              <p>
                                {{
                                  prescription.right_spherical
                                    ? prescription.right_spherical.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-lg-4">
                              <p><strong>CYL</strong></p>
                              <p>
                                {{
                                  prescription.right_cylinder
                                    ? prescription.right_cylinder.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-lg-4">
                              <p><strong>ADD (Plus)</strong></p>
                              <p>
                                {{
                                  prescription.right_plus
                                    ? prescription.right_plus.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-lg-4">
                              <p><strong>Axis</strong></p>
                              <p>
                                {{
                                  prescription.right_axis
                                    ? prescription.right_axis.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-lg-4 mx-auto mx-md-0">
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
                      <div class="col-12 col-md-6">
                        <section class="mt-4 mt-md-0">
                          <h5>Resep Mata Kiri</h5>

                          <div class="row mt-4">
                            <div class="col-6 col-lg-4">
                              <p><strong>SPH</strong></p>
                              <p>
                                {{
                                  prescription.left_spherical
                                    ? prescription.left_spherical.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-lg-4">
                              <p><strong>CYL</strong></p>
                              <p>
                                {{
                                  prescription.left_cylinder
                                    ? prescription.left_cylinder.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-lg-4">
                              <p><strong>ADD (Plus)</strong></p>
                              <p>
                                {{
                                  prescription.left_plus
                                    ? prescription.left_plus.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-lg-4">
                              <p><strong>Axis</strong></p>
                              <p>
                                {{
                                  prescription.left_axis
                                    ? prescription.left_axis.toFixed(2)
                                    : `---`
                                }}
                              </p>
                            </div>

                            <div class="col-6 col-lg-4 mx-auto mx-md-0">
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

      <div class="row">
        <div class="col-lg-3 col-md-12 col-12 offset-lg-9">
          <router-link
            :to="{ name: 'customers.data' }"
            class="btn btn-lg btn-block btn-danger mt-3 text-white"
          >
            Kembali
          </router-link>
        </div>
      </div>
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
    ...mapGetters('customer', [
      'customer',
      'prescriptions',
      'prescriptions_length'
    ])
  },

  methods: {
    ...mapActions('customer', ['get_customer_prescriptions']),
    ...mapMutations('customer', ['CLEAR_CUSTOMER', 'CLEAR_PRESCRIPTION'])
  },

  destroyed() {
    this.CLEAR_CUSTOMER()
    this.CLEAR_PRESCRIPTION()
  }
}
</script>

<style></style>
