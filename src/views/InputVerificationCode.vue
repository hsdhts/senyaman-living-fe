<template>
    <div class="bg-neutral-50 min-h-screen flex flex-col">
      <!-- Header -->
      <div class="bg-white border-b px-4 py-3 flex items-center space-x-3">
        <BackButton />
        <h2 class="text-lg font-bold text-gray-800">Input Verification Code</h2>
      </div>
  
      <!-- Main Content -->
      <div class="flex-grow flex flex-col items-center justify-start px-6 mt-12">
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <!-- Teks Deskripsi -->
          <p class="text-sm text-gray-500 mb-4 text-center">
            The OTP Code has been sent via WhatsApp to your number.
          </p>
  
          <!-- Nomor WhatsApp -->
          <div class="flex items-center justify-center mb-6">
            <AppIcon icon="mdi:whatsapp" class="h-6 w-6 text-green-500 mr-3" />
            <p class="text-gray-800 font-medium">+{{ phoneNumber }}</p>
          </div>
  
          <!-- OTP Inputs -->
          <div class="flex space-x-2 mb-6 justify-center">
            <input
              v-for="(digit, index) in otp"
              :key="index"
              type="text"
              maxlength="1"
              v-model="otp[index]"
              class="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              @input="handleInput($event, index)"
            />
          </div>
  
          <!-- Timer dan Resend Options -->
          <div class="text-center">
            <p class="text-sm text-gray-500">
              Resend Code <span v-if="timer > 0">({{ timerString }})</span>
            </p>
            <p
              class="text-green-500 text-sm mt-1 cursor-pointer hover:underline"
              @click="handleResend"
              :class="{ 'pointer-events-none text-gray-400': timer > 0 }"
            >
              Send via SMS
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BackButton from "@/components/base/BaseBackButton.vue";
  
  export default {
    name: "InputVerificationCode",
    components: {
      BackButton,
    },
    data() {
      return {
        phoneNumber: "", // Nomor telepon dari halaman sebelumnya
        otp: Array(6).fill(""), // Kode OTP (6 digit)
        timer: 60, // Timer untuk resend code (60 detik)
      };
    },
    computed: {
      timerString() {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      },
    },
    created() {
      this.phoneNumber = this.$route.params.phoneNumber || "+6282370059876"; // Contoh nomor telepon
      this.startTimer();
    },
    methods: {
      startTimer() {
        const interval = setInterval(() => {
          if (this.timer > 0) {
            this.timer--;
          } else {
            clearInterval(interval);
          }
        }, 1000);
      },
      handleInput(event, index) {
        const value = event.target.value;
        // Periksa apakah input valid (angka)
        if (/^\d$/.test(value)) {
          this.otp[index] = value;
          if (index < this.otp.length - 1) {
            this.$refs[`otp-${index + 1}`]?.focus();
          }
        } else {
          this.otp[index] = "";
        }
  
        if (this.otp.every((digit) => digit !== "")) {
          this.verifyOTP();
        }
      },
      verifyOTP() {
        const otpCode = this.otp.join("");
        alert(`Your OTP Code: ${otpCode}`);
        // Kirim kode OTP ke backend di sini
      },
      handleResend() {
        if (this.timer > 0) return;
  
        // Reset timer
        this.timer = 60;
        this.startTimer();
  
        alert("Code resent via SMS!");
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styling OTP input */
  input[type="text"] {
    font-size: 1.25rem;
    font-weight: bold;
  }
  </style>
  