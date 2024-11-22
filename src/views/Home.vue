<template>
  <DefaultLayout>
    <div class="full-width-bg bg-gray-100">
      <div class="content">
        <SearchHeaderLayout />
      </div>
    </div>

  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue'; // Tambahkan ini

import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    DefaultLayout, // Daftarkan komponen di sini
  },
  computed: {
    ...mapState('properties', ['isLoading', 'properties', 'displayedProperties']),
    skeletonProperties() {
      return Array.from({ length: 10 }, (_, index) => ({
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

  data() {
    return {
    };
  },
  created() {
    this.fetchProperties();
  },
  methods: {
    ...mapActions('properties', ['fetchProperties', 'loadMore']),
    goToDetail(id) {
      this.$router.push(`/property/${id}`); // Navigasi ke URL detail
    },
    toggleFavorite(propertyId) {
      // Logika toggle favorite di sini
      const property = this.displayedProperties.find(p => p.id === propertyId);
      if (property) {
        property.isFavorited = !property.isFavorited;
      }
    }
  },
};
</script>

<style scoped>
/* Background Gradient for each section */
.full-width-bg {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Inner content styling */
.content {
  max-width: 1200px; /* Sesuaikan dengan lebar maksimum yang diinginkan */
  margin: 0 auto;
  padding: 0 1rem; /* Menambahkan padding untuk konten */
}

/* Optional: CSS to add some spacing between sections */
section + section {
  margin-top: 1rem;
}
</style>