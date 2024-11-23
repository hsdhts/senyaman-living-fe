<template>
    <div class="bg-neutral-50 min-h-screen flex flex-col">
      <!-- Header -->
      <div class="bg-white border-b px-4 py-3 flex items-center space-x-3">
        <BackButton />
        <h2 class="text-lg font-bold text-gray-800">Reset Password</h2>
      </div>
  
      <!-- Main Content -->
      <div class="flex-grow flex flex-col items-center justify-start px-6 mt-12">
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Reset Your Password</h2>
          <p class="text-sm text-gray-500 mb-6">
            Please enter your new password and confirm it below.
          </p>
          
          <!-- Form -->
          <form @submit.prevent="handleSubmit">
            <!-- New Password -->
            <div class="mb-4">
              <BasePassword
                v-model="newPassword"
                floatingLabel="New Password"
                :showStrength="false"
                required
              />
            </div>
  
            <!-- Confirm New Password -->
            <div class="mb-4">
              <BasePassword
                v-model="confirmPassword"
                floatingLabel="Confirm New Password"
                :showStrength="false"
                required
              />
            </div>
  
            <!-- Error Message -->
            <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-4">{{ errorMessage }}</p>
  
            <!-- Submit Button -->
            <BaseButton
              type="primary"
              :disabled="!isFormComplete || isLoading"
              class="w-full"
            >
              {{ isLoading ? "Resetting..." : "Reset Password" }}
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BasePassword from "@/components/base/BasePassword.vue";
  import BaseButton from "@/components/base/BaseButton.vue";
  import BackButton from "@/components/base/BaseBackButton.vue";
  
  export default {
    name: "ResetPasswordPage",
    components: {
      BasePassword,
      BaseButton,
      BackButton,
    },
    data() {
      return {
        newPassword: "",
        confirmPassword: "",
        errorMessage: null,
        isLoading: false,
      };
    },
    computed: {
      isFormComplete() {
        return (
          this.newPassword.trim() !== "" &&
          this.confirmPassword.trim() !== "" &&
          this.newPassword === this.confirmPassword
        );
      },
    },
    methods: {
      async handleSubmit() {
        if (!this.isFormComplete) {
          this.errorMessage = "Passwords do not match!";
          return;
        }
  
        this.isLoading = true;
        this.errorMessage = null;
  
        try {
          const response = await this.$store.dispatch("user/resetPassword", {
            password: this.newPassword,
          });
  
          if (response.success) {
            alert("Password successfully reset!");
            this.$router.push({ name: "Login" });
          } else {
            this.errorMessage = response.message || "Failed to reset password.";
          }
        } catch (error) {
          this.errorMessage = error.message || "An error occurred.";
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .bg-neutral-50 {
    background-color: #f9fafb;
  }
  .text-red-500 {
    color: #ef4444;
  }
  .mt-12 {
    margin-top: 3rem; 
  }
  button:disabled {
    background-color: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
  }
  </style>
  