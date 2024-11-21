<template>
  <div class="max-w-screen-xl mx-auto py-8 px-4 sm:px-8">
    <!-- Header Section -->
    <h2 class="text-2xl font-semibold text-left mb-6">
      {{ $t("staycationPrompt") }} 🧳 🌤️ 🏖️
    </h2>

    <!-- Carousel Section -->
    <div class="relative flex items-center gap-6 py-4 my-4">
      <!-- Left Arrow for navigation -->
      <button @click="prevSlide" aria-label="Go to previous slide" class="nav-button left"
        :disabled="activeIndex === 0">
        <AppIcon icon="mdi:chevron-left" class="icon-style" />
      </button>

      <!-- Carousel Container -->
      <div ref="carouselContainer" class="relative overflow-hidden w-full">
        <div class="flex transition-transform duration-300 ease-out gap-4 my-4" :style="containerStyle">
          <!-- Carousel items -->
          <PropertyCard v-for="property in (isLoading ? skeletonProperties : properties)" :key="property.id"
            :image="property.image" :name="property.name" :title="property.title" :location="property.location"
            :price="property.price" :rating="property.rating" :reviews="property.reviews"
            :isInitiallyFavorited="property.isFavorited" :loading="loading" :isAllowDetailRoom="false"
            :isCarousel="true" class="property-card" @click="goToDetail(property.id)"
            :style="{ width: `${cardWidth}px` }">
            <template #favoriteIcon>
              <BaseFavorite :isFavorited="property.isFavorited"
                @update:favorite="(newStatus) => toggleFavorite(property.id, newStatus)" />
            </template>
          </PropertyCard>
        </div>
      </div>

      <!-- Right Arrow for navigation -->
      <button @click="nextSlide" aria-label="Go to next slide" class="nav-button right"
        :disabled="activeIndex >= maxIndex">
        <AppIcon icon="mdi:chevron-right" class="icon-style" />
      </button>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
      gap: 16, // Jarak antar card
      cardWidth: 0, // Lebar card
      activeIndex: 0, // Indeks card aktif
    };
  },
  computed: {
    ...mapState("properties", ['isLoading', "properties"]), // Ambil properti dari Vuex

    itemsPerPage() {
      // Jumlah item yang terlihat berdasarkan ukuran layar
      const width = window.innerWidth;
      if (width >= 1024) return 3; // Desktop
      if (width >= 768) return 2; // Tablet
      return 1; // Mobile
    },

    maxIndex() {
      // Indeks maksimal yang dapat dicapai (untuk menghindari ujung)
      return Math.max(this.properties.length - this.itemsPerPage, 0);
    },

    containerStyle() {
      // Posisi transformasi untuk menggeser card
      return {
        transform: `translateX(-${this.activeIndex * (this.cardWidth + this.gap)}px)`,
      };
    },
    skeletonProperties() {
      return Array.from({ length: this.itemsPerPage }, (_, index) => ({
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
  methods: {
    ...mapActions("properties", ["fetchProperties"]),

    calculateCardWidth() {
      const container = this.$refs.carouselContainer;
      if (container) {
        const containerWidth = container.offsetWidth;
        this.cardWidth = Math.floor(
          (containerWidth - (this.itemsPerPage - 1) * this.gap) / this.itemsPerPage
        );
      }
    },

    nextSlide() {
      if (this.activeIndex < this.maxIndex) {
        this.activeIndex++;
      }
    },

    prevSlide() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    },

    toggleFavorite(id) {
      const property = this.properties.find((p) => p.id === id);
      if (property) {
        property.isFavorited = !property.isFavorited;
      }
    },

    onResize() {
      this.calculateCardWidth();
    },
  },
  mounted() {
    this.fetchProperties().then(() => {
      this.loading = false;
    });
    this.calculateCardWidth();
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>


<style scoped>
.nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.left {
  left: -2rem;
}

.right {
  right: -2rem;
}

.carousel-container {
  display: flex;
  overflow: hidden;
  width: 100%;
  padding: 12px 0;
}

.property-card {
  flex-shrink: 0;
  transition: transform 0.3s ease-out;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1024px) {
  .left {
    left: -1rem;
  }

  .right {
    right: -1rem;
  }
}

@media (max-width: 768px) {
  .left {
    left: -0.5rem;
  }

  .right {
    right: -0.5rem;
  }
}
</style>
