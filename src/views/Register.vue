<template>
    <DefaultLayout>
      <!-- Register Form -->
      <div class="max-w-md mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-4">Register</h1>
        <form @submit.prevent="handleRegister">
          <BaseInput v-model="name" placeholder="Name" required />
          <BaseInput v-model="email" placeholder="Email" type="email" required class="mt-4" />
          <BaseInput v-model="password" placeholder="Password" type="password" required class="mt-4" />

          <BasePassword v-model="password" placeholder="Password" required class="mt-4" />

          <BaseButton type="primary" class="mt-6 w-full">Register</BaseButton>
        </form>
      </div>
    </DefaultLayout>
  </template>
  
  <script>
  import BaseInput from '@/components/base/BaseInput.vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  
  export default {
    name: 'RegisterPage',
    components: {
      BaseInput,
      BaseButton,
    },
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      handleRegister() {
        // Implement your registration logic here
        alert('Registration successful!');
        this.$router.push({ name: 'Home' });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to Register.vue */
  </style>
  