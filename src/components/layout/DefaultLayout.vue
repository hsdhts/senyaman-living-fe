<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <div class="w-full bg-grey-100 flex-grow">
      <main class="main">
        <slot />
      </main>
    </div>


    <!-- <ChatWithAdmin /> Memanggil komponen Chat di sini -->

    <!-- Footer -->
    <AppFooter />
  </div>
</template>


<script>
import AppHeader from './Header.vue';
import AppFooter from './Footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style scoped>
/* Styles specific to DefaultLayout.vue */
</style>