<template>
  <div class="bg-neutral-50 min-h-screen flex flex-col">
    <!-- Header -->
    <div class="bg-white border-b px-4 py-3 flex items-center space-x-3">
      <router-link to="/" class="text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </router-link>
      <h2 class="text-lg font-bold text-gray-800">{{ $t('registerButton') }}</h2>
    </div>

    <!-- Main Content -->
    <div class="flex-grow flex flex-col items-center justify-center px-6">
      <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ $t('createAccount') }}</h2>
        <p class="text-sm text-gray-500 mb-4">{{ $t('startRegister') }}</p>

        <form @submit.prevent="handleRegister" class="space-y-3">
          <BaseInput
            v-model="name"
            label="Name"
            placeholder="Enter your name"
            required
          />
          <div>
            <label for="dob" class="block text-sm font-medium text-gray-700">{{ $t('dateOfBirth') }}</label>
            <input
              id="dob"
              type="date"
              v-model="dateOfBirth"
              class="w-full border-b border-gray-700 focus:outline-none focus:ring-0 focus:border-green-500"
              required
            />
          </div>

          <BaseInput
            v-model="phoneNumber"
            label="Phone Number"
            placeholder="Enter your phone number"
            required
          />

          <div class="flex justify-end">
            <button
              type="button"
              @click="handleSendOTP"
              class="text-green-500 text-sm hover:underline"
              :disabled="otpSent"
            >
              {{ otpSent ? `Resend OTP (${resendTimer})` : "Resend OTP" }}
            </button>
          </div>

          <div v-if="otpSent">
            <BaseInput
              v-model="OTP"
              label="OTP Code"
              placeholder="Enter OTP Code"
              required
            />
          </div>
          <BaseInput
            v-model="email"
            label="Email"
            placeholder="Enter your email"
            required
          />

          <BasePassword
            v-model="password"
            label="Password"
            :showStrength="true" required
          />
          <BasePassword
            v-model="confirmPassword"
            label="Confirm Password"
            :showStrength="false" required
          />

          <BaseInput
            v-model="referralCode"
            label="Referral Code"
            placeholder="Enter your referral code (Optional)"
          />

          <BaseButton
            type="primary"
            :disabled="!isFormComplete"
            class="w-full"
          >
            Register
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue';
import BasePassword from '@/components/base/BasePassword.vue';

export default {
  name: "RegisterPage",
  components: {
    BaseButton,
    BasePassword
  },
  data() {
    return {
      name: "",
      dateOfBirth: "",
      phoneNumber: "",
      otpCode: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
      otpSent: false,
      resendTimer: 120,
    };
  },
  computed: {
    isFormComplete() {
      return (
        this.name &&
        this.dateOfBirth &&
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
    handleSendOTP() {
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
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Registration successful!");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
/* Form Layout */
.space-y-3 > *:not(:last-child) {
  margin-bottom: 0;
}

button:hover {
  background-color: #38a169; 
}
</style>
