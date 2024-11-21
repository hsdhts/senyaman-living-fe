<template>
  <footer class="fixed bottom-0 w-full bg-white border-t">
    <div class="flex justify-around items-center py-3 text-sm text-gray-600">
      <!-- Ikon Navigasi -->
      <button class="flex flex-col items-center text-green-500">
        <AppIcon icon="mdi:home" class="w-6 h-6" />
        <span>Home</span>
      </button>
      <button class="flex flex-col items-center">
        <AppIcon icon="mdi:credit-card-outline" class="w-6 h-6" />
        <span>Payment</span>
      </button>
      <button class="flex flex-col items-center">
        <AppIcon icon="mdi:wallet-outline" class="w-6 h-6" />
        <span>Wallet</span>
      </button>
      <button class="flex flex-col items-center">
        <AppIcon icon="mdi:star-outline" class="w-6 h-6" />
        <span>Rewards</span>
      </button>
      <button class="flex flex-col items-center">
        <AppIcon icon="mdi:account-outline" class="w-6 h-6" />
        <span>Account</span>
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
footer {
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
}
button {
  color: inherit;
  transition: color 0.3s;
}
button:hover {
  color: #10b981; /* Warna hijau */
}
</style>
