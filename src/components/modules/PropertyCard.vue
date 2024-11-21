<template>
  <div class="relative bg-white shadow-md overflow-hidden rounded-lg">
    <!-- Tombol Favorite -->
    <Skeleton :loading="loading" width="2rem" height="2rem">
      <div class="absolute top-2 right-2 z-10">
        <slot name="favoriteIcon"></slot>
      </div>
    </Skeleton>

    <!-- Gambar Properti dengan Border Radius di Bagian Atas -->
    <div class="aspect-w-4 aspect-h-3 sm:aspect-w-16 sm:aspect-h-9">
      <!-- <Skeleton v-if="loading" width="100%" height="12rem" /> -->
      <!-- <img v-lazy="image" alt="Property Image" v-else class="w-full h-48 object-cover" /> -->
      <img
        v-if="!isImageLoaded"
        :src="defaultImage"
        alt="Default Image"
        class="w-full h-48 object-cover absolute inset-0"
      />
      <!-- <img
        :src="image"
        :alt="altText"
        @load="handleImageLoad"
        @error="handleImageError"
        class="w-full h-48 object-cover absolute inset-0 transition-opacity duration-500"
        :class="{ 'opacity-0': !isImageLoaded, 'opacity-100': isImageLoaded }"
      /> -->
      <!-- <div v-if="!isImageLoaded" class="image-placeholder"></div> -->
      <img :src="image" loading="lazy" :alt="'propertyImage ' + location" @load="handleImageLoad" @error="handleImageError"
        class="w-full h-48 object-cover absolute inset-0 transition-opacity duration-500"
        :class="{ 'opacity-0': !isImageLoaded, 'opacity-100': isImageLoaded }" />
    </div>

    <!-- Wrapper Konten Properti dengan Border Radius di Bagian Bawah -->
    <div class="p-4 bg-white">
      <Skeleton :loading="loading" width="80%">
        <p class="text-gray-600"> {{ name }}
        </p>
      </Skeleton>

      <!-- Nama Properti -->
      <h2 class="text-md text-gray-800 font-semibold truncate-title">
        <Skeleton :loading="loading" width="80%">
          {{ title }}
        </Skeleton>
      </h2>

      <!-- Lokasi Properti -->
      <p class="text-gray-600 text-sm">
        <Skeleton :loading="loading" width="100%">
          {{ location }}
        </Skeleton>
      </p>

      <!-- Jumlah Tamu dan Luas Kamar -->
      <div v-if="isAllowDetailRoom" class="flex items-center space-x-4 text-gray-500 text-sm mt-2">
        <Skeleton :loading="loading" width="50%">
          <span v-if="!loading">
            <AppIcon icon="mdi:person" class="w-5 h-5 mr-1 inline-block" />
            2 Guests
          </span>
        </Skeleton>
        <Skeleton :loading="loading" width="50%">
          <span v-if="!loading">
            <AppIcon icon="mdi:vector-square" class="w-5 h-5 mr-1 inline-block" />
            82 sqm
          </span>
        </Skeleton>
      </div>

      <!-- Skeleton Loader untuk Detail Tamu dan Kamar saat loading -->
      <div v-if="loading" class="flex items-center space-x-4 text-gray-500 text-sm mt-2">
        <Skeleton width="50%" />
        <Skeleton width="50%" />
      </div>
      <!-- Rating dan Reviews -->
      <div class="grid grid-cols-1 items-center gap-x-2 text-yellow-700 text-sm mt-2">
        <Skeleton :loading="loading" width="60%">
          <span v-if="!loading">
            ⭐ {{ rating }} ({{ reviews }} reviews)
          </span>
        </Skeleton>
      </div>

      <!-- Harga Properti -->
      <div class="flex justify-between items-center border-t border-gray-200 pt-2 mt-2">
        <Skeleton :loading="loading" width="50%">
        </Skeleton>

        <span v-if="!loading" class="text-gray-900 font-bold text-md flex flex-row justify-between w-full">
          <div :class="isCarousel ? 'text-blue-300 font-thin' : 'text-black'">
            {{ isCarousel ? 'START FROM' : 'IDR' }}
          </div>
          <div>{{ price }} / night</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Skeleton } from '@brayamvalero/vue3-skeleton';

export default {
  components: { Skeleton },
  props: {
    image: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    price: {
      type: [Number, String],
      default: '',
    },
    rating: {
      type: [Number, String],
      default: 0,
    },
    reviews: {
      type: [Number, String],
      default: '',
    },
    isInitiallyFavorited: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isAllowDetailRoom: {
      type: Boolean,
      default: true,
    },
    isCarousel: {
      type: Boolean,
      default: false,
    },
    defaultImage: {
      type: String,
      default: () => require('@/assets/images/400x300.png') // Referensi ke gambar default di folder assets
    },
  },
  data() {
    return {
      isFavorited: this.isInitiallyFavorited,
      isImageLoaded: false, // Status gambar utama
    };
  },
  computed: {
    favoriteIcon() {
      return this.isFavorited ? 'mdi:favorite' : 'mdi:favorite-border';
    }
  },
  methods: {
    toggleFavorite() {
      this.isFavorited = !this.isFavorited;
    },
    handleImageLoad(event) {
      // Gambar dimuat dengan status 200/304
      if (event.target.complete && event.target.naturalWidth > 0) {
        this.isImageLoaded = true;
      }
    },
    handleImageError() {
      // Jika error, tetap gunakan default image
      this.isImageLoaded = false;
    },
  },
};
</script>

<style scoped>
.truncate-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Border-radius hanya di bagian atas gambar */
.rounded-t-lg {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

/* Border-radius hanya di bagian bawah konten properti */
.rounded-b-lg {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.image-placeholder {
  background-color: #f0f0f0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}
</style>