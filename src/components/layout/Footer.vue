<template>
  <footer class="fixed bottom-0 w-full bg-white border-t">
    <div class="flex justify-around items-center py-3 text-xs lg:text-sm text-gray-600">
      <button
        v-for="item in menuItems"
        :key="item.name"
        @click="setActive(item.name)"
        class="flex flex-col items-center"
        :class="{ 'text-green-500': activeMenu === item.name }"
      >
        <AppIcon :icon="item.icon" class="w-5 h-5 lg:w-6 lg:h-6" />
        <span v-if="activeMenu === item.name">{{ item.label }}</span>
      </button>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      activeMenu: "Home", // Default menu aktif
      menuItems: [
        { name: "Home", label: "Home", icon: "mdi:home" },
        { name: "Card", label: "Card", icon: "mdi:credit-card-outline" },
        { name: "Wallet", label: "Wallet", icon: "mdi:wallet-outline" },
        { name: "Rewards", label: "Rewards", icon: "mdi:star-outline" },
        { name: "Profile", label: "Profile", icon: "mdi:account-outline" },
      ],
    };
  },
  methods: {
    setActive(menuName) {
      this.activeMenu = menuName;
    },
  },
};
</script>

<style scoped>
footer {
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
}

button {
  transition: color 0.3s, transform 0.3s;
}

button:hover {
  color: #10b981; /* Warna hijau */
  transform: scale(1.1); /* Sedikit memperbesar ikon saat hover */
}

.text-green-500 {
  font-weight: bold; /* Menonjolkan menu aktif */
}
</style>
