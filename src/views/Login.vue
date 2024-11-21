<template>
    <div class="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6">
      <!-- Header -->
      <div class="w-full max-w-md flex items-center justify-between mb-6">
        <button @click="goBack" class="text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
  
      <!-- Login Box -->
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome back!</h2>
        <p class="text-sm text-gray-500 mb-6">Please login using your already registered account</p>
  
        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label class="block text-sm text-gray-700 mb-1">Email</label>
            <div class="relative">
              <input
                type="email"
                v-model="email"
                placeholder="Enter your email"
                class="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
  
          <div class="mb-4">
            <label class="block text-sm text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Enter your password"
                class="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                class="absolute right-3 top-3 text-gray-500"
                @click="togglePasswordVisibility"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825L18.5 14.3M6 9l4.5-4.5L13.5 6M4.5 19.5l4.5-4.5" />
                </svg>
              </button>
            </div>
          </div>
  
          <div class="flex items-center justify-between mb-6">
            <a href="#" class="text-sm text-green-500 hover:underline">Forgot Password?</a>
          </div>
  
          <!-- Login Button -->
          <button
            type="submit"
            class="w-full bg-green-500 text-white text-lg font-semibold py-2.5 rounded-md hover:bg-green-600"
          >
            Login
          </button>
        </form>
  
        <!-- Register Link -->
        <p class="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?
          <router-link to="/register" class="text-green-500 hover:underline">Register Now</router-link>
        </p>
  
        <!-- Or Divider -->
        <div class="flex items-center my-6">
          <hr class="flex-grow border-gray-300" />
          <span class="mx-4 text-gray-500 text-sm">Or</span>
          <hr class="flex-grow border-gray-300" />
        </div>
  
        <!-- Social Login -->
        <div class="space-y-3">
          <button
            class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Continue with Phone Number
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
    data() {
      return {
        email: "",
        password: "",
        showPassword: false,
      };
    },
    methods: {
        goBack() {
            this.$router.push({ name: "Home" }); 
      },
      togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
      },
      handleLogin() {
        alert(`Logged in with: ${this.email}`);
        this.$router.push({ name: "Home" });
      },
    },
  };
  </script>
  