<!-- LoadingScreen.vue -->
<template>
  <div class="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
    <div class="animate-spin rounded-full h-24 w-24 border-b-4 border-blue-500 mb-4"></div>
    <h2 class="text-xl font-semibold">Mohon menunggu</h2>
    <p class="text-gray-500 text-center mt-4 px-6">
      Transaksi Anda sedang diproses. Agar transaksi berjalan lancar, mohon untuk tidak menutup halaman ini.
      Tagihan transaksi Anda akan dikirimkan melalui WhatsApp dan email.
    </p>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
  props: {
    fetchData: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      error: null,
    };
  },
  async mounted() {
    try {
      await this.fetchData();
      this.loading = false;
      this.$emit('completed'); // Emit event untuk memberitahu bahwa proses selesai
    } catch (e) {
      this.error = "Gagal memuat data, coba lagi.";
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>