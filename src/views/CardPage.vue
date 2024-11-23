<template>
  <div class="container">
    <div class="content">
      <h1>Hello Card</h1>
      <p>Welcome to the Card page</p>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/layout/Footer.vue';

export default {
  name: "CardPage",
  components: {
    AppFooter,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1; 
  text-align: center;
  padding-bottom: 60px;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
}
</style>
