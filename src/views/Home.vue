<template>
  <DefaultLayout>
    <div class="full-width-bg bg-gray-100">
      <div class="content">
        <SearchHeaderLayout />
      </div>
    </div>
    <div class="category-section full-width-bg">
      <div class="content">
        <CategoryLayout class="px-20" />
      </div>
    </div>
    <div class="carousel-section full-width-bg">
      <div class="content">
        <CarouselLayout />
      </div>
    </div>

    <div class="budget-section full-width-bg">
      <div class="content">
        <BudgetFilterLayout />
      </div>
    </div>

  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue'; // Tambahkan ini
import SearchHeaderLayout from '@/components/layout/SearchHeaderLayout.vue'; // Tambahkan ini
import CategoryLayout from '@/components/layout/CategoryLayout.vue'; // Tambahkan ini
import CarouselLayout from '@/components/layout/CarouselLayout.vue'; // Tambahkan ini
import BudgetFilterLayout from '@/components/layout/BudgetFilterLayout.vue'; // Tambahkan ini

import { mapState, mapActions } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    DefaultLayout, // Daftarkan komponen di sini
    SearchHeaderLayout,
    CategoryLayout,
    CarouselLayout,
    BudgetFilterLayout
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

.category-section {
  background: linear-gradient(to bottom, #fefefe 50%, #F6FAFF 50%);
  padding: 2rem 0;
}

.carousel-section {
  background: linear-gradient(to bottom, #ffffff 50%, #F6FAFF 50%);
  padding: 2rem 0;
}

.budget-section {
  background: linear-gradient(to bottom, #F6FAFF 50%, #fefefe 50%);
  padding: 2rem 0;
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