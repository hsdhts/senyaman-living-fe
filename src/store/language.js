import Cookies from "js-cookie";
import { loadLocaleMessages } from "@/plugins/LanguageComponent"; // Impor loadLocaleMessages
import i18n from '@/plugins/LanguageComponent'; // Import i18n instance

export default {
  namespaced: true,
  state: () => ({
    currentLanguage: Cookies.get("language") || "en",
    supportedLanguages: ["en", "id"], // Daftar bahasa yang didukung
  }),
  mutations: {
    setLanguage(state, lang) {
      if (state.supportedLanguages.includes(lang)) {
        state.currentLanguage = lang;
        Cookies.set('language', lang);
      }
    },
  },
  actions: {
    async changeLanguage({ commit }, lang) {
      commit('setLanguage', lang);
      await loadLocaleMessages(lang); // Lazy load pesan bahasa
      i18n.global.locale.value = lang; // Perbarui bahasa di i18n menggunakan .value
    },
  },
  getters: {
    currentLanguage: (state) => state.currentLanguage,
    supportedLanguages: (state) => state.supportedLanguages,
  },
};
