<template>
    <div class="bg-neutral-50 min-h-screen flex flex-col">
      <!-- Header -->
      <div class="bg-white border-b px-4 py-3 flex items-center space-x-3">
        <BackButton />
        <h2 class="text-lg font-bold text-gray-800">{{ $t('login') }}</h2>
      </div>
  
      <div class="flex-grow flex flex-col items-center justify-center px-6">
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ $t('welcome') }}</h2>
          <p class="text-sm text-gray-500 mb-6">
            {{ $t('loginPrompt') }}
          </p>
  
          <form @submit.prevent="handlePhoneLogin">
            <div class="relative mb-4">
              <BaseInput
                v-model="phoneNumber"
                floatingLabel="Phone Number"
                required
                :placeholder="$t('phoneNumberPlaceholder')"
              />
            </div>
  
            <BaseButton
              type="primary"
              :disabled="!isPhoneNumberValid"
              class="w-full mt-4"
            >
              {{ $t('loginButton') }}
            </BaseButton>
          </form>
  
          <p class="text-center text-sm text-gray-600 mt-4">
            {{ $t('noAccount') }}
            <router-link to="/register" class="text-green-700 hover:underline">{{ $t('registerNow') }}</router-link>
          </p>
  
          <div class="flex items-center my-6">
            <hr class="flex-grow border-gray-300" />
            <span class="mx-4 text-gray-500 text-sm">{{ $t('or') }}</span>
            <hr class="flex-grow border-gray-300" />
          </div>
  
          <div class="space-y-3">
            <button
              class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
            >
              <AppIcon icon="mdi:email" class="h-5 w-5 mr-2 text-gray-600" />
              {{ $t('continueWithEmail') }}
            </button>
            <button
              class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
            >
              <AppIcon icon="logos:google-icon" class="h-5 w-5 mr-2 text-gray-600" />
              {{ $t('continueWithGoogle') }}
            </button>
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
  import BackButton from "@/components/base/BaseBackButton.vue"; 
  
  export default {
    name: "PhoneLoginPage",
    components: {
      BaseInput,
      BaseButton,
      BackButton
    },
    data() {
      return {
        phoneNumber: "",
      };
    },
    computed: {
      isPhoneNumberValid() {
        return this.phoneNumber.trim() !== "" && this.phoneNumber.length > 8;
      },
    },
    methods: {
      handlePhoneLogin() {
        if (this.isPhoneNumberValid) {
          alert(`Logged in with phone: ${this.phoneNumber}`);
          this.$router.push({ name: "Home" });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .relative {
    position: relative;
  }
  
  BaseInput {
    padding-left: 0; 
  }
  
  BaseInput input {
    padding-left: 0; 
  }
  
  BaseInput label {
    top: -10px; 
  }
  </style>
  