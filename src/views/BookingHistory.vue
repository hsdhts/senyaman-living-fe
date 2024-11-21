<template>
    <div class="container mx-auto py-6">
        <!-- Header dan Date Range Picker -->
        <div class="flex flex-col items-left justify-between mb-6">
            <h1 class="text-2xl font-bold">Order History</h1>
            <div class="flex flex-col items-start gap-2">
                <label for="dateRange" class="text-gray-700">Select date</label>
                <BaseDateRangePicker
                    :datepickerClass="'flex items-center justify-between border rounded-lg p-4 cursor-pointer'"
                    :range="true" v-model="filter.selectedDate" />
            </div>
        </div>

        <!-- Daftar Order History -->
        <div class="space-y-4">
            <div v-for="booking in bookings" :key="booking.id"
                class="border rounded-lg p-4 flex items-center gap-4 cursor-pointer"
                @click="openPaymentSummary(booking)">
                <!-- Gambar Kamar -->
                <img :src="booking.image" alt="Room Image" class="w-24 h-24 rounded-md object-cover" />

                <!-- Informasi Booking -->
                <div class="flex-grow">
                    <p class="text-gray-500">[{{ booking.propertyName }}]</p>
                    <h2 class="text-lg font-semibold">{{ booking.roomType }}</h2>
                    <p class="text-blue-500">{{ booking.checkInDate }} - {{ booking.checkOutDate }}</p>
                    <p class="text-gray-500">{{ booking.guests }} Guests</p>
                </div>

                <!-- Informasi Booking ID dan Harga -->
                <div class="text-right">
                    <p class="text-gray-500">Booking ID: {{ booking.id }}</p>
                    <p class="text-lg font-semibold text-blue-600">{{ booking.price }}</p>
                    <!-- Tombol untuk membuka modal PaymentSummary -->
                </div>
            </div>
        </div>

        <!-- Payment Summary Modal -->
        <PaymentSummaryModal v-if="showPaymentSummary" :orderId="selectedBooking.id"
            :paymentMethod="selectedBooking.paymentMethod" :bookingDetail="selectedBooking" :user="user"
            :selectedAddonsDetails="selectedAddonsDetails" :voucherApplied="selectedBooking.voucherApplied"
            :discountAmount="selectedBooking.discountAmount" :usePoints="selectedBooking.usePoints"
            :pointsToUse="selectedBooking.pointsToUse" :grandTotal="selectedBooking.grandTotal"
            :formattedTimeRemaining="selectedBooking.timeRemaining" @close="showPaymentSummary = false" />
    </div>
</template>

<script>
export default {
    name: 'BookingHistory',
    data() {
        return {
            filter: {
                selectedDate: {
                    startDate: new Date(),
                    endDate: null,
                },
            },
            bookings: [
                {
                    id: '1376238962',
                    propertyName: 'Nama Properti',
                    roomType: 'Nama Tipe/Nama Kamar',
                    checkInDate: 'Mon, 28 Oct 2024',
                    checkOutDate: 'Tue, 29 Oct 2024',
                    guests: 2,
                    image: 'https://placehold.co/100x100?text=Gambar',
                    price: 'IDR 2.807.700',
                    paymentMethod: 'BCA (Virtual Account)',
                    voucherApplied: false,
                    discountAmount: 0,
                    usePoints: false,
                    pointsToUse: 0,
                    grandTotal: 2807700,
                    timeRemaining: "00:59:39",
                },
                // Tambahkan item booking lain sesuai kebutuhan
            ],
            showPaymentSummary: false,
            selectedBooking: {},
            user: {
                name: "Dhika",
                phone: "082379903786",
                email: "dhika@gmail.com",
                country: "Indonesia",
            },
            selectedAddonsDetails: [
                { name: "Breakfast", price: 150000, quantity: 1 },
                { name: "Airport Pickup", price: 200000, quantity: 1 },
            ],
        };
    },
    methods: {
        openPaymentSummary(booking) {
            this.selectedBooking = booking;
            this.showPaymentSummary = true;
        },
    },
};
</script>

<style scoped>
button {
    outline: none;
}
</style>