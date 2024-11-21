<template>
    <div
        class="relative hidden md:flex items-center space-x-4 bg-gray-100 px-4 py-2 rounded-full shadow-sm cursor-pointer">
        <!-- Input Where -->
        <div class="relative">
            <input type="text" v-model="searchQuery" @focus="isDropdownOpen = true" placeholder="Where"
                class="text-gray-600 bg-transparent focus:outline-none" />
            <!-- Clear Button -->
            <button v-if="searchQuery" @click="clearSearch" class="ml-2 text-gray-500 focus:outline-none">
                &#x2715;
            </button>

            <!-- Dropdown for filtered options -->
            <transition name="fade" mode="out-in">
                <div v-if="isDropdownOpen && filteredRegions.length > 0"
                    class="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-50" @click="closeDropdown">
                    <ul class="py-2">
                        <li v-for="(region, index) in filteredRegions" :key="index" @click="selectRegion(region.name)"
                            class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                            <span>{{ region.name }}</span>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>

        <!-- Separator -->
        <span class="text-gray-500">|</span>

        <!-- Choose Date Button -->
        <button class="text-gray-600 hover:text-grey-800 focus:outline-none" @click="toggleDatePicker">
            {{ dateLabel }}
        </button>

        <!-- Separator -->
        <span class="text-gray-500">|</span>

        <!-- Who Button -->
        <button class="text-gray-600 hover:text-gray-800 focus:outline-none">
            Who
        </button>

        <!-- Separator -->
        <span class="text-gray-500">|</span>

        <!-- Search Button -->
        <button class="p-2 bg-blue-500 text-white rounded-full" @click="search">
            <AppIcon icon="mdi:search-globe" height="24" width="24" />
        </button>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            searchQuery: '',
            isDropdownOpen: false,
            selectedDate: null, // Tanggal yang dipilih akan disimpan di sini
            regions: [
                { name: "Medan" },
                { name: "Jabodetabek" },
                { name: "Surabaya" },
                { name: "Bali" },
                { name: "Bandung" }
            ]
        };
    },
    props: {
        selectedCheckIn: {
            type: Date,
            default: null
        },
        selectedCheckOut: {
            type: Date,
            default: null
        }
    },
    computed: {
        filteredRegions() {
            // Filter regions based on search query
            return this.regions.filter(region =>
                region.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        dateLabel() {
            if (this.selectedCheckIn && this.selectedCheckOut) {
                // Jika kedua tanggal dipilih (range)
                const checkIn = new Date(this.selectedCheckIn).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });
                const checkOut = new Date(this.selectedCheckOut).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });
                return `${checkIn} - ${checkOut}`;
            } else if (this.selectedCheckIn) {
                // Jika hanya check-in yang dipilih (single date)
                return new Date(this.selectedCheckIn).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });
            }
            // Jika belum ada tanggal yang dipilih
            return "Choose Date";
        },
    },
    methods: {
        clearSearch() {
            this.searchQuery = '';
        },
        closeDropdown() {
            this.isDropdownOpen = false;
        },
        selectRegion(region) {
            this.searchQuery = region;
            this.closeDropdown();
        },
        toggleDatePicker() {
            // Emit event ke parent untuk membuka date picker
            this.$emit('openDatePicker');
        },
        setDate(date) {
            // Method untuk menerima tanggal yang dipilih dari parent
            this.selectedDate = date;

            console.log("selectedDate", this.selectedDate)
        },
        search() {
            if (!this.selectedCheckIn || !this.searchQuery) {
                alert("Please select a date and location.");
                return;
            }

            // Format the dates as 'YYYY-MM-DD'
            const startDate = this.formatDate(this.selectedCheckIn);
            const endDate = this.selectedCheckOut ? this.formatDate(this.selectedCheckOut) : null;

            // Redirect to /area with query parameters
            const query = {
                startDate,
                loc: this.searchQuery
            };

            if (endDate) {
                query.endDate = endDate;
            }

            this.$router.push({
                path: '/area',
                query
            });
        },
        formatDate(date) {
            // Method untuk memformat tanggal menjadi string 'YYYY-MM-DD'
            return new Date(date).toISOString().split('T')[0];
        }
    }
};
</script>

<style scoped>
/* Optional: add any custom styles */
</style>