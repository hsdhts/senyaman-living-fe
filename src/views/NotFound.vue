<template>
    <div
        class="flex flex-col justify-center items-center min-h-screen bg-cover bg-center text-center space-y-4 background-404">
        <div class="bg-white bg-opacity-80 p-8 rounded-lg">
            <div class="flex items-center justify-center h-full">
                <AppIcon icon="mdi:close" class="h-16 w-16" />            
            </div>

            <h1 class="text-5xl font-bold text-blue-600 mb-2">Oops!</h1>
            <h2 class="text-3xl font-semibold text-gray-800 mb-2">404 - Page Not Found</h2>
            <p class="text-lg text-gray-600 mb-6">We couldn't find the page you're looking for.</p>
            <router-link to="/" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                Go back to Home
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
/* Background image for the 404 page */
.background-404 {
    background-image: url('@/assets/images/404.gif');
    /* Adjust path to your image */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>