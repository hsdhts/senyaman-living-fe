<template>
    <!-- Filter Kategori -->
    <div class="flex space-x-4 mx-4 mt-8 overflow-x-auto">
        <button v-for="category in categories" :key="category.value" @click="setCategoryFilter(category.value)" :class="{
            'bg-blue-500 text-white': category.value === selectedCategory,
            'bg-white text-blue-500': category.value !== selectedCategory
        }" class="px-4 py-2 rounded-lg border border-blue-500 whitespace-nowrap">
            {{ category.label }}
        </button>
    </div>

    <!-- Grid untuk Property Cards -->
    <div class="grid grid-cols-1 mx-4 sm:mx-0 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mt-8">
        <PropertyCard v-for="property in (isLoading ? skeletonProperties : limitedProperties)" :key="property.id"
            :name="property.name" :image="property.image" :title="property.title" :location="property.location"
            :price="property.price" :rating="property.rating" :reviews="property.reviews"
            :isInitiallyFavorited="property.isFavorited" :loading="isLoading" class="w-full cursor-pointer"
            @click="goToDetail(property.id)">
            <!-- Slot untuk Ikon Favorit -->
            <template #favoriteIcon>
                <BaseFavorite :isFavorited="property.isFavorited"
                    @update:favorite="(newStatus) => toggleFavorite(property.id, newStatus)" />
            </template>
        </PropertyCard>
    </div>

    <!-- Tombol Show More -->
    <div v-if="limitedProperties.length < filteredProperties.length" class="flex flex-col items-center space-y-4 py-8">
        <p class="text-lg text-gray-700">{{ $t('continueExploring') }}</p>
        <button @click="loadMoreProperties"
            class="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-800 focus:outline-none">
            {{ $t('showMore') }}
        </button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'HomePage',
    data() {
        return {
            selectedCategory: 'all', // Default ke 'all'
            categories: [
                { label: 'All', value: 'all' },
                { label: 'Apartment', value: 'Apartment' },
                { label: 'Hotel', value: 'Hotel' },
                { label: 'Guest House', value: 'Guest House' },
                { label: 'Kost', value: 'Kost' },
                { label: 'Villa', value: 'Villa' },
            ],
            visibleRows: 1, // Jumlah baris yang ditampilkan
            columnsPerRow: 1, // Default jumlah kolom per baris (1 untuk tampilan mobile)
        };
    },
    computed: {
        ...mapState('properties', ['isLoading', 'properties', 'displayedProperties']),

        // Array properti yang difilter berdasarkan kategori
        filteredProperties() {
            if (this.selectedCategory === 'all') return this.displayedProperties;
            return this.displayedProperties.filter(
                (property) => property.category === this.selectedCategory
            );
        },

        // Properti yang dibatasi berdasarkan jumlah baris yang terlihat
        limitedProperties() {
            const limit = this.visibleRows * this.columnsPerRow;
            return this.filteredProperties.slice(0, limit);
        },

        // Skeleton properties untuk tampilan loading
        skeletonProperties() {
            return Array.from({ length: this.columnsPerRow }, (_, index) => ({
                id: `skeleton-${index}`,
                image: [],
                title: '',
                location: '',
                price: '',
                rating: '',
                reviews: '',
                isFavorited: false,
            }));
        },
    },
    created() {
        this.fetchProperties();
    },
    mounted() {
        // Tambahkan listener untuk mendeteksi perubahan ukuran layar
        this.updateColumnsPerRow();
        window.addEventListener('resize', this.updateColumnsPerRow);
    },
    beforeUnmount() {
        // Hapus listener saat komponen di-unmount
        window.removeEventListener('resize', this.updateColumnsPerRow);
    },
    methods: {
        ...mapActions('properties', ['fetchProperties', 'loadMore']),
        goToDetail(id) {
            this.$router.push(`/property/${id}`);
        },
        toggleFavorite(propertyId) {
            const property = this.displayedProperties.find(p => p.id === propertyId);
            if (property) {
                property.isFavorited = !property.isFavorited;
            }
        },
        setCategoryFilter(category) {
            this.selectedCategory = category; // Update kategori yang dipilih
            this.visibleRows = 1; // Reset jumlah baris saat kategori berubah
        },
        loadMoreProperties() {
            this.visibleRows += 1; // Tambah satu baris setiap kali tombol "Load More" ditekan
        },
        updateColumnsPerRow() {
            // Periksa ukuran layar dan atur columnsPerRow sesuai grid
            if (window.matchMedia('(min-width: 1280px)').matches) {
                // Untuk ukuran xl ke atas
                this.columnsPerRow = 4;
            } else if (window.matchMedia('(min-width: 768px)').matches) {
                // Untuk ukuran md ke atas
                this.columnsPerRow = 3;
            } else {
                // Untuk ukuran di bawah md
                this.columnsPerRow = 1;
            }
        }
    },
};
</script>

<style scoped>
/* Gaya untuk button kategori */
button.bg-white {
    transition: background-color 0.3s, color 0.3s;
}

button.bg-white:hover {
    background-color: #1e40af;
    color: #ffffff;
}

/* Layout responsif */
.grid-cols-1 {
    grid-template-columns: 1fr;
}

@media (min-width: 640px) {
    .sm\:grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 768px) {
    .md\:grid-cols-3 {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1280px) {
    .xl\:grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>