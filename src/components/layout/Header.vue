<template>
    <header class="bg-white border-b">
        <div class="flex items-center justify-between px-4 py-3">
            <div class="flex items-center space-x-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-gray-100">
                    <AppIcon icon="mdi:account" class="w-6 h-6 text-gray-600" />
                </div>
                <div>
                    <p class="text-gray-700 font-medium text-sm">Hi, <span class="text-green-700 font-semibold">Login
                            Now</span></p>
                </div>
            </div>

            <div class="flex items-center space-x-4">
                <button>
                    <AppIcon icon="mdi:ticket-percent-outline" class="w-6 h-6 text-green-500" />
                </button>
                <button>
                    <AppIcon icon="mdi:bell-outline" class="w-6 h-6 text-gray-600" />
                </button>
            </div>
        </div>
        <div class="bg-green-500 text-white px-4 py-2 text-sm flex flex-col items-start justify-between">
            <p>Be part of something special,</p>
            <p>Sign Up Now and Start Enjoying the Rewards!</p>
        </div>

    </header>
</template>
  
  <script>
export default {
    name: 'AppHeader',
};
</script>
  
  <style scoped>
header {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
</style>
  