<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg relative">
            <!-- Close Button -->
            <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                &times;
            </button>

            <!-- Booking ID & Header -->
            <h2 class="text-lg font-bold mb-4">Booking ID: {{ bookingId }}</h2>

            <!-- Booking Detail -->
            <div class="flex gap-4 mb-4">
                <img :src="bookingDetail.image" alt="Property Image" class="w-32 h-24 rounded-lg object-cover" />
                <div>
                    <p class="text-gray-500">{{ bookingDetail.city }} - [{{ bookingDetail.propertyName }}]</p>
                    <h3 class="text-lg font-semibold">{{ bookingDetail.roomType }}</h3>
                    <p class="text-blue-500 text-sm flex items-center">
                        <AppIcon icon="mdi:calendar" class="mr-1 w-4 h-4" />
                        {{ bookingDetail.checkInDate }} - {{ bookingDetail.checkOutDate }}
                    </p>
                    <p class="text-gray-500 text-sm flex items-center">
                        <AppIcon icon="mdi:account" class="mr-1 w-4 h-4" />
                        {{ bookingDetail.guests }} Guests
                    </p>
                </div>
            </div>

            <!-- Divider -->
            <hr class="my-4" />

            <!-- Door PIN Section -->
            <h4 class="text-center text-gray-700 font-semibold mb-2">Door PIN</h4>
            <div class="flex justify-center items-center mb-4">
                <div class="border border-gray-300 rounded-lg px-4 py-2 flex items-center">
                    <span class="text-lg font-semibold">{{ pinCode }}</span>
                    <button @click="copyPin" class="ml-3 text-gray-500 hover:text-gray-700">
                        <AppIcon icon="mdi:content-copy" class="w-5 h-5" />
                    </button>
                </div>
            </div>

            <!-- Reset PIN Link -->
            <div class="text-center">
                <button @click="resetPin" class="text-blue-500 text-sm font-medium hover:underline">
                    <AppIcon icon="mdi:refresh" class="mr-1 w-4 h-4 inline" /> Reset New PIN
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ViewPinModal",
    props: {
        bookingId: {
            type: String,
            required: true
        },
        bookingDetail: {
            type: Object,
            required: true
        },
        pinCode: {
            type: String,
            required: true
        }
    },
    methods: {
        copyPin() {
            navigator.clipboard.writeText(this.pinCode)
        },
        resetPin() {
            // Logic untuk reset PIN, bisa gunakan event emit
            this.$emit("reset-pin");
        }
    }
};
</script>

<style scoped>
.modal-container {
    z-index: 1000;
}
</style>