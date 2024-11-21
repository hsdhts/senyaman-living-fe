<template>
    <div class="flex flex-col">
        <div>
            <h2 class="text-3xl font-semibold mb-8">My Profile</h2>
            <h3 class="text-lg font-medium text-gray-700 mb-4 pb-2 border-b">Personal Information</h3>

            <!-- Layout Form -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Baris 1: Name -->
                <div class="md:col-span-2">
                    <BaseInput type="text" floatingLabel="Name" :modelValue="name" />
                </div>

                <!-- Baris 2: Country dan City -->
                <div>
                    <BaseSelectIcon v-model="country" :options="countryOptions" floatingLabel="Country" />
                </div>
                <div>
                    <BaseSelectIcon floatingLabel="City" v-model="city" :options="cityOptions" />
                </div>

                <!-- Baris 3: Email dan Phone Number -->
                <div>
                    <BaseInput type="email" floatingLabel="Email Address" :modelValue="email" disabled
                        :iconBack="'mdi:pencil'" :iconBackClick="triggerChangeEmail" />
                </div>
                <div>
                    <BaseInput type="text" floatingLabel="Phone Number" :modelValue="phoneNumber" disabled
                        :iconBack="'mdi:pencil'" :iconBackClick="triggerChangePhoneNumber" />
                </div>
            </div>

            <!-- Change Password Link -->
            <div class="mt-3">
                <button class="text-blue-600 font-medium flex items-center" @click="triggerForgotPasswordModal">
                    <AppIcon icon="mdi-lock" class="mr-2 w-6 h-6" /> Change Password
                </button>
            </div>
        </div>
    </div>

    <!-- Modal Forgot Password -->
    <ForgotPassword :isModal="true" :isVisible="showForgotPasswordModal" @close="triggerForgotPasswordModal" />
    <ChangePhoneNumber :isModal="true" :isVisible="showChangePhoneNumberModal" @otpSent="openVerification"
        @close="triggerChangePhoneNumber" />
    <ChangeEmail :isModal="true" :isVisible="showChangeEmailModal" @otpSent="openVerification" :currentEmail="email"
        @close="triggerChangeEmail" />
    <!-- Modal Verification -->
    <VerificationOTP v-if="showVerification" :isModal="true" :isVisible="showVerification"
        :verificationType="verificationType" :contactInfo="contactInfo" @close="showVerification = false" />
</template>

<script>
import { mapState } from "vuex";
import { useRoute } from 'vue-router';
import router from '@/router';

export default {
    name: 'AppProfile',
    computed: {
        ...mapState("user", {
            user: (state) => state.user, // Ambil user dari state user
        }),
        dashboardRoutes() {
            const dashboardRoute = router.options.routes.find((route) => route.path === '/dashboard');
            return dashboardRoute ? dashboardRoute.children.filter(route => route.menu) : [];
        },
        name() {
            return this.user?.Name || ""; // Ambil nama dari user state
        },
        email() {
            return this.user?.Email || ""; // Ambil email dari user state
        },
        phoneNumber() {
            return this.user?.PhoneNumber || ""; // Ambil nomor telepon dari user state
        },
        country() {
            return this.user?.Country || "ID"; // Ambil negara dari user state
        },
        city() {
            return this.user?.City || ""; // Ambil kota dari user state
        },
    },
    data() {
        return {
            showForgotPasswordModal: false,
            showChangePhoneNumberModal: false,
            showChangeEmailModal: false,
            showVerification: false,
            countryOptions: [
                { label: 'Indonesia', value: 'ID' },
                { label: 'Malaysia', value: 'MY' },
                { label: 'Singapore', value: 'SG' }
            ],
            cityOptions: [
                { label: 'Jakarta', value: 'jakarta' },
                { label: 'Medan', value: 'medan' },
                { label: 'Surabaya', value: 'surabaya' }
            ]
        };
    },
    methods: {
        isActive(routePath) {
            const currentRoute = useRoute();
            return currentRoute.path.includes(routePath);
        },
        formatRouteName(path) {
            return path.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
        },
        triggerChangePhoneNumber() {
            this.showChangePhoneNumberModal = !this.showChangePhoneNumberModal;
        },
        triggerForgotPasswordModal() {
            this.showForgotPasswordModal = !this.showForgotPasswordModal;
        },
        triggerChangeEmail() {
            this.showChangeEmailModal = !this.showChangeEmailModal;
        },
        openVerification({ type, newEmail, newPhone }) {
            this.verificationType = type;
            this.contactInfo = type === 'email' ? newEmail : newPhone;
            this.showVerification = true;
            this.showChangeEmailModal = false;
            this.showChangePhoneNumberModal = false;
        },
        closeVerification() {
            this.showVerification = false;
        }
    },
};
</script>

<style scoped>
.bg-blue-500 {
    background-color: #3b82f6;
}

.text-white {
    color: white;
}

.hover\:bg-gray-100:hover {
    background-color: #f3f4f6;
}
</style>