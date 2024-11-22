<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative">
            <!-- Close Button -->
            <button @click="$emit('close')" class="absolute top-6 right-6 text-gray-500 hover:text-gray-700">
                &times;
            </button>

            <!-- Order ID & Header -->
            <h2 class="text-lg font-bold mb-2">Order ID: {{ orderId }}</h2>
            <div class="flex justify-between items-center mb-4 border-t py-4 border-b">
                <div>
                    <p class="text-gray-600">Metode Pembayaran: <strong>{{ paymentMethod }}</strong></p>
                    <p class="text-sm text-blue-500">Selesaikan pembayaran dalam {{ formattedTimeRemaining }}</p>
                </div>
                <button class="bg-blue-500 text-white px-4 py-2 rounded font-semibold">Bayar</button>
            </div>

            <div class="flex items-start gap-4 mb-4">
                <img :src="bookingDetail.imageUrl" alt="Property Image"
                    class="w-[200px] h-[160px] rounded-lg object-cover mr-4" />
                <div class="flex flex-col justify-center gap-2">
                    <h3 class="text-sm text-gray-500 pt-3">[ Nama Property ]</h3>
                    <h3 class="text-lg font-semibold">{{ bookingDetail.title }}</h3>
                    <p class="text-gray-500 text-sm">{{ bookingDetail.location }}</p>
                    <p class="text-sm text-gray-500">{{ $formatters.formatDate(bookingDetail.checkIn) }} - {{
                $formatters.formatDate(bookingDetail.checkOut) }}</p>

                    <div class="text-gray-600 text-sm flex items-center gap-4">
                        <div class="flex items-center">
                            <AppIcon icon="mdi:account" class="w-5 h-5 mr-1" />
                            <span>{{ bookingDetail.guests }} Guests</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Guest Detail -->
            <h4 class="text-gray-700 font-semibold pb-2">Guest detail</h4>

            <div class="border-t mb-4">
                <div class="grid grid-cols-2 gap-4 text-sm mt-2">
                    <div>
                        <p class="text-gray-500">Name</p>
                        <p class="font-semibold text-gray-800">{{ user.name }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Phone Number</p>
                        <p class="font-semibold text-gray-800">{{ user.phone }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Email Address</p>
                        <p class="font-semibold text-gray-800">{{ user.email }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Country</p>
                        <p class="font-semibold text-gray-800">Indonesia</p>
                    </div>
                </div>
            </div>

            <!-- Price Details -->
            <h4 class="text-gray-700 font-semibold pb-2">Price Details</h4>

            <div class="border-t mb-4 flex flex-col gap-2">
                <div class="flex justify-between text-sm">
                    <span>{{ $formatters.formatCurrency(bookingDetail.pricePerNight) }} × {{ bookingDetail.nights }}
                        nights</span>
                    <span>{{ $formatters.formatCurrency(bookingDetail.totalPrice) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span>Deposit</span>
                    <span>{{ $formatters.formatCurrency(bookingDetail.deposit || 0) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>{{ $formatters.formatCurrency(bookingDetail.serviceFee) }}</span>
                </div>
                <div v-if="selectedAddonsDetails.length" class="pt-2">
                    <h5 class="text-gray-500 text-sm pb-1">Add-on</h5>
                    <div v-for="addon in selectedAddonsDetails" :key="addon.id" class="flex flex-col gap-2">
                        <!-- Tambahkan margin-bottom di sini untuk jarak antar item -->
                        <div class="flex justify-between text-sm mb-2">
                            <span>{{ addon.name }} x {{ addon.quantity }}</span>
                            <span>{{ $formatters.formatCurrency(addon.price * addon.quantity) }}</span>
                        </div>
                    </div>
                </div>
                <div v-if="voucherApplied" class="flex justify-between text-sm text-red-500 border-t pt-2">
                    <span>Voucher</span>
                    <span>- {{ $formatters.formatCurrency(discountAmount) }}</span>
                </div>
                <div v-if="usePoints && pointsToUse > 0" class="flex justify-between text-sm text-red-500">
                    <span>Poin</span>
                    <span>- {{ $formatters.formatCurrency(pointsToUse) }}</span>
                </div>
            </div>

            <!-- Total -->
            <div class="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span>{{ $formatters.formatCurrency(grandTotal) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentSummaryModal',
    props: {
        orderId: String,
        paymentMethod: String,
        bookingDetail: Object,
        user: Object,
        selectedAddonsDetails: Array,
        voucherApplied: Boolean,
        discountAmount: Number,
        usePoints: Boolean,
        pointsToUse: Number,
        grandTotal: Number,
        initialCountdown: {
            type: Number,
            default: 3600 // 1 hour in seconds
        }
    },
    data() {
        return {
            countdown: this.initialCountdown, // Mulai dari 1 jam (3600 detik)
        };
    },
    computed: {
        formattedTimeRemaining() {
            const hours = Math.floor(this.countdown / 3600);
            const minutes = Math.floor((this.countdown % 3600) / 60);
            const seconds = this.countdown % 60;
            return `${String(hours).padStart(2, '0')} jam ${String(minutes).padStart(2, '0')} menit ${String(seconds).padStart(2, '0')} detik`;
        },
    },
    mounted() {
        this.startCountdown();
    },
    beforeUnmount() {
        this.clearCountdown();
    },
    methods: {
        startCountdown() {
            this.timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown -= 1;
                } else {
                    this.clearCountdown();
                }
            }, 1000);
        },
        clearCountdown() {
            clearInterval(this.timer);
        },
    },
};
</script>

<style scoped>
.modal-container {
    z-index: 1000;
}
</style>