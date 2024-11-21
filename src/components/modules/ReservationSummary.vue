<template>
    <div class="w-full order-1 md:order-2">
      <div class="bg-white p-6 rounded-lg shadow mb-6">
        <h3 class="text-sm text-center font-semibold mb-2">Reservation Summary</h3>
        <h4 class="text-xs text-center font-semibold text-gray-500 mb-4">Order Id : {{ orderId }}</h4>
  
        <!-- Check-in dan Check-out -->
        <div class="text-sm text-gray-600 border rounded-lg p-4 mb-4">
          <div class="flex justify-between items-start p-4 border border-gray-300 rounded-lg">
            <!-- Check-in Section -->
            <div class="w-1/2">
              <span class="block font-semibold text-gray-500">Check-in</span>
              <div class="flex flex-col gap-1">
                <span class="text-gray-800 font-semibold">{{ $formatters.formatDate(bookingDetail.checkIn) }}</span>
                <span class="text-blue-500 text-xs pl-1">from 15:00</span>
              </div>
            </div>
  
            <!-- Border separator between Check-in and Check-out -->
            <div class="w-px bg-gray-300 h-full mx-2"></div>
  
            <!-- Check-out Section -->
            <div class="w-1/2">
              <span class="block font-semibold text-gray-500 pl-4">Check-out</span>
              <div class="border-l pl-4 flex flex-col gap-1">
                <span class="text-gray-800 font-semibold">{{ $formatters.formatDate(bookingDetail.checkOut) }}</span>
                <span class="text-blue-500 text-xs pl-1">to 11:00</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2 mt-4 text-gray-600">
            <span>Total length of stay :</span>
            <div class="flex flex-row items-center gap-2">
              <span class="font-semibold">{{ bookingDetail.nights }} night{{ bookingDetail.nights > 1 ? 's' : '' }}</span>
              <AppIcon icon="mdi:calendar-month-outline" class="w-5 h-5" />
            </div>
          </div>
        </div>
  
        <!-- Price Summary -->
        <h4 class="text-lg font-semibold mt-6 mb-4">Your price summary</h4>
        <div class="text-sm text-gray-600 space-y-2">
          <!-- Ringkasan Harga Kamar -->
          <div class="flex justify-between">
            <span>{{ $formatters.formatCurrency(bookingDetail.pricePerNight) }} × {{ bookingDetail.nights }} night{{ bookingDetail.nights > 1 ? 's' : '' }}</span>
            <span class="font-semibold">{{ $formatters.formatCurrency(bookingDetail.totalPrice) }}</span>
          </div>
          <!-- Service Fee -->
          <div class="flex justify-between">
            <span>Service fee</span>
            <span class="font-semibold">{{ $formatters.formatCurrency(bookingDetail.serviceFee) }}</span>
          </div>
  
          <!-- Add-ons Section -->
          <div v-if="selectedAddons.length > 0" class="pt-2">
            <span class="text-gray-500">Add-on</span>
            <div v-for="addon in selectedAddonsDetails" :key="addon.id" class="flex justify-between pt-2">
              <span>{{ addon.name }} x {{ addon.quantity }}</span>
              <span class="font-semibold">{{ $formatters.formatCurrency(addon.price * addon.quantity) }}</span>
            </div>
          </div>
  
          <hr class="my-2" v-if="voucherApplied || usePoints && pointsToUse > 0" />
  
          <!-- Diskon Voucher -->
          <div v-if="voucherApplied" class="flex justify-between text-sm">
            <span>Voucher</span>
            <span class="font-semibold text-red-500">- {{ $formatters.formatCurrency(discountAmount) }}</span>
          </div>
  
          <!-- Diskon Poin -->
          <div v-if="usePoints && pointsToUse > 0" class="flex justify-between text-sm">
            <span>Poin</span>
            <span class="font-semibold text-red-500">- {{ $formatters.formatCurrency(pointsToUse) }}</span>
          </div>
  
          <hr class="my-2" />
  
          <div class="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{{ $formatters.formatCurrency(grandTotal) }}</span>
          </div>
        </div>
      </div>
  
      <div class="flex flex-row justify-center w-full">
        <!-- Points -->
        <p class="text-xs text-gray-500">
          Dapatkan <span class="text-blue-500 font-semibold">+{{ $formatters.formatCurrency(bookingDetail.points) }} poin</span> setelah transaksi
        </p>
      </div>
    </div>
  </template>
  
  <script>  
  export default {
    name: 'ReservationSummary',
    props: {
      orderId: String,
      bookingDetail: Object,
      selectedAddons: Array,
      selectedAddonsDetails: Array,
      voucherApplied: Boolean,
      discountAmount: Number,
      usePoints: Boolean,
      pointsToUse: Number,
      grandTotal: Number
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here if needed */
  </style>