<template>
    <DefaultLayout>
        <div class="mx-4 md:container sm:mx-8 lg:mx-auto my-8 py-8 bg-white shadow-md rounded-lg">
            <!-- Header Row: User Info and Points -->
            <div class="flex flex-col md:flex-row justify-between items-center mb-8 px-6 md:px-8 lg:px-12">
                <!-- User Info -->
                <div class="flex items-center space-x-4 mb-4 md:mb-0">
                    <AppIcon icon="mdi:account" class="h-14 w-14" />
                    <div>
                        <p class="text-lg font-semibold">{{ user?.Name || 'Guest' }}</p>
                        <p class="text-gray-500 text-sm">{{ user?.PhoneNumber || 'No Phone Number' }}</p>
                        <p class="text-gray-500 text-sm">{{ user?.Email || 'No Email' }}</p>
                    </div>
                </div>
                <!-- Points Display -->
                <div class="text-center md:text-right">
                    <p class="text-gray-500">Poin saat ini:</p>
                    <p class="text-blue-600 font-semibold text-lg">{{ user?.Points || 0 }}</p>
                </div>
            </div>

            <div class="border-b-2 mx-6 md:mx-8 lg:mx-12"></div>

            <!-- Main Layout Row: Sidebar and Main Content -->
            <div class="flex flex-col lg:flex-row gap-6 px-6 md:px-8 lg:px-12 mt-6">
                <!-- Sidebar -->
                <Sidebar class="lg:w-1/4 p-4 lg:p-6" />

                <!-- Main Content with Dynamic Route View -->
                <div class="flex-grow p-4 lg:p-8">
                    <router-view />
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import { mapState } from 'vuex';

export default {
    name: 'ViewDashboard',
    components: {
        DefaultLayout,
    },
    computed: {
        ...mapState('user', {
            user: (state) => state.user, // Ambil state user dari modul user
        }),
        
    },
};
</script>

<style scoped>
/* .container {
    max-width: 1200px;
} */
</style>
