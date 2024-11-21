<template>
  <div class="budget-filter-section py-8 px-4 md:px-8">
    <h2 class="text-2xl font-semibold text-left mb-6">
      {{ $t('adjustToBudget') }} 💰💵
    </h2>
    <div class="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
      
      <!-- Image Preview -->
      <div class="image-wrapper hidden md:flex justify-center items-center relative">
        <!-- Gambar 1 -->
        <img
          src="https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Gambar Ekonomis"
          class="w-52 h-40 object-cover rounded-lg border-4 border-white z-10 transform translate-y-5 translate-x-9"
        />
        <!-- Gambar 2 -->
        <img
          src="https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Gambar Mewah"
          class="absolute w-60 h-52 object-cover rounded-lg transform translate-y-2 left-12"
        />
      </div>

      <!-- Filter Options -->
      <div class="flex flex-col gap-4">
        
        <!-- Lokasi -->
        <div>
          <label for="location" class="block text-gray-700 mb-2">{{ $t('location') }}</label>
          <BaseSelectIcon
            :options="locationsOptions"
            :placeholder="$t('selectLocation')"
            iconFront="mdi:office-building-location-outline"
            v-model="selectedLocation"
            class="w-full"
            :disabled="isLoading"
            cssClass="flex items-center border border-blue-400 rounded-lg px-3 py-2 cursor-pointer"
          />
          <!-- <div v-if="isLoading" class="text-gray-500 text-sm mt-1">{{ $t('loadingLocation') }}</div> -->
        </div>

        <!-- Kisaran Harga -->
        <div>
          <label class="block text-gray-700 mb-2">{{ $t('priceRange') }}</label>
          <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <BaseInput
              v-model="priceMin"
              :placeholder="$t('lowest')"              
              type="number"
              min="0"
              class="w-full sm:w-1/2 border-gray-300 rounded-md"
            />
            <span class="hidden sm:inline-block mb-4">-</span>
            <BaseInput
              v-model="priceMax"
              :placeholder="$t('highest')"
              type="number"
              min="0"
              class="w-full sm:w-1/2 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div class="border-t"></div>

        <!-- Pilihan Budget -->
        <div class="flex flex-col sm:flex-row gap-2">
          <BaseCheckBoxBudget
            v-model="selectedBudgetOptions.economy"
            :label="$t('budgetOptions.economy')"
            :priceRange="$t('priceRangeEconomy')"
            budgetType="economy"
          />
          <BaseCheckBoxBudget
            v-model="selectedBudgetOptions.popular"
            :label="$t('budgetOptions.popular')"
            :priceRange="$t('priceRangePopular')"
            budgetType="popular"
          />
          <BaseCheckBoxBudget
            v-model="selectedBudgetOptions.luxury"
            :label="$t('budgetOptions.luxury')"
            :priceRange="$t('priceRangeLuxury')"
            budgetType="luxury"
          />
        </div>

        <!-- Tombol Search -->
        <button
          @click="applyFilters"
          class="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
          :disabled="isLoading"
        >
          <AppIcon icon="mdi:magnify" class="mr-2" />
          {{ $t('search') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedLocation: '', // Lokasi yang dipilih
      priceMin: '', // Harga minimum
      priceMax: '', // Harga maksimum
      selectedBudgetOptions: {
        economy: false,
        popular: false,
        luxury: false,
      },
    };
  },
  computed: {
    ...mapGetters('properties', ['locations', 'isLoading']),
    locationsOptions() {
      return this.locations;
    },
  },
  methods: {
    ...mapActions('properties', ['fetchProperties', 'applyBudgetFilter']),
    applyFilters() {
      // Validasi harga
      if (this.priceMin && this.priceMax && Number(this.priceMin) > Number(this.priceMax)) {
        alert('Harga minimum tidak boleh lebih besar dari harga maksimum.');
        return;
      }

      const filterData = {
        location: this.selectedLocation,
        priceMin: this.priceMin,
        priceMax: this.priceMax,
        budgetOptions: this.selectedBudgetOptions,
      };
      this.applyBudgetFilter(filterData); // Panggil action dengan data filter
    },
  },
  created() {
    this.fetchProperties(); // Pastikan data lokasi diambil saat komponen dibuat
  },
};
</script>

<style scoped>
/* Responsif untuk gambar pada layar kecil */
@media (max-width: 768px) {
  .image-wrapper {
    display: none;
  }
}
</style>
