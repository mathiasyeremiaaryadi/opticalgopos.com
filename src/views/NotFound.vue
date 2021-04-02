<template>
  <div class="text-center">
    <h1>404</h1>
    <h3>Halaman ini tidak ditemukan</h3>

    <router-link
      :to="{ name: 'dashboard' }"
      class="btn btn-info text-center px-5 py-3 mt-3 text-white"
    >
      Kembali
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
h1 {
  margin-top: 150px;
  font-size: 10em;
  border-bottom: none;
}
</style>
