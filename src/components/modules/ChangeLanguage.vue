<template>
    <div class="relative" ref="dropdownContainer">
        <button @click="toggleLanguageDropdown"
            class="flex items-center space-x-2 px-3 py-2 rounded-full focus:outline-none">
            <AppIcon icon="mdi:earth" width="24" height="24" />
            <span class="text-black">{{ currentLangText }}</span>
            <AppIcon :icon="isLanguageDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="w-4 h-4 text-black" />
        </button>

        <transition name="fade">
            <ul v-if="isLanguageDropdownOpen" :class="dropdownClass"
                class="absolute right-0 w-20 bg-white rounded-lg shadow-lg z-50">
                <li v-for="lang in supportedLanguages" :key="lang" @click="setLanguage(lang)"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded transition-colors duration-200 ease-in-out">
                    <span>{{ lang.toUpperCase() }}</span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "ChangeLanguage",
    props: {
        dropdownPosition: {
            type: String,
            default: "bottom",
        },
    },
    data() {
        return {
            isLanguageDropdownOpen: false,
        };
    },
    computed: {
        ...mapState("language", {
            currentLanguage: (state) => state.currentLanguage,
            supportedLanguages: (state) => state.supportedLanguages,
        }),
        currentLangText() {
            return this.currentLanguage ? this.currentLanguage.toUpperCase() : "EN";
        },
        dropdownClass() {
            return this.dropdownPosition === "top" ? "bottom-full mb-2" : "mt-2";
        },
    },
    methods: {
        ...mapActions("language", ["changeLanguage"]),
        async setLanguage(lang) {
            if (this.supportedLanguages.includes(lang)) {
                await this.changeLanguage(lang); // Update Vuex, cookies, dan i18n
                this.isLanguageDropdownOpen = false; // Tutup dropdown
            }
        },
        toggleLanguageDropdown() {
            this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
        },
        handleClickOutside(event) {
            const dropdown = this.$refs.dropdownContainer;
            if (dropdown && !dropdown.contains(event.target)) {
                this.isLanguageDropdownOpen = false;
            }
        },
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() { // Gunakan `beforeDestroy` jika Anda menggunakan Vue 2
        document.removeEventListener("click", this.handleClickOutside);
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

ul {
    padding: 4px 0;
    list-style: none;
}

li {
    cursor: pointer;
}
</style>
