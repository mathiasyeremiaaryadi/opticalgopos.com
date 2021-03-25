<template>
  <!-- Content -->
  <div>
    <!-- Summary Data Section -->
    <section class="row mb-3">
      <div class="col-sm-12">
        <section class="row justify-content-end">
          <div class="col-3">
            <div class="form-group">
              <div>
                <date-picker
                  type="date"
                  valueType="YYYY-MM-DD"
                  v-model="date_filter.start_date"
                  placeholder="Tanggal awal . . ."
                  style="width: 100%"
                ></date-picker>
              </div>
            </div>
          </div>

          <div class="col-3">
            <div class="form-group">
              <div>
                <date-picker
                  type="date"
                  valueType="YYYY-MM-DD"
                  v-model="date_filter.last_date"
                  placeholder="Tanggal akhir . . ."
                  style="width: 100%"
                ></date-picker>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <section class="row">
      <div class="col-sm-12">
        <section class="row">
          <div class="col-12 col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-primary text-center h-100">
              <div class="card-header">
                <h5>Total Transaksi</h5>
              </div>
              <div class="card-block">
                <h5>{{ total_transactions | currency }}</h5>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-success text-center h-100">
              <div class="card-header">
                <h5>Transaksi Sukses</h5>
              </div>
              <div class="card-block">
                <h5>{{ success_count }}</h5>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-warning text-center h-100">
              <div class="card-header">
                <h5>Transaksi Pending</h5>
              </div>
              <div class="card-block">
                <h5>{{ pending_count }}</h5>
              </div>
            </div>
          </div>

          <div class="col-12 col-md-6 col-lg-3 mb-4">
            <div class="card text-white bg-danger text-center h-100">
              <div class="card-header">
                <h5>Transaksi Gagal</h5>
              </div>
              <div class="card-block">
                <h5>{{ failed_count }}</h5>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <!-- End Summary Data Section -->

    <!-- Table Data Section -->
    <section class="row">
      <div class="col-sm-12">
        <section class="row">
          <div class="col-12 col-lg-7">
            <div class="card mb-4">
              <div class="card-block">
                <h3 class="card-title">Riwayat Transaksi</h3>
                <div class="table-responsive">
                  <table class="table table-hover text-center text-nowrap">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Kode Transaksi</th>
                        <th>Tanggal Transaksi</th>
                        <th>Nama Pelanggan</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(transaction, index) in last_transactions"
                        :key="transaction.id"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>{{ transaction.code }}</td>
                        <td>
                          {{
                            transaction.transaction_date
                              ? transaction.transaction_date
                              : `---`
                          }}
                        </td>
                        <td>{{ transaction.customer.name }}</td>
                        <td>{{ transaction.total | currency }}</td>
                        <td>
                          <span
                            class="badge badge-danger p-2"
                            v-if="transaction.status === 'Gagal'"
                            >Gagal</span
                          >

                          <span
                            class="badge badge-success p-2"
                            v-else-if="transaction.status === 'Sukses'"
                            >Berhasil</span
                          >

                          <span class="badge badge-warning p-2" v-else
                            >Pending</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-5">
            <div class="card mb-4">
              <div class="card-block">
                <h3 class="card-title">Proporsi Status Transaksi</h3>

                <DoughnutChart
                  :chartData="{
                    labels: ['Sukses', 'Gagal', 'Pending'],
                    datasets: [
                      {
                        backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                        data: [success_portion, failed_portion, pending_portion]
                      }
                    ]
                  }"
                  :options="{
                    responsive: true,

                    maintainAspectRatio: false,

                    animation: {
                      animateRotate: false
                    }
                  }"
                ></DoughnutChart>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <!-- End Table Data Section -->
  </div>
  <!-- End Content -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DoughnutChart from '@/components/DoughnutChartComponent.vue'

export default {
  components: {
    DoughnutChart
  },

  name: 'Dashboard',

  watch: {
    'date_filter.last_date'() {
      this.get_transactions(this.date_filter)
    }
  },

  computed: {
    ...mapGetters('dashboard', [
      'last_transactions',
      'date_filter',
      'total_transactions',
      'success_count',
      'failed_count',
      'pending_count',
      'success_portion',
      'failed_portion',
      'pending_portion'
    ])
  },

  methods: {
    ...mapActions('dashboard', ['get_transactions'])
  }
}
</script>

<style></style>
