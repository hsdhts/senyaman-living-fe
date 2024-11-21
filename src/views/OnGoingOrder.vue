<template>
    <div class="p-4">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 mb-4">
            <nav class="flex justify-around py-4">
                <button @click="activeTab = 'success'" :class="activeTab === 'success' ? activeClass : inactiveClass"
                    class="focus:outline-none">
                    Success
                </button>
                <button @click="activeTab = 'waitingpayment'"
                    :class="activeTab === 'waitingpayment' ? activeClass : inactiveClass" class="focus:outline-none">
                    Waiting for Payment
                </button>
            </nav>
        </div>

        <!-- Success Tab Content -->
        <div v-if="activeTab === 'success'">
            <div v-if="successBookings.length" class="space-y-4">
                <div v-for="booking in successBookings" :key="booking.id"
                    class="bg-white rounded-lg shadow-md p-4 flex items-center">
                    <!-- Room Image -->
                    <img :src="booking.image" alt="Room Image" class="w-24 h-24 rounded-md object-cover mr-4" />

                    <!-- Booking Information -->
                    <div class="flex-grow">
                        <p class="text-gray-500">[{{ booking.city }}] - [{{ booking.propertyName }}]</p>
                        <h3 class="text-xl font-semibold mb-1">{{ booking.roomType }}</h3>
                        <p class="text-blue-500 flex items-center mb-1">
                            <AppIcon icon="mdi:calendar" class="mr-2 w-4 h-4" />
                            {{ booking.checkInDate }} - {{ booking.checkOutDate }}
                        </p>
                        <p class="text-gray-500 flex items-center">
                            <AppIcon icon="mdi:account" class="mr-2 w-4 h-4" />
                            {{ booking.guests }} Guests
                        </p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-row gap-2">
                        <button @click="viewPin(booking)"
                            class="text-blue-500 border border-blue-500 px-3 py-1 rounded-lg flex items-center">
                            <AppIcon icon="mdi:key" class="mr-1 w-4 h-4" /> View PIN
                        </button>
                        <button @click="openPaymentSummary(booking)"
                            class="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center">
                            Detail
                        </button>
                        <button @click="downloadReceipt(booking)"
                            class="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center">
                            <AppIcon icon="mdi:download" class="mr-1 w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            <p v-else class="text-center font-semibold">You have no completed bookings.</p>
        </div>

        <!-- Waiting for Payment Tab Content -->
        <div v-if="activeTab === 'waitingpayment'">
            <div v-if="waitingBookings.length" class="space-y-4">
                <div v-for="booking in waitingBookings" :key="booking.id"
                    class="bg-white rounded-lg shadow-md p-4 flex items-center">
                    <img :src="booking.image" alt="Room Image" class="w-24 h-24 rounded-md object-cover mr-4" />
                    <div class="flex-grow">
                        <p class="text-gray-500">[{{ booking.city }}] - [{{ booking.propertyName }}]</p>
                        <h3 class="text-xl font-semibold mb-1">{{ booking.roomType }}</h3>
                        <p class="text-blue-500 flex items-center mb-1">
                            <AppIcon icon="mdi:calendar" class="mr-2 w-4 h-4" />
                            {{ booking.checkInDate }} - {{ booking.checkOutDate }}
                        </p>
                        <p class="text-gray-500 flex items-center">
                            <AppIcon icon="mdi:account" class="mr-2 w-4 h-4" />
                            {{ booking.guests }} Guests
                        </p>
                    </div>
                    <button @click="openPaymentSummary(booking)"
                        class="bg-blue-500 text-white px-4 py-2 rounded-lg">Detail</button>
                </div>
            </div>
            <p v-else class="text-center font-semibold">No bookings awaiting payment.</p>
        </div>

        <!-- Payment Summary Modal -->
        <PaymentSummaryModal v-if="showPaymentSummary" :orderId="orderId" :paymentMethod="selectedPaymentMethod"
            :bookingDetail="bookingDetail" :user="user" :selectedAddonsDetails="selectedAddonsDetails"
            :voucherApplied="voucherApplied" :discountAmount="discountAmount" :usePoints="usePoints"
            :pointsToUse="pointsToUse" :grandTotal="grandTotal" :formattedTimeRemaining="formattedTimeRemaining"
            @close="showPaymentSummary = false" />

            <ViewPinModal v-if="showPinModal" :bookingId="bookingId" :bookingDetail="bookingDetail" :pinCode="pinCode"
                      @close="showPinModal = false" @reset-pin="handleResetPin" />
    </div>
