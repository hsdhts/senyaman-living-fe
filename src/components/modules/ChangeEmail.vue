<template>
    <div :class="{ 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center': isModal }" v-if="isVisible">
        <div
            :class="isModal ? 'relative bg-white rounded-lg w-full max-w-xl p-6 mx-4' : 'w-full max-w-md p-6 mx-auto mt-8 bg-white shadow-md rounded-lg'">

            <!-- Close Button untuk Modal -->
            <button v-if="isModal" @click="closeModal" class="absolute top-8 right-6 text-gray-500 focus:outline-none">
                <AppIcon icon="mdi:close" class="w-6 h-6" />
            </button>

            <!-- Title -->
            <h2 class="text-xl font-semibold mb-4">Change Email</h2>
            <hr class="mb-4">

            <!-- Form Input -->
            <form @submit.prevent="submitForm">
                <!-- Current Email Display -->
                <div class="mb-4">
                    <label class="text-sm font-medium text-gray-500">Current Email</label>
                    <div class="mt-1 text-gray-800">{{ currentEmail }}</div>
                </div>

                <!-- New Email Field -->
                <div class="mb-4">
                    <BaseInput 
                        type="email" 
                        placeholder="New Email" 
                        v-model="form.newEmail" 
                        :class="{'border-red-500': errors.newEmail}"
                    />
                </div>

                <!-- Password Field -->
                <div class="mb-4">
                    <BaseInput 
                        type="password" 
                        placeholder="Password" 
                        v-model="form.password" 
                        :class="{'border-red-500': errors.password}"
                    />
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
export default {
    name: "ChangeEmail",
    props: {
        isModal: {
            type: Boolean,
            default: false
        },
        isVisible: {
            type: Boolean,
            default: false
        },
        currentEmail: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            form: {
                newEmail: '',
                password: ''
            },
            errors: {
                newEmail: false,
                password: false
            }
        };
    },
    methods: {
        submitForm() {
            this.validateForm();

            // Jika tidak ada error, emit event untuk berpindah ke halaman verifikasi
            if (!this.errors.newEmail && !this.errors.password) {
                this.$emit('otpSent', { type: 'email', newEmail: this.form.newEmail });
                this.closeModal();
            }
        },
        validateForm() {
            // Reset error states
            this.errors.newEmail = !this.form.newEmail || !this.validateEmail(this.form.newEmail);
            this.errors.password = !this.form.password;
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
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
</style>