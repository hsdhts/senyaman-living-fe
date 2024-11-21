<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <!-- Close Button -->
            <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Header -->
            <h2 class="text-center text-xl font-semibold mb-4">Log in or sign up</h2>

            <!-- Welcome Message -->
            <h3 class="text-lg font-bold mb-4 text-gray-900">Welcome to CloudHomes</h3>

            <!-- Form Section -->
            <div>
                <label class="block text-gray-600 text-sm mb-1">Country code</label>
                <BaseSelect :options="countries" v-model="selectedCountry" />
                <BaseInput type="tel" placeholder="Phone number" v-model="phoneNumber"
                    :prefix="selectedCountryPrefix" />

                <!-- Info Message -->
                <p class="text-gray-500 text-xs">
                    We'll call or text you to confirm your number. Standard message and data rates apply.
                    <a href="#" class="underline">Privacy Policy</a>
                </p>
            </div>

            <!-- Continue Button -->
            <button
                class="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 rounded-md mt-4">
                Continue
            </button>

            <!-- Divider -->
            <div class="my-4 flex items-center">
                <span class="flex-grow border-t border-gray-300"></span>
                <span class="mx-4 text-gray-400">or</span>
                <span class="flex-grow border-t border-gray-300"></span>
            </div>

            <!-- Social Login Buttons -->
            <div class="space-y-3">
                <button class="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center">
                    <img src="@/assets/svg/socialmedia/facebook.svg" alt="Facebook" class="w-5 h-5 mr-2" />
                    Continue with Facebook
                </button>
                <button class="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center">
                    <img src="@/assets/svg/socialmedia/google.svg" alt="Google" class="w-5 h-5 mr-2" />
                    Continue with Google
                </button>
                <button class="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center">
                    <img src="@/assets/svg/socialmedia/apple.svg" alt="Apple" class="w-5 h-5 mr-2" />
                    Continue with Apple
                </button>
                <button class="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center">
                    <img src="@/assets/svg/socialmedia/gmail.svg" alt="Email" class="w-5 h-5 mr-2" />
                    Continue with email
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CountryCodes from '@/assets/js/CountryCodes.json';

export default {
    data() {
        return {
            selectedCountry: '62', // Nilai default (misalnya Indonesia)
            phoneNumber: '',
            countries: CountryCodes.map(country => ({
                value: country.dial_code,
                label: `${country.name} +(${country.dial_code})`
            })) // Mengonversi data JSON ke format yang dibutuhkan
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
    computed: {
        // Dapatkan prefix berdasarkan kode negara yang dipilih
        selectedCountryPrefix() {
            const selected = this.countries.find(country => country.value === this.selectedCountry);
            return selected ? `+${selected.value}` : '';
        }
    }
};
</script>

<style scoped>
/* Add any necessary custom styles here */
</style>