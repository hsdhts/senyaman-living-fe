<template>
    <DefaultLayout>
        <div class="mx-auto container">
            <!-- Top Filters Section -->
            <div class="flex flex-col md:flex-row items-start bg-white p-4 space-y-2 md:space-y-0 md:items-end">
                <div class="flex-1">
                    <BaseSelect icon="mdi:office-building-marker" :options="propertyLocationList" label="Location"
                        v-model="filter.location" />
                </div>
                <div class="flex-1 md:mx-2">
                    <label>Date</label>
                    <BaseDateRangePicker
                        :datepickerClass="'flex items-center justify-between border rounded-lg p-4 cursor-pointer'"
                        :range="true" v-model="filter.selectedDate" />
                </div>
                <div class="flex-1">
                    <BaseSelectorBlack label="Who" placeholder="Who" iconFront="mdi:person" v-model="filter.guests"
                        :options="guestOptions" class="md:col-span-2" />
                </div>
                <div class="flex items-center w-full mt-2 md:ml-2 md:w-40">
                    <BaseButton class="rounded flex h-full items-center w-full" type="primary">
                        <AppIcon icon="mdi:magnify" width="24" height="40" />
                        <label class="ml-2">Search</label>
                    </BaseButton>
                    <!-- Filters Button for Mobile -->
                    <BaseButton class="flex ml-2 md:hidden rounded h-full items-center w-full" type="secondary"
                        @click="toggleFilterPopUp">
                        <AppIcon icon="mdi:filter-cog" width="24" height="40" />
                        <label class="ml-2">Filter</label>
                    </BaseButton>
                </div>
            </div>

            <div class="flex">
                <!-- Sidebar Filters for Desktop -->
                <SearchFilter class="hidden md:block w-1/4" v-if="min" :min="min" :max="max" :minValue="minValue"
                    :maxValue="maxValue" v-model:minValue="minValue" v-model:maxValue="maxValue"
                    :propertyTypeList="propertyTypeList" :selectedPropertyType="selectedPropertyType"
                    @selectPropertyType="selectPropertyType" />

                <!-- Property Listings and Map Toggle -->
                <div :class="showMap ? 'w-1/2' : 'w-full'" class="p-4 bg-white">
                    <div class="flex items-center justify-between mb-4">
                        <h1 class="text-xl md:text-2xl font-semibold">
                            {{ properties.length }} places in Medan
                        </h1>
                        <!-- View Maps Toggle, hidden on small screens -->
                        <div class="hidden md:flex items-center">
                            <label for="toggle" class="flex items-center cursor-pointer">
                                <span class="mr-2 text-gray-700">View maps</span>
                                <div class="relative">
                                    <input type="checkbox" id="toggle" class="sr-only" v-model="showMap" />
                                    <div
                                        :class="['block w-10 h-6 rounded-full transition-colors', showMap ? 'bg-blue-500' : 'bg-gray-300']">
                                    </div>
                                    <div
                                        :class="['dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform', showMap ? 'translate-x-full' : '']">
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Property Cards Section -->
                    <div
                        :class="showMap ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'">
                        <PropertyCard v-for="property in properties" :key="property.id" :image="property.image"
                            :title="property.title" :location="property.location" :price="property.price"
                            :rating="property.rating" :reviews="property.reviews"
                            :isInitiallyFavorited="property.isFavorited" :loading="isLoading"
                            @click="goToDetail(property.id)" class="w-full cursor-pointer" />
                    </div>
                </div>

                <!-- Google Map Section (only visible if showMap is true) -->
                <div class="w-1/2 relative hidden md:block" v-if="showMap">
                    <GoogleMap api-key="AIzaSyB6hONBS6eje4FuBEqVKGbDq2IJnYcVdXk" style="width: 100%; height: 100%"
                        :center="{ lat: -6.175, lng: 106.825 }" :zoom="5">
                        <Marker v-for="(m, id) in markerPositions" :key="id" :options="{ position: m }"></Marker>
                    </GoogleMap>
                </div>
            </div>

            <!-- Mobile Filter Popup -->
            <div v-if="showFilter" class="fixed inset-0 bg-slate-200/[0.5]" @click="toggleFilterPopUp">
                <div @click.stop class="fixed bottom-0 right-0 left-0">
                    <SearchFilter v-if="min" :min="min" :max="max" :minValue="minValue" :maxValue="maxValue"
                        v-model:minValue="minValue" v-model:maxValue="maxValue" :propertyTypeList="propertyTypeList"
                        :selectedPropertyType="selectedPropertyType" @selectPropertyType="selectPropertyType" />
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
import PropertiesData from "@/assets/js/Properties.json";
import SearchFilter from "@/components/layout/SearchFilter.vue";
    export default {
    name: "MapArea",
    components: {
        DefaultLayout,
        GoogleMap,
        Marker,
        SearchFilter,
    },
    data() {
        return {
            isLoading: true,
            showMap: false,
            markerPositions: [],
            propertyTypeList: [
                { Id: 1, Name: "Apartment" },
                { Id: 2, Name: "Hotel" },
                { Id: 3, Name: "Guest House" },
                { Id: 4, Name: "Kost" },
                { Id: 5, Name: "Villa" },
            ],
            properties: Array.from({ length: 10 }, (_, index) => ({
                id: `skeleton-${index}`,
                image: [],
                title: "",
                location: "",
                price: "",
                rating: "",
                reviews: "",
                isFavorited: false,
            })),
            showFilter: false,
            propertyLocationList: [],
            selectedPropertyType: [],
            min: null,
            max: null,
            minValue: null,
            maxValue: null,
            filter: {
                location: null,
                selectedDate: {
                    startDate: new Date(),
                    endDate: null,
                },
                guests: {
                    adults: 0,
                    children: 0,
                    infants: 0,
                    pets: 0,
                },
            },
        };
    },
    computed: {
        guestOptions() {
            return [
                { label: "Adults", count: this.filter.guests.adults || 0 },
                { label: "Children", count: this.filter.guests.children || 0 },
                { label: "Infants", count: this.filter.guests.infants || 0 },
                { label: "Pets", count: this.filter.guests.pets || 0 },
            ];
        },
    },
    created() {
        setTimeout(() => {
            this.properties = PropertiesData;
            this.markerPositions = this.properties.map((p) => ({
                lat: p.latitude,
                lng: p.longitude,
            }));
            const prices = this.properties.map((property) => parseFloat(property.price.replace(/\./g, "")));
            this.min = Math.min(...prices);
            this.max = Math.max(...prices);
            this.minValue = this.min;
            this.maxValue = this.max;
            this.propertyLocationList = this.properties.map((p) => ({
                value: p.id,
                label: p.location,
            }));
            this.isLoading = false;
        }, 1000);
    },
    methods: {
        goToDetail(id) {
            this.$router.push(`/property/${id}`);
        },
        toggleFilterPopUp() {
            this.showFilter = !this.showFilter;
        },
        selectPropertyType(Id) {
            const index = this.selectedPropertyType.indexOf(Id);
            if (index > -1) {
                this.selectedPropertyType.splice(index, 1);
            } else {
                this.selectedPropertyType.push(Id);
            }
        },
    },
};
</script>

<style scoped>
main {
    background-color: white;
}

#map {
    height: 100%;
    width: 100%;
}

.dot {
    transition: transform 0.3s ease;
}

.toggle-container {
    transition: background-color 0.3s ease;
}

.bg-blue-500 {
    background-color: #3b82f6;
    /* Blue color */
}

.bg-gray-300 {
    background-color: #d1d5db;
    /* Gray color */
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .hidden.md\\:block {
        display: none;
    }
}
</style>