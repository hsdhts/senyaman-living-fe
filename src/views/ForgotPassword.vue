<template>
  <div class="bg-neutral-50 min-h-screen flex flex-col">
    <div class="bg-white border-b px-4 py-3 flex items-center space-x-3">
      <BackButton />
      <h2 class="text-lg font-bold text-gray-800">Forgot Password</h2>
    </div>

    <!-- Main Content -->
    <div class="flex-grow flex flex-col items-center justify-start px-6 mt-12">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <p class="text-sm text-gray-500 mb-6">
          Enter your email or phone number and we’ll send you a link to reset your password.
        </p>

        <div v-if="user.email" class="mb-6">
          <p class="text-gray-500">Your Email Address:</p>
          <p class="font-semibold text-gray-800">{{ user.email }}</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="!user.email">
            <BaseInput
              v-model="emailOrPhone"
              floatingLabel="Email or Phone Number"
              required
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="flex items-center text-red-500 text-sm mt-2">
            <AppIcon icon="mdi:alert-circle" class="w-4 h-4 mr-2" />
            <p>{{ errorMessage }}</p>
          </div>

          <!-- Send Link Button -->
          <BaseButton
            type="primary"
            :disabled="!isFormComplete || isLoading"
            class="w-full"
          >
            {{ isLoading ? "Sending..." : "Send Link" }}
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BackButton from "@/components/base/BaseBackButton.vue";


export default {
  name: "ForgotPassword",
  components: {
    BaseInput,
    BaseButton,
    BackButton
  },
  data() {
    return {
      emailOrPhone: "", 
      errorMessage: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user, 
    }),
    isFormComplete() {
      return this.user.email || this.emailOrPhone.trim() !== "";
    },
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = null;
      this.isLoading = true;

      try {
        const targetEmail = this.user.email || this.emailOrPhone;

        const response = await this.$store.dispatch("user/forgotPassword", {
          emailOrPhone: targetEmail,
        });

        if (response.success) {
          alert(`Reset link sent to: ${targetEmail}`);
          this.$router.push({ name: "ResetPassword" });
        } else {
          this.errorMessage = response.message || "Unable to send reset link.";
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
/* Styling */
.bg-neutral-50 {
  background-color: #f9fafb;
}
.text-red-500 {
  color: #ef4444;
}
.text-green-500 {
  color: #10b981;
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
