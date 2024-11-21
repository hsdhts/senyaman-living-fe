<template>
    <div :class="{ 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center': isModal }" v-if="isVisible">
        <div class="relative bg-white rounded-lg w-full max-w-md p-6 mx-4">
            <!-- Close Button untuk Modal -->
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-500">
                <AppIcon icon="mdi:close" class="w-6 h-6" />
            </button>

            <!-- Title -->
            <h2 class="text-xl font-semibold mb-4">Verification</h2>
            <hr class="mb-4">

            <p class="mb-4">Kami telah mengirimkan kode OTP ke {{ contactInfo }}.</p>

            <!-- OTP Code Input -->
            <div class="mb-4">
                <BaseInput type="text" placeholder="OTP Code" v-model="otpCode" />
            </div>

            <!-- Resend Link -->
            <div class="mb-4 text-right text-sm text-blue-500 cursor-pointer" @click="resendOTP">
                Resend OTP Code ({{ countdown }})
            </div>

            <!-- Submit Button -->
            <button @click="verifyOTP" class="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Verify OTP
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "VerificationOTP",
    props: {
        isModal: {
            type: Boolean,
            default: false
        },
        isVisible: {
            type: Boolean,
            default: false
        },
        verificationType: {
            type: String,
            default: ''
        },
        contactInfo: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            otpCode: '',
            countdown: '01:00'
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        resendOTP() {
            // Logic untuk mengirim ulang OTP
            alert('OTP resent');
        },
        verifyOTP() {
            // Logic untuk memverifikasi OTP
            alert('OTP verified');
            this.closeModal();
        }
    }
};
</script>