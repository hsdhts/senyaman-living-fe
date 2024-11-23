<template>
    <header class="bg-white border-b px-4 py-3 flex items-center space-x-3">
      <BackButton />
      <h2 class="text-lg font-bold text-gray-800">{{ title }}</h2>
    </header>
  </template>
  
  <script>
  import BackButton from "@/components/base/BaseBackButton.vue"; 
  
  export default {
    name: "BackHeader",
    components: {
      BackButton,
    },
    props: {
      title: {
        type: String,
        required: true, 
      },
    },
  };
  </script>
  
  <style scoped>
  header {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  