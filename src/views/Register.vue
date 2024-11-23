<template>
  <div class="bg-neutral-50 min-h-screen flex flex-col">
    <!-- Header -->
    <div class="bg-white border-b px-4 py-3 flex items-center space-x-3">
      <BackButton />
      <h2 class="text-lg font-bold text-gray-800">{{ $t('registerButton') }}</h2>
    </div>

    <!-- Main Content -->
    <div class="flex-grow flex flex-col items-center justify-center px-6">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ $t('createAccount') }}</h2>
        <p class="text-sm text-gray-500 mb-6">{{ $t('startRegister') }}</p>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name -->
          <BaseInput
            v-model="name"
            floatingLabel="Name"
            required
          />

          <!-- Phone Number -->
          <BaseInput
            v-model="phoneNumber"
            floatingLabel="Phone Number"
            required
          />

          <!-- OTP -->
          <div v-if="otpSent" class="relative">
            <BaseInput
              v-model="otpCode"
              floatingLabel="OTP Code"
              required
            />
            <button
              type="button"
              @click="handleSendOTP"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 text-green-500 text-sm hover:underline"
              :disabled="otpSent"
            >
              {{ otpSent ? `Resend OTP (${resendTimer})` : "Resend OTP" }}
            </button>
          </div>

          <!-- Email -->
          <BaseInput
            v-model="email"
            floatingLabel="Email"
            required
          />

          <!-- Password -->
          <BasePassword
            v-model="password"
            floatingLabel="Password"
            :showStrength="true"
            required
          />

          <!-- Confirm Password -->
          <BasePassword
            v-model="confirmPassword"
            floatingLabel="Confirm Password"
            :showStrength="false"
            required
          />

          <!-- Referral Code -->
          <BaseInput
            v-model="referralCode"
            floatingLabel="Referral Code"
          />

          <!-- Submit Button -->
          <BaseButton
            type="primary"
            :disabled="!isFormComplete || isLoading"
            class="w-full"
          >
            {{ isLoading ? $t('loading') : $t('registerButton') }}
          </BaseButton>

          <!-- Error Message -->
          <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-4">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput.vue";
import BasePassword from "@/components/base/BasePassword.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BackButton from "@/components/base/BaseBackButton.vue";

export default {
  name: "RegisterPage",
  components: {
    BaseInput,
    BasePassword,
    BaseButton,
    BackButton,
  },
  data() {
    return {
      name: "",
      phoneNumber: "",
      otpCode: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
      otpSent: false,
      resendTimer: 120,
      errorMessage: null,
      isLoading: false,
    };
  },
  computed: {
    isFormComplete() {
      return (
        this.name &&
        this.phoneNumber &&
        (!this.otpSent || this.otpCode) &&
        this.email &&
        this.password &&
        this.confirmPassword &&
        this.password === this.confirmPassword
      );
    },
  },
  methods: {
    async handleSendOTP() {
      if (!this.otpSent) {
        this.otpSent = true;
        this.startTimer();
        alert("OTP sent to: " + this.phoneNumber);
      }
    },
    startTimer() {
      const timerInterval = setInterval(() => {
        if (this.resendTimer > 0) {
          this.resendTimer--;
        } else {
          clearInterval(timerInterval);
          this.otpSent = false;
          this.resendTimer = 120;
        }
      }, 1000);
    },
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match!";
        return;
      }

      this.isLoading = true;
      this.errorMessage = null;

      try {
        const response = await this.$store.dispatch("user/register", {
          name: this.name,
          phoneNumber: this.phoneNumber,
          otpCode: this.otpCode,
          email: this.email,
          password: this.password,
          referralCode: this.referralCode,
        });

        if (response.success) {
          this.$router.push({ name: "Home" });
        } else {
          this.errorMessage = response.message || "Registration failed!";
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