</template>

<script>

export default {
    computed: {
        selectedAddonsDetails() {
            // Mengambil detail addons berdasarkan ID yang dipilih
            return this.addons.filter(addon => this.selectedAddons.includes(addon.id));
        },
    },
    data() {
        return {
            activeTab: 'waitingpayment', // Default tab
            activeClass: 'text-blue-500 font-semibold border-b-2 border-blue-500',
            inactiveClass: 'text-gray-500 hover:text-blue-500',
            showPaymentSummary: false,
            showPinModal: false, // Mengontrol visibilitas modal View PIN
            orderId: null,
            selectedPaymentMethod: null,
            bookingDetail: null,
            user: {}, // User data bisa diambil atau diatur di sini
            selectedAddons: [], // Array untuk menyimpan ID addons yang dipilih
            voucherApplied: null,
            discountAmount: 0,
            usePoints: false,
            pointsToUse: 0,
            pricePerNight: 1300000,
            nights: 1,
            totalPrice: 0,
            serviceFee: 130000,
            grandTotal: 0,
            formattedTimeRemaining: "",
            pinCode: "127-157-018",
            addons: [
                { id: 1, name: 'Perlindungan Menginap', price: 199000, description: 'Perlindungan bagi tamu selama menginap di properti' },
                { id: 2, name: 'Kehilangan/Kerusakan Barang', price: 199000, description: 'Asuransi untuk kehilangan atau kerusakan barang selama menginap' },
                { id: 3, name: 'Multipurpose table', price: 199000, description: 'Meja serbaguna untuk kebutuhan tambahan di kamar' },
                { id: 4, name: 'Breakfast', price: 199000, description: 'Sarapan untuk tamu yang menginap' },
                { id: 5, name: 'Extrabed', price: 199000, description: 'Tempat tidur tambahan di kamar' }
            ],
            successBookings: [
                {
                    id: 1,
                    title: 'Nama Tipe/Nama Kamar',
                    propertyName: 'Nama Properti',
                    city: 'Kota',
                    guests: 2,
                    checkInDate: 'Mon, 28 Oct 2024',
                    checkOutDate: 'Tue, 29 Oct 2024',
                    image: 'https://placehold.co/100x100?text=Gambar', // Example placeholder
                    timeRemaining: "12:30",
                    roomType: 'Standard Room'
                },
            ],
            waitingBookings: [
                {
                    id: 2,
                    title: 'Nama Tipe/Nama Kamar',
                    propertyName: 'Nama Properti',
                    city: 'Kota',
                    guests: 2,
                    checkInDate: 'Mon, 28 Oct 2024',
                    checkOutDate: 'Tue, 29 Oct 2024',
                    image: 'https://placehold.co/100x100?text=Gambar', // Example placeholder
                    timeRemaining: "15:45",
                    roomType: 'Deluxe Room'
                },
            ]
        };
    },
    methods: {
        viewPin(booking) {
            // Atur data untuk modal View PIN dan tampilkan modal
            this.bookingId = booking.id;
            this.bookingDetail = booking;
            this.showPinModal = true;
        },
        downloadReceipt(booking) {
            // Logic to download receipt
            console.log("Downloading receipt for booking:", booking.id);
        },
        openPaymentSummary(booking) {
            if (!booking) return; // Pastikan booking ada sebelum membuka modal

            // Set data booking ke properti modal
            this.orderId = booking.id;
            this.bookingDetail = booking;
            this.selectedPaymentMethod = "Credit Card"; // Nilai contoh
            this.user = { name: "John Doe" }; // Data pengguna contoh
            this.selectedAddons = [1, 3, 5]; // Contoh: Tambahkan ID addons yang terpilih di sini
            this.voucherApplied = "DISCOUNT10";
            this.discountAmount = 50;
            this.usePoints = true;
            this.pointsToUse = 100;

            // Kalkulasi total harga
            this.totalPrice = this.pricePerNight * this.nights;
            const addonTotal = this.selectedAddonsDetails.reduce((total, addon) => total + addon.price, 0);
            this.grandTotal = this.totalPrice + this.serviceFee + addonTotal - this.discountAmount - this.pointsToUse;

            this.formattedTimeRemaining = booking.timeRemaining || "00:00"; // Pastikan tidak `undefined`
            this.showPaymentSummary = true;
        }
    }
};
</script>

<style scoped>
button {
    outline: none;
}
</style>