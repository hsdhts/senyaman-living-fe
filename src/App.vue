<template>
  <div class="bg-gray-100">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import i18n from './plugins/LanguageComponent';
import { loadLocaleMessages } from './plugins/LanguageComponent';

export default {
  name: 'App',
  computed: {
    ...mapGetters('language', ['currentLanguage']),
  },
  watch: {
    currentLanguage(newLang) {
      if (newLang !== i18n.global.locale.value) {
        loadLocaleMessages(newLang);
      }
    },
  },
  async mounted() {
    const savedLanguage = i18n.global.locale.value || 'en';
    console.log(`App mounted with language: ${savedLanguage}`);
    await loadLocaleMessages(savedLanguage);
    i18n.global.locale.value = savedLanguage;
  },
};
</script>

<style>
/* Global styles can go here */
</style>
