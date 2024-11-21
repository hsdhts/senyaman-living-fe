<template>
  <div class="flex flex-col">
      <!-- Sidebar Links -->
      <div class="flex flex-col space-y-4">
          <router-link
              v-for="(route, index) in dashboardRoutes"
              :key="index"
              :to="`/dashboard/${route.path}`"
              class="flex items-center space-x-2 p-3 rounded-lg font-medium transition"
              :class="isActive(route.path) ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'"
          >
              <AppIcon :icon="route.icon" class="h-5 w-5" />
              <span>{{ formatRouteName(route.name) }}</span>
          </router-link>
      </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import router from '@/router';

export default {
  name: 'AppSidebar',
  computed: {
      dashboardRoutes() {
          const dashboardRoute = router.options.routes.find((route) => route.path === '/dashboard');
          return dashboardRoute ? dashboardRoute.children.filter(route => route.menu) : [];
      },
  },
  methods: {
      isActive(routePath) {
          const currentRoute = useRoute();
          return currentRoute.path.includes(routePath);
      },
      formatRouteName(path) {
          return path.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
      },
  },
};
</script>

<style scoped>
.bg-blue-500 {
  background-color: #3b82f6;
}
.text-white {
  color: white;
}
.hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}
</style>