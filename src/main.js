import { createApp } from 'vue';
import { MAINCONFIG } from './mainconfig.js'; // Import objek MAINCONFIG
import App from './App.vue';
import './assets/styles/main.css';
import '@splidejs/vue-splide/css';
import i18n, { loadLocaleMessages } from './plugins/LanguageComponent.js'; // Import i18n dan fungsi lazy-load
import router from './router/index.js'; // Import router
import BaseComponents from './components/base/index.js';
import ModuleComponents from './components/modules/index.js';
import Skeleton from '@brayamvalero/vue3-skeleton';
import '@brayamvalero/vue3-skeleton/dist/style.css';
import { vMaska } from 'maska/vue'; // Import Maska directive
import 'leaflet/dist/leaflet.css';
import { createHead } from '@vueuse/head';
import VueLazyload from 'vue-lazyload';
import defaultImage from '@/assets/images/400x300.webp';
import store from './store/index.js'; // Import Vuex store
import IconComponent from './plugins/IconComponent.js'; // Import IconComponent
import formatters from './utils/formatters.js';
import 'maz-ui/styles'; // Import Maz UI CSS
import responseMappingPlugin from '@/plugins/responseMapping';

const app = createApp(App);
const head = createHead();

// Registrasi komponen global
Object.entries(ModuleComponents).forEach(([name, component]) => {
  app.component(name, component);
});

(async () => {
  // Muat bahasa dari cookies atau gunakan default (fallback)
  const currentLanguage = store.state.language.currentLanguage || 'en';
  await loadLocaleMessages(currentLanguage); // Pastikan bahasa dimuat sebelum aplikasi dirender

  // Gunakan plugin dan konfigurasi
  app.use(BaseComponents);
  app.use(router); // Gunakan router
  app.use(Skeleton); // Gunakan Skeleton
  app.directive('maska', vMaska); // Gunakan Maska untuk masking input
  app.use(store); // Gunakan store
  app.use(i18n); // Gunakan i18n
  app.use(head); // Gunakan vue-use-head untuk SEO
  app.use(VueLazyload, {
    preLoad: 1.3,
    error: defaultImage, // Gambar default untuk error
    loading: defaultImage, // Gambar default untuk loading
    attempt: 3, // Coba ulang hingga 3 kali
    observer: true, // Gunakan IntersectionObserver untuk lazy loading
    observerOptions: {
      rootMargin: '0px', // Tambahan jarak untuk trigger lazy loading
      threshold: 0.1, // 10% elemen terlihat sebelum memuat gambar
    },
  });
  app.use(IconComponent); // Gunakan IconComponent untuk registrasi global
  app.use(responseMappingPlugin); // Plugin untuk respons API

  // Properti global
  app.config.globalProperties.$config = MAINCONFIG;
  app.config.globalProperties.$formatters = formatters;

  // Mount aplikasi
  app.mount('#app');
})();
