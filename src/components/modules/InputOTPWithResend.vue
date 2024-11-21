<template>
    <div class="otp-with-resend">
      <!-- Input OTP menggunakan BaseInputOTP -->
      <BaseInputOTP
        v-model="otp"
        :length="otpLength"
        @update:modelValue="emitOtp"
      />
  
      <!-- Resend OTP Section -->
      <div class="resend-section">
        <div class="my-4 italic text-sm text-gray-500 flex flex-row gap-1">
          <span>{{ $t("resendOTPQuestion") }}</span>
          <button
            type="button"
            :class="['text-blue-500 hover:underline', !canResend && 'disabled-button']"
            :disabled="!canResend"
            @click="handleResendOTP(lastSendBy || defaultSendBy)"
          >
            {{ canResend ? $t("resendOTPNow") : $t("resendOTPTimer", { seconds: resendTimer }) }}
          </button>
        </div>
        <div class="mb-4 italic text-sm text-gray-500">
          <button
            type="button"
            class="text-blue-500 hover:underline"
            @click="handleResendOTP(2)"
          >
            {{ $t("resendWithSMS") }}
          </button>
        </div>
      </div>
  
      <!-- Error Message -->
      <div v-if="otpError" class="text-red-500 text-sm mt-2">
        {{ otpError }}
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "BaseInputOTPWithResend",
    props: {
      emailPhoneNumber: {
        type: String,
        required: true,
      },
      otpLength: {
        type: Number,
        default: 6,
      },
      defaultSendBy: {
        type: Number,
        default: 1, // 1 = WA, 2 = SMS, 3 = Email
      },
      type: {
        type: Number,
        default: 1, // 1 = Verification, 2 = Reset Password
      },
      timer: {
        type: Number,
        default: 60, // Default timer: 60 detik
      },
    },
    data() {
      return {
        otp: "",
        canResend: true,
        resendTimer: this.timer,
        lastSendBy: null,
        otpError: null,
      };
    },
    methods: {
      emitOtp(value) {
        this.$emit("otp-update", value); // Emit nilai OTP ke parent
      },
      async handleResendOTP(sendBy) {
        if (!this.canResend) {
          console.log("Wait until the timer finishes before resending.");
          return;
        }
  
        try {
          this.lastSendBy = sendBy;
          // Emit event resend OTP ke parent untuk menangani API call
          this.$emit("resend-otp", {
            EmailPhoneNumber: this.emailPhoneNumber,
            SendBy: sendBy, // 1 = WA, 2 = SMS, 3 = Email
            Type: this.type,
          });
  
          console.log("OTP resend initiated successfully!");
          this.startResendTimer();
        } catch (error) {
          this.otpError = "Failed to resend OTP.";
          console.error("Failed to resend OTP:", error);
        }
      },
      startResendTimer() {
        this.resendTimer = this.timer;
        this.canResend = false;
  
        const interval = setInterval(() => {
          this.resendTimer--;
  
          if (this.resendTimer <= 0) {
            clearInterval(interval);
            this.canResend = true;
          }
        }, 1000);
      },
    },
  };
  </script>
  
  <style scoped>
  .disabled-button {
    opacity: 0.5;
    pointer-events: none;
  }
  
  .resend-section {
    margin-top: 1rem;
  }
  
  .otp-with-resend {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  