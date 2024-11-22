<template>
    <div class="bg-neutral-50 min-h-screen flex flex-col">
      <!-- Header -->
      <div class="bg-white border-b px-4 py-3 flex items-center space-x-3">
        <router-link to="/" class="text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </router-link>
        <h2 class="text-lg font-bold text-gray-800">Forgot Password</h2>
      </div>
  
      <!-- Main Content -->
      <div class="flex-grow flex flex-col items-center justify-center px-6">
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <p class="text-sm text-gray-500 mb-6">
            Enter your email or phone number and we’ll send you a link to get back to your account.
          </p>
  
          <form @submit.prevent="handleSubmit">
            <BaseInput
              v-model="emailOrPhone"
              label="Email or Phone Number"
              placeholder="Enter your email or phone number"
              required
            />
  
            <div v-if="errorMessage" class="flex items-center text-red-500 text-sm mt-2">
              <AppIcon icon="mdi:alert-circle" class="w-4 h-4 mr-2" />
              <p>{{ errorMessage }}</p>
            </div>
  
            <BaseButton
              type="primary"
              class="w-full mt-4"
              :disabled="!emailOrPhone.trim()"
            >
              Send Link
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BaseInput from "@/components/base/BaseInput.vue";
  import BaseButton from "@/components/base/BaseButton.vue";
  
  export default {
    name: "ForgotPassword",
    components: {
      BaseInput,
      BaseButton,
    },
    data() {
      return {
        emailOrPhone: "",
        errorMessage: "",
      };
    },
    methods: {
      handleSubmit() {
        if (!this.validateInput()) {
          this.errorMessage =
            "Oops, it looks like we couldn't find an account with that information. Please make sure you've entered a valid email address or phone number.";
          return;
        }
  
        // Reset error jika validasi berhasil
        this.errorMessage = "";
        alert(`Link sent to: ${this.emailOrPhone}`);
        this.$router.push({ name: "ResetPassword" });
      },
      validateInput() {
        // Contoh validasi sederhana
        return (
          this.emailOrPhone.includes("@") || this.emailOrPhone.match(/^\d+$/)
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .text-red-500 {
    color: #ef4444;
  }
  
  .text-green-500 {
    color: #10b981;
  }
  
  .bg-neutral-50 {
    background-color: #f9fafb;
  }
  </style>
  