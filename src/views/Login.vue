<template>
  <div class="bg-neutral-50 min-h-screen flex flex-col">
    <!-- Header -->
    <div class="bg-white border-b px-4 py-3 flex items-center space-x-3">
      <BackButton />
      <h2 class="text-lg font-bold text-gray-800">{{ $t('login') }}</h2>
    </div>

    <!-- Main Content -->
    <div class="flex-grow flex flex-col items-center justify-center px-6">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ $t('welcome') }}</h2>
        <p class="text-sm text-gray-500 mb-6">
          {{ $t('loginPrompt') }}
        </p>
        
        <!-- Form -->
        <form @submit.prevent="handleLogin">
          <!-- Email -->
          <BaseInput
            v-model="email"
            floatingLabel="Email"
            required
          />

          <!-- Password -->
          <div class="mb-4">
            <BasePassword
              v-model="password"
              floatingLabel="Password"
              :showStrength="false"
              required
            />
          </div>

          <!-- Forgot Password Link -->
          <div class="flex justify-between mt-2 mb-6">
            <div></div>
            <router-link
              to="/forgot-password"
              class="text-sm text-green-700 hover:underline"
            >
              {{  $t('forgotPassword') }}
            </router-link>
          </div>

          <!-- Submit Button -->
          <BaseButton
            type="primary"
            :disabled="!isFormComplete || isLoading"
            class="w-full"
          >
            {{ isLoading ? $t('loading') : $t('loginButton') }}
          </BaseButton>

          <!-- Error Message -->
          <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-4">{{ errorMessage }}</p>
        </form>

        <!-- Register Link -->
        <p class="text-center text-sm text-gray-600 mt-4">
          {{ $t('noAccount') }}
          <router-link to="/register" class="text-green-700 hover:underline">{{ $t('registerNow') }}</router-link>
        </p>

        <!-- Social Login -->
        <div class="flex items-center my-6">
          <hr class="flex-grow border-gray-300" />
          <span class="mx-4 text-gray-500 text-sm">{{ $t('or') }}</span>
          <hr class="flex-grow border-gray-300" />
        </div>

        <div class="space-y-3">
          <!-- Login with Phone -->
          <router-link to="/phone-login">
            <button
              class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
            >
              <AppIcon icon="mdi:phone" class="h-5 w-5 mr-2 text-gray-600" />
              {{ $t('continueWithPhoneNumber') }}
            </button>
          </router-link>

          <!-- Login with Google -->
          <button
            class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
          >
            <AppIcon icon="logos:google-icon" class="h-5 w-5 mr-2 text-gray-600" />
            {{ $t('continueWithGoogle') }}
          </button>

          <!-- Login with Apple -->
          <button
            class="w-full flex items-center justify-center bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            <AppIcon icon="mdi:apple" class="h-5 w-5 mr-2" />
            {{ $t('continueWithApple') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BasePassword from "@/components/base/BasePassword.vue";
import BackButton from "@/components/base/BaseBackButton.vue";

export default {
  name: "LoginPage",
  components: {
    BaseInput,
    BaseButton,
    BasePassword,
    BackButton,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: null,
      isLoading: false,
    };
  },
  computed: {
    isFormComplete() {
      return this.email.trim() !== "" && this.password.trim() !== "";
    },
  },
  methods: {
    async handleLogin() {
      if (!this.isFormComplete) return;

      this.isLoading = true;
      this.errorMessage = null;

      try {
        const response = await this.$store.dispatch("user/login", {
          email: this.email,
          password: this.password,
        });

        if (response.success) {
          this.$router.push({ name: "Home" });
        } else {
          this.errorMessage = response.message || "Login failed!";
        }
      } catch (error) {
        this.errorMessage = error.message || "An error occurred!";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
