import { createI18n } from 'vue-i18n';
import Cookies from "js-cookie"; // Import js-cookie

const i18nConfig = {
  legacy: false, // Menggunakan Composition API untuk Vue 3
  locale: Cookies.get("language") || "en", // Atur bahasa awal dari cookies
  fallbackLocale: 'en', // Bahasa fallback
  messages: {}, // Definisi bahasa kosong di awal (akan dimuat lazy)
};

const i18n = createI18n(i18nConfig);

// Fungsi untuk lazy-load pesan bahasa
export const loadLocaleMessages = async (locale) => {
  if (!i18n.global.availableLocales.includes(locale)) {
    try {
      const messages = await import(
        /* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`
      );
      i18n.global.setLocaleMessage(locale, messages.default);
    } catch (e) {
      console.error(`Error loading locale ${locale}:`, e);
    }
  }
  i18n.global.locale.value = locale; // Tetapkan bahasa aktif menggunakan .value
  Cookies.set("language", locale); // Simpan ke cookies
};

export default i18n;