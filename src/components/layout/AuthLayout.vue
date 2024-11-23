<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="bg-white w-full max-w-3xl md:max-w-4xl lg:max-w-5xl rounded-lg shadow-md relative grid grid-cols-1 md:grid-cols-2 h-auto">
        <!-- Gambar di sebelah kiri -->
        <div class="bg-cover bg-center h-full">
          <img src="https://placehold.co/600x600?text=GAMBAR" alt="Image"
            class="w-full h-full object-cover rounded-l-lg hidden md:block">
        </div>
  
        <!-- Form di sebelah kanan -->
        <div class="flex flex-col justify-center p-6 md:p-8 relative">
          <!-- Judul berdasarkan tipe -->
          <h2 class="text-2xl font-bold text-left mb-2">
            {{ currentTypeTitle }}
          </h2>
          <p class="text-left text-gray-500 mb-6">
            {{ currentTypeDescription }}
          </p>
  
          <!-- Form sesuai tipe -->
          <form @submit.prevent="handleSubmit">
            <template v-if="currentType === 'login'">
              <!-- Input untuk Login -->
              <div class="mb-4">
                <label class="block text-gray-700">{{ $t('emailOrPhone') }}</label>
                <BaseInput type="text" v-model="emailOrPhoneNumber" :placeholder="$t('emailOrPhone')" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">{{ $t('password') }}</label>
                <BaseInput type="password" v-model="password" :placeholder="$t('password')" />
              </div>
            </template>
  
            <template v-if="currentType === 'register'">
              <!-- Input untuk Register -->
              <div class="mb-4">
                <label class="block text-gray-700">{{ $t('name') }}</label>
                <BaseInput type="text" v-model="name" :placeholder="$t('name')" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">{{ $t('emailOrPhone') }}</label>
                <BaseInput type="text" v-model="emailOrPhoneNumber" :placeholder="$t('emailOrPhone')" />
              </div>
              <div class="mb-4">
                <label class="block text-gray-700">{{ $t('password') }}</label>
                <BasePassword v-model="password" :placeholder="$t('password')" @requirements-met="updateRequirementsMet" />
              </div>
            </template>
  
            <!-- Tombol -->
            <button
              type="submit"
              :class="[
                isSubmitDisabled || isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600',
                'w-full text-white py-3 rounded-md mt-4 text-lg font-semibold'
              ]"
              :disabled="isLoading || isSubmitDisabled"
            >
              {{ currentTypeSubmitText }}
            </button>
  
            <!-- Pesan error -->
            <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
          </form>
  
          <template v-if="currentType === 'login' || currentType === 'register'">
            <p class="text-center mt-4 text-gray-600">
              {{ isLoginMode ? $t('noAccount') : $t('alreadyAccount') }}
              <span @click="toggleAuthMode" class="text-blue-500 cursor-pointer">
                {{ isLoginMode ? $t('registerNow') : $t('loginNow') }}
              </span>
            </p>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from "vuex";
  
  export default {
    name: "AuthPage",
    props: {
      initialType: {
        type: String,
        default: "login", // Default tipe adalah login
      },
    },
    data() {
      return {
        name: "",
        emailOrPhoneNumber: "",
        password: "",
        verificationCode: "",
        requirementsMet: false, // Status persyaratan terpenuhi
        currentType: this.initialType, // Tipe saat ini: 'login', 'register', atau 'verification'
        lastSendBy: null, // Mode pengiriman terakhir
        canResend: true, // Status tombol resend
        resendTimer: 0, // Sisa waktu timer untuk tombol resend
      };
    },
    computed: {
      ...mapState("user", {
        isLoading: (state) => state.loading,
        errorMessage: (state) => state.errorMessage,
      }),
      isLoginMode() {
        return this.currentType === "login";
      },
    },
    methods: {
      ...mapActions("user", ["sendOTP", "register", "login"]),
      toggleAuthMode() {
        this.currentType = this.isLoginMode ? "register" : "login";
      },
      handleSubmit() {
        console.log("Submitted:", this.currentType);
      },
    },
  };
  </script>
  