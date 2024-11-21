<template>
    <div class="relative">
        <!-- User Menu Button -->
        <button @click="toggleUserMenu" class="p-2 bg-gray-200 rounded-full focus:outline-none">
            <div class="flex justify-center gap-2">
                <!-- Menampilkan ikon burger atau close sesuai kondisi isUserMenuOpen -->
                <AppIcon v-if="!isUserMenuOpen" icon="mdi:menu" height="24" width="24" alt="menu_icon" />
                <AppIcon v-else icon="mdi:close" height="24" width="24" alt="close_icon" />

                <AppIcon icon="mdi:user" height="24" width="24" alt="user_icon" />
            </div>
        </button>

        <!-- Dropdown User Menu -->
        <transition name="fade">
            <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <router-link to="/register" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign
                    up</router-link>
                <a href="#" @click.prevent="toggleLoginModal" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Log in</a>
                <router-link to="/gift-cards" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Gift
                    cards</router-link>
                <router-link to="/airbnb-your-home" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Airbnb your
                    home</router-link>
                <router-link to="/host-experience" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Host an
                    experience</router-link>
                <router-link to="/help-center" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Help
                    Center</router-link>
            </div>
        </transition>
        
        <!-- Tampilkan modal jika showModal true -->
        <LoginSignUpModal v-if="showModal" @close="showModal = false" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            isUserMenuOpen: false, // Status toggle user menu
            showModal: false, // Status untuk modal login
        };
    },
    methods: {
        toggleUserMenu() {
            this.isUserMenuOpen = !this.isUserMenuOpen;
        },
        toggleLoginModal() {
            this.showModal = !this.showModal; // Tampilkan atau sembunyikan modal login
            this.isUserMenuOpen = false; // Tutup user menu saat modal dibuka
        },
    },
};
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* Animasi transisi ikon burger */
.menu-icon,
.close-icon {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Transisi ikon close saat muncul */
.close-icon {
    transform: rotate(90deg);
    /* Rotasi ikon close */
}

.menu-icon {
    transform: rotate(0deg);
    /* Rotasi normal untuk burger */
}
</style>