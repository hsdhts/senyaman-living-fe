<template>
    <button
      @click="goBack"
      class="flex items-center text-green-700 hover:text-green-700 focus:outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  </template>
  
  <script>
  export default {
    name: "BackButton",
    methods: {
      goBack() {
        // Navigasi ke halaman sebelumnya
        this.$router.go(-1); // Go back one step in history
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #f0fdf4; /* Ubah background saat hover */
    border-radius: 8px;
  }
  
  button:focus {
    outline: none;
  }
  </style>
  