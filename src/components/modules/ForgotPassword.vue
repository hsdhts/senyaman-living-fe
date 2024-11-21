<template>
    <div :class="{ 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center': isModal }" v-if="isVisible">
        <div
            :class="isModal ? 'relative bg-white rounded-lg w-full max-w-xl p-6 mx-4' : 'w-full max-w-md p-6 mx-auto mt-8 bg-white shadow-md rounded-lg'">

            <!-- Close Button untuk Modal -->
            <button v-if="isModal" @click="closeModal" class="absolute top-8 right-6 text-gray-500 focus:outline-none">
                <AppIcon icon="mdi:close" class="w-6 h-6" />
            </button>

            <!-- Title -->
            <h2 class="text-xl font-semibold mb-4">Change Password</h2>
            <hr class="mb-4">

            <!-- Form Input -->
            <form @submit.prevent="submitForm">
                <!-- Current Password Field -->
                <div class="mb-4">
                    <BaseInput type="password" placeholder="Current Password" v-model="form.currentPassword"
                        :class="{ 'border-red-500': errors.currentPassword }" />
                    <div v-if="errors.currentPassword" class="flex flex-row gap-2 text-red-500 items-center">
                        <AppIcon icon="mdi:alert-circle" class="w-4 h-4 inline mr-1" />
                        <p class="text-sm mt-1">
                            Kata sandi tidak tepat!
                        </p>
                    </div>
                </div>

                <!-- New Password Field -->
                <div class="mb-4">
                    <BaseInput type="password" placeholder="New Password" v-model="form.newPassword"
                        :class="{ 'border-red-500': errors.newPassword }" />
                </div>

                <!-- Confirm New Password Field -->
                <div class="mb-4">
                    <BaseInput type="password" placeholder="Confirm New Password" v-model="form.confirmNewPassword"
                        :class="{ 'border-red-500': errors.confirmNewPassword }" />

                    <div v-if="errors.confirmNewPassword" class="flex flex-row gap-2 text-red-500 items-center">
                        <AppIcon icon="mdi:alert-circle" class="w-4 h-4 inline mr-1" />
                        <p class="text-sm mt-1">
                            Ulangi Kata Sandi tidak cocok dengan Kata Sandi baru!
                        </p>
                    </div>

                </div>

                <!-- Submit Button -->
                <button type="submit"
                    class="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                    Change Password
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "ForgotPassword",
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
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            },
            errors: {
                currentPassword: true,
                newPassword: false,
                confirmNewPassword: true
            }
        };
    },
    methods: {
        submitForm() {
            this.validateForm();

            // Jika tidak ada error, lanjutkan dengan submit form
            if (!this.errors.currentPassword && !this.errors.confirmNewPassword) {
                alert('Password changed successfully!');
                this.closeModal();
            }
        },
        validateForm() {
            // Reset error states
            this.errors.currentPassword = !this.form.currentPassword; // Asumsikan ada logika untuk validasi password lama
            this.errors.newPassword = !this.form.newPassword;
            this.errors.confirmNewPassword = this.form.newPassword !== this.form.confirmNewPassword;
        },
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
/* Additional styling for modal */
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