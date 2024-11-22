<template>

  <div class="container mx-auto p-6">
    <div class="bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-3xl font-bold text-center text-green-600 mb-4">Pembayaran Berhasil!</h2>
      <p class="text-center text-gray-600 mb-6">
        Terima kasih telah melakukan pembayaran. Pesanan Anda akan segera diproses.
      </p>

      <div class="flex justify-center mb-4">
        <AppIcon icon="mdi:check-circle-outline" class="h-40 w-40 text-green-500" />      
      </div>

      <div class="text-center">
        <p class="text-lg text-gray-600 mb-4">Order ID: 1286238962</p>
        <p class="text-lg text-gray-600 mb-4">Total Pembayaran: IDR 2.316.366</p>
      </div>

      <div class="flex justify-center mt-6">
        <router-link to="/" class="bg-blue-500 text-white px-6 py-3 rounded-lg">
          Kembali ke Beranda
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: "PaymentSuccess",
  setup() {
    const isPaymentSuccess = store.paymentSuccess;
    
    return { isPaymentSuccess };
  },
  computed: {
    paymentStatus() {
      return this.$store.getters.isPaymentSuccess;
    }
  },
  mounted() {
    // if (!this.paymentStatus) {
    //   // Redirect jika tidak ada pembayaran sukses
    //   this.$router.push('/404');
    // }
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>