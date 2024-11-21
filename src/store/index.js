import { createStore } from "vuex";
import Cookies from "js-cookie"; // Import js-cookie
import i18n from "@/plugins/LanguageComponent.js";

const modules = {};

const i18nPlugin = (store) => {
  store.i18n = i18n; // Sisipkan i18n ke Vuex instance
};

// Auto-import semua file modul kecuali `index.js`
const requireModule = require.context(".", false, /^((?!index).)*\.js$/);
requireModule.keys().forEach((fileName) => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, ""); // Hapus ./ dan .js
  modules[moduleName] = requireModule(fileName).default; // Impor modul
});

// Buat store
const store = createStore({
  modules,
  plugins: [i18nPlugin],
});

// Inisialisasi token dari localStorage jika ada
const token = localStorage.getItem("token");
if (token) {
  store.commit("user/setToken", token); // Set token ke state
  store.commit("user/setAuthenticated", true);
}

const savedUser = JSON.parse(localStorage.getItem("user"));
console.log("Saved User in localStorage:", localStorage.getItem("user"));
console.log("Parsed User Object:", JSON.parse(localStorage.getItem("user")));
if (savedUser) {
  store.commit("user/setUser", savedUser);
  console.log("State after setting user:", store.state.user); // Debugging log

  store.commit("user/setAuthenticated", true); // Tandai sebagai autentikasi
}

// Inisialisasi language dari cookies
const savedLanguage = Cookies.get("language");
if (savedLanguage) {
  store.commit("language/setLanguage", savedLanguage); // Set language ke state
}

export default store;