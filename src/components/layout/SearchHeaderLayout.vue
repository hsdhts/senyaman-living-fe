<template>
    <div class="bg-gray-100 px-6 py-8">
        <div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <!-- Kolom Teks Header dan Form Pencarian -->
            <div class="flex flex-col items-center md:items-start space-y-8 w-full">
                <!-- Teks Header -->
                <div class="text-center md:text-left w-full">
                    <h1 class="text-2xl font-semibold">
                        {{ $t('findPerfectPlace') }} <span class="text-blue-500">{{ $t('perfectPlace') }}</span>
                    </h1>
                    <p class="text-gray-600">
                        {{ $t('propertyDescription') }}
                    </p>
                </div>

                <!-- Form Pencarian -->
                <form @submit.prevent="searchProperties" class="bg-white p-6 rounded-lg shadow-md w-full">
                    <h2 class="text-gray-700 font-semibold mb-4">Search for available properties</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Kolom Location -->
                        <BaseSelectIcon :floatingLabel="$t('location')"
                            :options="[{ label: 'New York', value: 'NY' }, { label: 'Los Angeles', value: 'LA' }]"
                            :placeholder="$t('selectLocation')" iconFront="mdi:office-building-location-outline"
                            v-model="selectedLocation" class="md:col-span-1" />

                        <!-- Kolom Property Type -->
                        <BaseSelectIcon :floatingLabel="$t('propertyType')"
                            :options="[{ label: 'All Properties', value: 'all' }, { label: 'Apartment', value: 'APT' }]"
                            v-model="propertyType" class="md:col-span-1" />

                        <div class="flex flex-row items-center gap-2 md:col-span-2">
                            <div class="border w-full"></div>
                        </div>

                        <!-- Kolom Check-in dan Check-out -->
                        <div class="flex flex-col md:flex-row items-center gap-2 md:col-span-2">
                            <BaseDatePicker :label="$t('checkIn')" :placeholder="$t('selectDate')"
                                iconBack="mdi:calendar" v-model="checkInDate" :is-open="openDatePicker === 'checkIn'"
                                @open="openPicker('checkIn')" @close="closePicker" @dateSelected="handleDatesSelected"
                                class="w-full" position="left" />

                            <!-- Sembunyikan elemen ini di mobile, tampilkan di layar md ke atas -->
                            <p class="hidden md:block">-</p>

                            <BaseDatePicker :label="$t('checkOut')" :placeholder="$t('selectDate')"
                                iconBack="mdi:calendar" v-model="checkOutDate" :is-open="openDatePicker === 'checkOut'"
                                @open="openPicker('checkOut')" @close="closePicker" @dateSelected="handleDatesSelected"
                                class="w-full" position="left" />
                        </div>
                        <!-- Kolom Who -->
                        <div class="flex flex-col md:col-span-2">
                            <BaseSelector :label="$t('guests')" :placeholder="$t('addGuests')" iconFront="mdi:person"
                                v-model="guests" :options="guestOptions" class="md:col-span-2 custom-selector" />
                        </div>
                    </div>
                    <button type="submit"
                        class="mt-4 w-full flex items-center justify-center bg-blue-500 text-white px-6 py-2 rounded-lg">
                        <AppIcon icon="mdi:search" width="20" height="20" />
                        <span class="mr-2">
                            {{ $t('search') }}</span>
                    </button>
                </form>
            </div>

            <!-- Kolom Gambar -->
            <div class="hidden md:flex flex-row items-end space-x-4 md:w-full">
    <!-- Gambar Placeholder -->
    <div class="w-2/3 h-72 md:h-96 relative">
      <img
        src="/assets/images/building1.webp"
        alt="Building 1"
        loading="lazy"
        width="800"
        height="400"
        class="absolute inset-0 w-full h-full object-cover rounded-tl-xl rounded-tr-xl custom-rounded-top2"
      />
    </div>
    <div class="w-1/3 h-48 md:h-60 relative">
      <img
        src="/assets/images/building2.webp"
        alt="Building 2"
        loading="lazy"
        width="800"
        height="400"
        class="absolute inset-0 w-full h-full object-cover rounded-tl-xl rounded-tr-xl custom-rounded-top"
      />
    </div>
  </div>
        </div>

    </div>

</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'SearchHeader',
    data() {
        return {
            location: null,
            propertyType: null,
            checkInDate: null, // Initialized as Date
            checkOutDate: null, // Initialized as Date
            guests: '',
            openDatePicker: null, // 'checkIn', 'checkOut', or null
        };
    },
    computed: {
        ...mapState({
            locations: state => state.locations,
            propertyTypes: state => state.propertyTypes
        }),
        guestOptions() {
            return [
                { label: 'Adults', count: this.guests.adults || 0 },
                { label: 'Children', count: this.guests.children || 0 },
                { label: 'Infants', count: this.guests.infants || 0 },
                { label: 'Pets', count: this.guests.pets || 0 }
            ];
        }
    },
    methods: {
        ...mapActions(['fetchLocations', 'fetchPropertyTypes', 'searchPropertiesFromStore']), // rename to avoid conflict

        executeSearch() { // rename local method
            const searchData = {
                location: this.location,
                propertyType: this.propertyType,
                checkInDate: this.checkInDate,
                checkOutDate: this.checkOutDate,
                guests: this.guests
            };
            this.searchPropertiesFromStore(searchData); // call Vuex action instead
        },
        closeAllPopups() {
            // Fungsi ini akan menutup semua dropdown atau popup
            this.openDatePicker = null;
            this.selectedLocation = null;
            this.propertyType = null;
        },
        openPicker(picker) {
            this.closeAllPopups(); // Pastikan semua tertutup sebelum membuka yang baru
            this.openDatePicker = picker;
        },
        closePicker() {
            this.openDatePicker = null;
        },
        handleClickOutside(event) {
            const element = this.$refs.popupWrapper; // Referensi elemen utama popup
            if (element && !element.contains(event.target)) {
                this.closeAllPopups();
            }
        }

    },
    mounted() {
        this.fetchLocations();
        this.fetchPropertyTypes();
        window.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        // Hapus event listener saat komponen di-unmount
        window.removeEventListener('click', this.handleClickOutside);
    }
};
</script>


<style scoped>
.min-h-screen {
    min-height: 100vh;
}

.custom-rounded-top {
    border-top-left-radius: 120px;
    /* Sesuaikan nilai sesuai kebutuhan */
    border-top-right-radius: 120px;
}

.custom-rounded-top2 {
    border-top-left-radius: 140px;
    /* Sesuaikan nilai sesuai kebutuhan */
    border-top-right-radius: 140px;
    height: 100%;
    width: 290px;
}

/* Add z-index styles for dropdowns */
.BaseDate {
    z-index: 100;
    /* Ensure it's above others */
}

/* Ensure BaseSelector also has a proper z-index */
.BaseSelector {
    z-index: 50;
    /* Lower than BaseDate */
}

.custom-selector {
    z-index: auto !important;
}
</style>