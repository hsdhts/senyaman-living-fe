<template>
  <footer class="fixed bottom-0 w-full bg-white border-t">
    <div class="flex justify-around items-center py-3 text-xs lg:text-sm text-gray-600">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.route"
        class="relative flex flex-col items-center"
        active-class="text-green-500"
      >
        <div
          v-if="item.name === 'Wallet'"
          class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md -mt-6"
        >
          <AppIcon :icon="item.icon" class="w-8 h-8 text-green-500" />
        </div>

        <div v-else class="flex flex-col items-center mt-6">
          <AppIcon :icon="item.icon" class="w-5 h-5 lg:w-6 lg:h-6" />
          <span>{{ item.label }}</span>
        </div>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      menuItems: [
        { name: "Home", label: "Home", icon: "mdi:home", route: "/" },
        { name: "Card", label: "Card", icon: "mdi:credit-card-outline", route: "/card" },
        { name: "Wallet", label: "Wallet", icon: "mdi:wallet-outline", route: "/payment" },
        { name: "Rewards", label: "Rewards", icon: "mdi:star-outline", route: "/reward" },
        { name: "Profile", label: "Profile", icon: "mdi:account-outline", route: "/dashboard/profile" },
      ],
    };
  },
};
</script>

<style scoped>
footer {
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

router-link {
  transition: color 0.3s, transform 0.3s;
}

router-link:hover {
  color: #10b981;
  transform: scale(1.1);
}

.w-12.h-12 {
  transform: translateY(-20%);
}

.shadow-md {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
}


router-link div.mt-6 {
  margin-top: 24px;
}


.text-green-500 {
  color: #10b981; 
}
</style>
