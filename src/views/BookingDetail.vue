<template>
    <div class="container mx-auto py-6">
        <h1 class="text-2xl font-bold mb-4">Booking Detail</h1>

        <div v-if="booking">
            <h2 class="text-lg font-semibold">Booking ID: {{ booking.id }}</h2>
            <p>Title: {{ booking.title }}</p>
            <p>Date: {{ booking.date }}</p>
            <p>Status: {{ booking.status }}</p>
            <!-- Tambahkan lebih banyak detail di sini -->
        </div>

        <div v-else>
            <p>Booking not found.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BookingDetail',
    data() {
        return {
            booking: null, // Detail booking yang akan diambil
        };
    },
    mounted() {
        // Ambil parameter ID dari URL
        const bookingId = this.$route.params.id;

        // Fetch detail pemesanan berdasarkan ID (untuk sekarang, kita gunakan data statis)
        const bookings = [
            { id: 1, title: 'Booking #1', date: '2024-01-01', status: 'Completed' },
            { id: 2, title: 'Booking #2', date: '2024-02-15', status: 'Pending' },
            { id: 3, title: 'Booking #3', date: '2024-03-10', status: 'Cancelled' },
        ];

        // Temukan detail booking berdasarkan ID
        this.booking = bookings.find(b => b.id === parseInt(bookingId));
    },
};
</script>

<style scoped>
/* Optional custom styles */
</style>