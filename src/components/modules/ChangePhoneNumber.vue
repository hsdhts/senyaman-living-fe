<template>
    <div :class="{ 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center': isModal }" v-if="isVisible">
        <div
            :class="isModal ? 'relative bg-white rounded-lg w-full max-w-xl p-6 mx-4' : 'w-full max-w-md p-6 mx-auto mt-8 bg-white shadow-md rounded-lg'">

            <!-- Close Button untuk Modal -->
            <button v-if="isModal" @click="closeModal" class="absolute top-8 right-6 text-gray-500 focus:outline-none">
                <AppIcon icon="mdi:close" class="w-6 h-6" />
            </button>

            <!-- Title -->
            <h2 class="text-xl font-semibold mb-4">Change Phone Number</h2>
            <hr class="mb-4">

            <!-- Form Input -->
            <form @submit.prevent="submitForm">

                <MazPhoneNumberInput v-model="phoneNumber" v-model:country-code="countryCode" show-code-on-list
                    :size="'md'" :defaultCountryCode="'ID'" :preferred-countries="['ID', 'MY', 'SG', 'US', 'TH']"
                    :ignored-countries="['AC']" @update="results = $event" class="custom-phone-input w-full mb-4" />
                <code>
                    {{ results }}
                </code>

                <!-- Password Field -->
                <div class="mb-4">
                    <BaseInput type="password" placeholder="Password" v-model="form.password"
                        :class="{ 'border-red-500': errors.password }" />
                </div>

                <!-- Submit Button -->
                <div class="flex flex-row justify-end">
                    <button type="submit"
                        class="py-2 px-4 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                        <AppIcon icon="mdi:lock-outline" class="inline-block mr-1 w-5 h-5" />
                        Send OTP Code
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import CountryCodes from '@/assets/js/CountryCodes.json';

const MazPhoneNumberInput = () => import('maz-ui/components/MazPhoneNumberInput');

export default {
    name: "ChangePhoneNumber",
    components: {
        MazPhoneNumberInput
    },
    props: {
        isModal: {
            type: Boolean,
            default: false
        },
        isVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {
                countryCode: '62', // Default country code
                phoneNumber: '',
                password: ''
            },
            errors: {
                countryCode: false,
                phoneNumber: false,
                password: false
            },
            countries: CountryCodes.map(country => ({
                value: country.dial_code,
                name: country.name,
                label: `${country.name} +(${country.dial_code})`
            })) // Mengonversi data JSON ke format yang dibutuhkan
        };
    },
    methods: {
        submitForm() {
            this.validateForm();

            // Jika tidak ada error, lanjutkan dengan submit form
            if (!this.errors.phoneNumber && !this.errors.password) {
                this.$emit('otpSent', { type: 'phone', newPhone: this.form.phoneNumber });
                this.closeModal();
            }
        },
        validateForm() {
            // Reset error states
            this.errors.countryCode = !this.form.countryCode;
            this.errors.phoneNumber = !this.form.phoneNumber;
            this.errors.password = !this.form.password;
        },
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
/* Styling untuk background opacity dan border warna merah */
.bg-opacity-50 {
    background-color: rgba(0, 0, 0, 0.5);
}

.border-red-500 {
    border-color: #f87171;
}

.text-red-500 {
    color: #f87171;
}

.custom-phone-input {
    --maz-border-color: #d1d5db;
    --maz-border-radius: 8px;
    --maz-border-width: 1px;
    --maz-input-padding: 0.5rem 0.75rem;
}

</style>