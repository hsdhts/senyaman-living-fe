<template>
    <div>
      <!-- Tombol Scroll ke Atas -->
      <button 
        v-if="showButton" 
        @click="scrollToTop"
        class="fixed bottom-20 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
      >
        ⬆️
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showButton: false, // Untuk menampilkan/menyembunyikan tombol scroll
      };
    },
    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Animasi scroll
        });
      },
      handleScroll() {
        // Jika scroll lebih dari 100px, tampilkan tombol
        this.showButton = window.scrollY > 100;
      },
    },
    mounted() {
      // Tambahkan event listener saat komponen dipasang
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      // Hapus event listener saat komponen dilepas
      window.removeEventListener('scroll', this.handleScroll);
    },
  };
  </script>
  
  <style scoped>
  .fixed {
    z-index: 1000; /* Agar tombol berada di atas elemen lain */
  }
  </style>
  