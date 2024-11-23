<template>
  <div class="container">
    <div class="content">
      <h1>Hello Rewards</h1>
      <p>Welcome to the Rewards page</p>
    </div>
    <!-- Menambahkan komponen footer -->
    <AppFooter />
  </div>
</template>

<script>
// Impor komponen footer
import AppFooter from '@/components/layout/Footer.vue';

export default {
  name: "RewardPage",
  components: {
    AppFooter, // Daftarkan komponen footer
  },
};
</script>

<style scoped>
/* Untuk memastikan konten tidak tertutup footer */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Pastikan container memenuhi tinggi layar */
}

/* Konten utama, beri margin bawah untuk ruang footer */
.content {
  flex: 1; /* Membuat bagian konten mengisi ruang di atas footer */
  text-align: center;
  padding-bottom: 60px; /* Beri ruang untuk footer */
}

/* Footer tetap berada di bagian bawah */
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white; /* Warna background footer */
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
}
</style>
