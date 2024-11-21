<template>

  <DefaultLayout>
    <div v-if="!showPaymentPage" class="container mx-auto p-4 sm:p-6 flex flex-col gap-4">
      <StepperLayout :currentStep="currentStep" />

      <div class="container mx-auto mb-8">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Kanan: Ringkasan Reservasi -->
          <div class="w-full md:w-1/3 order-2 md:order-2">
            <ReservationSummary :orderId="orderId" :bookingDetail="bookingDetail" :selectedAddons="selectedAddons"
              :selectedAddonsDetails="selectedAddonsDetails" :voucherApplied="voucherApplied"
              :discountAmount="discountAmount" :usePoints="usePoints" :pointsToUse="pointsToUse"
              :grandTotal="grandTotal" />

            <!-- Button Lanjutkan, hanya muncul di currentStep 3 -->
            <div v-if="currentStep === 3" class="flex w-full py-8">
              <button @click="confirmPayment" :disabled="isFormIncomplete"
                :class="{ 'bg-gray-400 cursor-not-allowed': isFormIncomplete, 'bg-blue-500': !isFormIncomplete }"
                class="text-white px-6 py-3 rounded-lg w-full font-semibold">
                {{ buttonText }}
              </button>
            </div>

          </div>

          <!-- Kiri: Detail Pesanan -->
          <div class="w-full md:w-2/3 order-1 md:order-1">
            <!-- Informasi Properti -->
            <div class="bg-white p-6 rounded-lg shadow mb-6 flex flex-col gap-8">
              <div class="flex flex-col md:flex-row items-start gap-4">
                <img :src="bookingDetail.imageUrl" alt="Property Image"
                  class="w-full md:w-[200px] h-[160px] rounded-lg object-cover mb-4 md:mb-0 md:mr-4" />
                <div class="flex flex-col justify-center gap-2 w-full">
                  <h3 class="text-xs md:text-sm text-gray-500 pt-1 md:pt-3">[ Nama Property ]</h3>
                  <h3 class="text-lg md:text-xl font-semibold">{{ bookingDetail.title }}</h3>
                  <p class="text-gray-500 text-xs md:text-sm">{{ bookingDetail.location }}</p>

                  <div class="flex items-center text-yellow-500">
                    <AppIcon icon="mdi:star" class="w-4 h-4 mr-1" />
                    <span class="text-xs md:text-sm font-semibold">{{ bookingDetail.rating }} ({{
      bookingDetail.reviewsCount }} reviews)</span>
                  </div>

                  <div class="text-gray-600 text-xs md:text-sm flex flex-wrap items-center gap-4">
                    <div class="flex items-center gap-1">
                      <AppIcon icon="mdi:account" class="w-4 h-4" />
                      <span>{{ bookingDetail.guests }} Guests</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <AppIcon icon="mdi:arrow-expand-horizontal" class="w-4 h-4" />
                      <span>{{ bookingDetail.size }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 1" class="flex flex-col gap-4">
                <!-- Add-on Section -->
                <h3 class="text-sm font-semibold mb-4">Add on</h3>
                <div class="flex flex-col gap-3">
                  <div v-for="addon in addons" :key="addon.id"
                    class="flex flex-col md:flex-row justify-between border p-3 rounded shadow gap-2 cursor-pointer lg:h-[100px]"
                    @click="toggleAddon(addon)">

                    <div class="flex flex-row gap-2 items-center">
                      <!-- Checkbox -->
                      <div class="p-2">
                        <input type="checkbox" :checked="selectedAddons.includes(addon.id)"
                          class="form-checkbox h-6 w-6 text-blue-500" />
                      </div>

                      <!-- Label dan Deskripsi Add-on -->
                      <label class="flex flex-col items-start gap-1">
                        <div class="flex flex-row gap-1 items-center">
                          <span class="text-sm font-semibold">{{ addon.name }} - </span>
                          <span class="text-sm font-semibold text-blue-500">{{ $formatters.formatCurrency(addon.price)
                            }}</span>
                        </div>
                        <p class="text-gray-500 text-xs">{{ addon.description }}</p>
                      </label>
                    </div>

                    <!-- Input Quantity, muncul hanya jika add-on dicentang -->
                    <div v-if="selectedAddons.includes(addon.id)" class="flex items-center gap-2 mt-2 md:mt-0">
                      <span class="text-sm font-semibold">Qty:</span>
                      <BaseInput type="number" min="1" v-model.number="addon.quantity" @click.stop
                        class="w-16 md:w-24 p-1 text-center no-spinner" style="margin-bottom: 0px !important;" />
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="currentStep === 2">
                <div class="mb-6">
                  <!-- Input Form Section -->
                  <div class="flex flex-col gap-4 mb-6">
                    <!-- Nama (KTP/Paspor) -->
                    <div>
                      <label for="name" class="block text-sm font-semibold mb-1">Nama (KTP/Paspor)</label>
                      <BaseInput id="name" placeholder="Nama" v-model="user.name" />

                    </div>

                    <!-- Nomor Ponsel dan Alamat Email -->
                    <div class="flex flex-col md:flex-row gap-4">
                      <div class="flex-1">
                        <label for="phone" class="block text-sm font-semibold mb-1">Nomor Ponsel (WhatsApp)</label>
                        <BaseInput id="phone" type="tel" placeholder="Nomor Ponsel" v-model="user.phone" />
                      </div>
                      <div class="flex-1">
                        <label for="email" class="block text-sm font-semibold mb-1">Alamat Email</label>
                        <BaseInput id="email" type="email" placeholder="Alamat Email" v-model="user.email" />
                      </div>
                    </div>
                  </div>

                  <!-- Informasi Tambahan -->
                  <p class="text-sm text-gray-500 mb-6">
                    Konfirmasi pemesanan akan dikirimkan melalui WhatsApp dan Email. Pastikan nomor ponsel dan alamat
                    email Anda dalam kondisi aktif.
                  </p>
                </div>
              </div>

              <div v-if="currentStep === 3">
                <LoadingScreen v-if="showLoading" />

                <!-- Voucher dan Poin Section -->
                <div class="mb-6">
                  <!-- Voucher Section -->
                  <div v-if="voucherApplied"
                    class="flex justify-between items-center border rounded p-4 border-gray-300 py-5 cursor-pointer"
                    @click="showModalVoucher = true">
                    <div class="flex items-center gap-2">
                      <AppIcon icon="mdi:ticket-percent-outline" class="h-6 w-6" />
                      <div class="flex flex-col gap-1 px-2">
                        <span class="font-semibold text-gray-700">{{ voucherCode }}</span>
                        <span class="text-sm text-blue-600">Anda telah hemat IDR {{
      $formatters.formatCurrency(discountAmount)
    }}</span>
                      </div>
                    </div>
                    <span class="text-gray-600">
                      <AppIcon icon="mdi:menu-right" width="24" height="24" />
                    </span>
                  </div>

                  <!-- Voucher Button if no voucher applied -->
                  <div v-else
                    class="flex justify-between items-center border rounded p-4 border-gray-300 py-5 cursor-pointer"
                    @click="showModalVoucher = true">
                    <div class="flex items-center gap-2">
                      <AppIcon icon="mdi:ticket-percent-outline" class="h-6 w-6" />
                      <span class="font-semibold text-gray-700">Use Voucher</span>
                    </div>
                    <span class="text-gray-600">
                      <AppIcon icon="mdi:menu-right" width="24" height="24" />
                    </span>
                  </div>

                  <!-- Modal -->
                  <div v-if="showModalVoucher"
                    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div class="bg-white w-[90%] md:w-[400px] p-6 rounded-lg shadow-lg relative">
                      <!-- Header Modal -->
                      <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold">Voucher</h2>
                        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">&times;</button>
                      </div>

                      <!-- Input Voucher -->
                      <div>
                        <label for="voucherCode" class="block text-sm font-semibold mb-2">Voucher Code</label>
                        <input id="voucherCode" type="text" v-model="voucherCode" placeholder="Input Voucher Code"
                          class="w-full p-3 border border-gray-300 rounded-lg mb-2" />
                        <button @click="applyVoucher"
                          class="bg-blue-500 text-white w-full py-2 rounded-lg font-semibold">
                          Use
                        </button>

                        <!-- Pesan Error -->
                        <p v-if="voucherError" class="text-red-500 text-sm mt-2">
                          <AppIcon icon="mdi:alert-circle" class="inline-block w-4 h-4 mr-1" />
                          Voucher not found!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <!-- Checkbox Gunakan Poin -->
                    <div class="flex flex-row items-center gap-3 py-4 border-b">
                      <!-- Checkbox -->
                      <div class="flex items-center">
                        <input type="checkbox" id="usePoints" v-model="usePoints"
                          class="form-checkbox h-8 w-8 text-blue-500" />
                      </div>

                      <label class="flex flex-col items-start">
                        <label for="usePoints" class="text-gray-700">Gunakan Poin</label>
                        <span class="text-sm text-gray-500">Poin saat ini: {{
      $formatters.formatCurrency(availablePoints)
    }}</span>
                      </label>
                    </div>

                    <!-- Input Poin jika checkbox true -->
                    <div v-if="usePoints" class="flex items-center gap-4 mt-4">
                      <BaseInput v-model="pointsToUse" placeholder="Masukkan jumlah poin" :error="pointsError"
                        class="w-32" @input="validatePoints" />
                      <span class="text-gray-700 font-semibold">Senilai IDR {{ $formatters.formatCurrency(pointsToUse)
                        }}</span>
                    </div>

                    <!-- Pesan error jika poin tidak valid -->
                    <p v-if="pointsError" class="text-red-500 text-sm my-4">
                      <AppIcon icon="mdi:alert-circle" class="inline-block w-4 h-4 mr-1" />
                      {{ pointsError }}
                    </p>
                  </div>

                  <!-- Pilih Metode Pembayaran -->
                  <h3 class="text-xl font-semibold my-6">Pilih Metode Pembayaran</h3>
                  <div class="space-y-4">
                    <!-- Metode Prioritas (Xendit dan BCA di atas) -->
                    <label class="flex items-center border rounded-lg px-4 p-2 cursor-pointer"
                      :class="{ 'bg-blue-50 border-blue-500': selectedPaymentMethod === 'Xendit', 'bg-white border-gray-300': selectedPaymentMethod !== 'Xendit' }"
                      @click="selectPaymentMethod(priorityMethods[0])">
                      <img :src="priorityMethods[0].logo" alt="Xendit Logo" class="h-14 w-14 mr-4" />
                      <span class="font-semibold text-gray-700">{{ priorityMethods[0].name }}</span>
                      <input type="radio" :value="priorityMethods[0].name" v-model="selectedPaymentMethod"
                        class="hidden" />
                    </label>

                    <label class="flex items-center border rounded-lg px-4 p-2 cursor-pointer"
                      :class="{ 'bg-blue-50 border-blue-500': selectedPaymentMethod === 'BCA VA', 'bg-white border-gray-300': selectedPaymentMethod !== 'BCA VA' }"
                      @click="selectPaymentMethod(priorityMethods[1])">
                      <img :src="priorityMethods[1].logo" alt="BCA Logo" class="h-14 w-14 mr-4" />
                      <span class="font-semibold text-gray-700">{{ priorityMethods[1].name }}</span>
                      <input type="radio" :value="priorityMethods[1].name" v-model="selectedPaymentMethod"
                        class="hidden" />
                    </label>

                    <!-- Metode Lainnya Toggle -->
                    <label class="flex items-center px-4 p-2 cursor-pointer" @click="toggleAdditionalMethods">
                      <span class="font-semibold text-gray-700">Metode Lainnya</span>
                      <span class="ml-auto" :class="showAdditionalMethods ? 'rotate-180' : 'rotate-0'">
                        <!-- Icon Panah bawah/atas -->
                        <AppIcon icon="mdi:chevron-down" class="h-5 w-5" />
                      </span>
                    </label>

                    <!-- Metode Pembayaran Lainnya -->
                    <div v-if="showAdditionalMethods" class="space-y-4">
                      <div class="mx-2 flex flex-col gap-4">
                        <!-- <label class="flex items-center border rounded-lg px-4 p-2 cursor-pointer"
                    :class="{ 'bg-blue-50 border-blue-500': selectedPaymentMethod === 'Bank Mandiri', 'bg-white border-gray-300': selectedPaymentMethod !== 'Bank Mandiri' }"
                    @click="selectedPaymentMethod = 'Bank Mandiri'">
                    <img src="@/assets/svg/payment/mandiri.svg" alt="Mandiri Logo" class="h-14 w-14 mr-4" />
                    <span class="font-semibold text-gray-700">Bank Mandiri</span>
                    <input type="radio" value="Bank Mandiri" v-model="selectedPaymentMethod"
                      class="ml-auto form-radio hidden" />
                  </label>

                  <label class="flex items-center border rounded-lg px-4 p-2 cursor-pointer"
                    :class="{ 'bg-blue-50 border-blue-500': selectedPaymentMethod === 'BNI', 'bg-white border-gray-300': selectedPaymentMethod !== 'BNI' }"
                    @click="selectedPaymentMethod = 'BNI'">
                    <img src="@/assets/svg/payment/bni.svg" alt="BNI Logo" class="h-14 w-14 mr-4" />
                    <span class="font-semibold text-gray-700">BNI</span>
                    <input type="radio" value="BNI" v-model="selectedPaymentMethod"
                      class="ml-auto form-radio hidden" />
                  </label> -->
                        <!-- Loop dari array indeks ke-1 untuk bank lain -->
                        <!-- <label v-for="(bank, index) in banks.slice(1)" :key="index"
                    class="flex items-center border rounded-lg px-4 p-2 cursor-pointer"
                    :class="{ 'bg-blue-50 border-blue-500': selectedPaymentMethod === bank.name, 'bg-white border-gray-300': selectedPaymentMethod !== bank.name }"
                    @click="selectPaymentMethod(bank)">
                    <img :src="bank.logo" alt="Bank Logo" class="h-14 w-14 mr-4" />
                    <span class="font-semibold text-gray-700">{{ bank.name }}</span>
                    <input type="radio" :value="bank.name" v-model="selectedPaymentMethod" class="hidden" />
                  </label>
                </div> -->

                        <!-- <h2 class="font-semibold text-lg">E-Wallet</h2>
                <div class="mx-2 flex flex-col gap-4">
                  <label class="flex items-center border rounded-lg px-4 p-2 cursor-pointer"
                    :class="{ 'bg-blue-50 border-blue-500': selectedPaymentMethod === 'GOPAY', 'bg-white border-gray-300': selectedPaymentMethod !== 'GOPAY' }"
                    @click="selectedPaymentMethod = 'GOPAY'">
                    <img src="@/assets/svg/payment/gopay.svg" alt="GOPAY Logo" class="h-14 w-14 mr-4" />
                    <span class="font-semibold text-gray-700">GOPAY</span>
                    <input type="radio" value="GOPAY" v-model="selectedPaymentMethod"
                      class="ml-auto form-radio hidden" />
                  </label>

                  <label class="flex items-center border rounded-lg px-4 p-2 cursor-pointer"
                    :class="{ 'bg-blue-50 border-blue-500': selectedPaymentMethod === 'OVO', 'bg-white border-gray-300': selectedPaymentMethod !== 'OVO' }"
                    @click="selectedPaymentMethod = 'OVO'">
                    <img src="@/assets/svg/payment/ovo.svg" alt="OVO Logo" class="h-14 w-14 mr-4" />
                    <span class="font-semibold text-gray-700">OVO</span>
                    <input type="radio" value="OVO" v-model="selectedPaymentMethod"
                      class="ml-auto form-radio hidden" />
                  </label>
                </div> -->

                        <!-- Bank Transfer Section -->
                        <h3 class="text-lg font-semibold">Bank Transfer</h3>
                        <div v-for="(bank, index) in bankMethods" :key="index"
                          class="flex items-center border rounded-lg px-4 p-2 cursor-pointer"
                          :class="{ 'bg-blue-50 border-blue-500': selectedPaymentMethod === bank.name, 'bg-white border-gray-300': selectedPaymentMethod !== bank.name }"
                          @click="selectPaymentMethod(bank)">
                          <img :src="bank.logo" alt="Bank Logo" class="h-14 w-14 mr-4" />
                          <span class="font-semibold text-gray-700">{{ bank.name }}</span>
                          <input type="radio" :value="bank.name" v-model="selectedPaymentMethod" class="hidden" />
                        </div>

                        <!-- E-Wallet Section -->
                        <h3 class="text-lg font-semibold">E-Wallet</h3>
                        <div v-for="(ewallet, index) in ewalletMethods" :key="index"
                          class="flex items-center border rounded-lg px-4 p-2 cursor-pointer"
                          :class="{ 'bg-blue-50 border-blue-500': selectedPaymentMethod === ewallet.name, 'bg-white border-gray-300': selectedPaymentMethod !== ewallet.name }"
                          @click="selectPaymentMethod(ewallet)">
                          <img :src="ewallet.logo" alt="E-Wallet Logo" class="h-14 w-14 mr-4" />
                          <span class="font-semibold text-gray-700">{{ ewallet.name }}</span>
                          <input type="radio" :value="ewallet.name" v-model="selectedPaymentMethod" class="hidden" />
                        </div>

                      </div>
                      <!-- Tambahkan metode pembayaran lainnya jika diperlukan -->
                    </div>
                  </div>
                </div>

                <!-- Payment Summary Modal -->
                <PaymentSummaryModal v-if="showPaymentSummary" :orderId="orderId" :paymentMethod="selectedPaymentMethod"
                  :bookingDetail="bookingDetail" :user="user" :selectedAddonsDetails="selectedAddonsDetails"
                  :voucherApplied="voucherApplied" :discountAmount="discountAmount" :usePoints="usePoints"
                  :pointsToUse="pointsToUse" :grandTotal="grandTotal" :formattedTimeRemaining="formattedTimeRemaining"
                  @close="showPaymentSummary = false" />


                <!-- PaymentVALayout sebagai modal layar penuh -->
                <!-- <div v-if="showPaymentPage" class="fixed inset-0 bg-white flex items-center justify-center z-50">
            <PaymentVALayout :orderId="orderId" :bankLogo="bankLogo" :bankAccountName="bankAccountName"
              :virtualAccountNumber="virtualAccountNumber" :amountToPay="amountToPay"
              :paymentInstructions="paymentInstructions" :bookingDetail="bookingDetail"
              :selectedAddons="selectedAddons" :selectedAddonsDetails="selectedAddonsDetails"
              :voucherApplied="voucherApplied" :discountAmount="discountAmount" :usePoints="usePoints"
              :pointsToUse="pointsToUse" :grandTotal="grandTotal" @close="showPaymentPage = false" />
          </div> -->
              </div>

              <!-- Button Lanjutkan -->
              <div v-if="currentStep === 1 || currentStep === 2" class="flex justify-end w-full">
                <button @click="goToNextStep" :disabled="isFormIncomplete"
                  :class="{ 'bg-gray-400 cursor-not-allowed': isFormIncomplete, 'bg-blue-500': !isFormIncomplete }"
                  class="text-white px-6 py-3 rounded-lg font-semibold">
                  {{ buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PaymentVALayout v-else :orderId="orderId" :bankLogo="selectedBankPayload.logo"
      :bankAccountName="selectedBankPayload.bankAccountName"
      :virtualAccountNumber="selectedBankPayload.virtualAccountNumber" :amountToPay="grandTotal"
      :paymentInstructions="selectedBankPayload.paymentInstructions" :bookingDetail="bookingDetail"
      :selectedAddons="selectedAddons" :selectedAddonsDetails="selectedAddonsDetails" :voucherApplied="voucherApplied"
      :discountAmount="discountAmount" :usePoints="usePoints" :pointsToUse="pointsToUse" :grandTotal="grandTotal"
      @close="showPaymentPage = false" />
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import StepperLayout from '@/components/layout/StepperLayout.vue';
import PaymentVALayout from '@/components/layout/PaymentVALayout.vue';

export default {
  name: "PaymentView",
  components: {
    StepperLayout,
    DefaultLayout,
    PaymentVALayout
  },
  data() {
    return {
      showLoading: false, // State untuk menampilkan LoadingScreen
      showPaymentSummary: false, // Kontrol untuk menampilkan modal
      showPaymentPage: false,
      orderId: 'ID82372932932843234',
      amountToPay: 2507700,
      selectedBankPayload: {}, // Simpan data bank yang dipilih
      bankLogo: require('@/assets/svg/payment/bca.svg'), // Set default logo ke BCA sebagai fallback
      priorityMethods: [
        {
          name: 'Xendit',
          logo: require('@/assets/svg/payment/xendit.svg'),
          category: 'xendit'
        },
        {
          name: 'BCA VA',
          logo: require('@/assets/svg/payment/bca.svg'),
          bankAccountName: "PT. CloudHomes Indonesia",
          virtualAccountNumber: "1234567890123456",
          paymentInstructions: [
            {
              method: "ATM BCA",
              steps: [
                "Masukkan Kartu ATM BCA & PIN",
                "Pilih menu Transaksi Lainnya > Transfer > ke Rekening BCA Virtual Account",
                "Masukkan nomor BCA Virtual Account di atas",
                "Pastikan detail pembayaran sudah sesuai seperti Nomor BCA Virtual Account, Nama Pelanggan dan Jumlah Pembayaran",
                "Simpan bukti pembayaran"
              ]
            },
            {
              method: "BCA Mobile (m-BCA)",
              steps: [
                "Lakukan log in pada aplikasi BCA Mobile",
                "Pilih menu m-BCA, kemudian masukkan kode akses m-BCA",
                "Pilih m-Transfer > BCA Virtual Account",
                "Masukkan nomor BCA Virtual Account di atas",
                "Pastikan detail pembayaran sudah sesuai seperti Nomor BCA Virtual Account, Nama Pelanggan dan Jumlah Pembayaran",
                "Masukkan pin m-BCA",
                "Pembayaran selesai. Simpan notifikasi yang muncul sebagai bukti pembayaran"
              ]
            },
            {
              method: "Internet Banking BCA",
              steps: [
                "Login pada alamat Internet Banking BCA (<a href='https://klikbca.com' target='_blank' class='text-blue-500 underline'>https://klikbca.com</a>)",
                "Pilih menu Transfer Dana > Transfer ke BCA Virtual Account",
                "Pada kolom No. Virtual Account, masukkan nomor BCA Virtual Account di atas",
                "Pastikan detail pembayaran sudah sesuai seperti Nomor BCA Virtual Account, Nama Pelanggan dan Jumlah Pembayaran",
                "Masukkan token keyBCA",
                "Simpan bukti pembayaran"
              ]
            },
            {
              method: "Kantor Bank BCA",
              steps: [
                "Ambil nomor antrian transaksi Teller dan isi slip setoran",
                "Serahkan slip dan jumlah setoran kepada Teller BCA",
                "Teller BCA akan melakukan validasi transaksi",
                "Simpan slip setoran hasil validasi sebagai bukti pembayaran"
              ]
            }
          ],
          category: 'bank' // Ditandai sebagai Bank Transfer
        },
      ],
      banks: [
        {
          name: 'Bank Mandiri',
          logo: require('@/assets/svg/payment/mandiri.svg'),
          bankAccountName: "PT. CloudHomes Indonesia",
          virtualAccountNumber: "9876543210987654",
          paymentInstructions: [
            { method: "ATM Mandiri", steps: ["Langkah 1", "Langkah 2"] }
          ],
          category: 'bank'
        },
        {
          name: 'BNI',
          logo: require('@/assets/svg/payment/bni.svg'),
          bankAccountName: "PT. CloudHomes Indonesia",
          virtualAccountNumber: "1122334455667788",
          paymentInstructions: [
            { method: "ATM BNI", steps: ["Langkah 1", "Langkah 2"] }
          ],
          category: 'bank'
        },
        {
          name: 'GOPAY',
          logo: require('@/assets/svg/payment/gopay.svg'),
          category: 'ewallet' // Ditandai sebagai E-Wallet
        },
        {
          name: 'OVO',
          logo: require('@/assets/svg/payment/ovo.svg'),
          category: 'ewallet'
        }
      ],
      usePoints: false,
      availablePoints: 271300,
      pointsToUse: 271300,
      showModalVoucher: false,
      voucherCode: '',       // Input voucher dari pengguna
      voucherError: false,   // Mengontrol pesan error
      discountAmount: 150000, // Nilai diskon voucher
      voucherApplied: false, // Menandai apakah voucher telah diterapkan
      currentStep: 1, // Mulai dari step 1
      selectedPaymentMethod: null, // Metode pembayaran yang dipilih
      showAdditionalMethods: false, // Untuk toggle "Metode Lainnya"
      showVirtualAccount: false, // Untuk mengontrol tampilan nomor Virtual Account
      showQRIS: false, // Untuk mengontrol tampilan QRIS
      user: {
        name: '',
        phone: '',
        email: ''
      },
      bookingDetail: {
        title: 'Nama Tipe/Nama Kamar',
        location: 'Kota',
        rating: 4.9,
        pointsError: null,
        reviewsCount: 90,
        guests: 2,
        size: '82 sqm',
        checkIn: new Date(2024, 9, 28),
        checkOut: new Date(2024, 9, 29),
        nights: 1,
        pricePerNight: 1300000,
        totalPrice: 2600000,
        serviceFee: 130000,
        grandTotal: 2730000,
        points: 27300,
        imageUrl: 'https://placehold.co/60x60?text=Gambar',
      },
      addons: [
        { id: 1, name: 'Perlindungan Menginap', price: 199000, description: 'Perlindungan bagi tamu selama menginap di properti', quantity: 0 },
        { id: 2, name: 'Kehilangan/Kerusakan Barang', price: 199000, description: 'Asuransi untuk kehilangan atau kerusakan barang selama menginap', quantity: 0 },
        { id: 3, name: 'Multipurpose table', price: 199000, description: 'Meja serbaguna untuk kebutuhan tambahan di kamar', quantity: 0 },
        { id: 4, name: 'Breakfast', price: 199000, description: 'Sarapan untuk tamu yang menginap', quantity: 0 },
        { id: 5, name: 'Extrabed', price: 199000, description: 'Tempat tidur tambahan di kamar', quantity: 0 }
      ],
      selectedAddons: [],
      isLoggedIn: false,
    };
  },
  watch: {
    usePoints(checked) {
      if (!checked) {
        this.pointsToUse = 0;  // Set to 0 if checkbox is unchecked
        this.pointsError = null;
      } else {
        this.pointsToUse = this.availablePoints;  // Set to available points by default
      }
    }
  },
  computed: {
    // Filter metode lainnya untuk ditampilkan sesuai kategori
    bankMethods() {
      return this.banks.filter(method => method.category === 'bank');
    },
    ewalletMethods() {
      return this.banks.filter(method => method.category === 'ewallet');
    },
    // Array add-ons terpilih beserta detailnya
    selectedAddonsDetails() {
      return this.addons.filter(addon => this.selectedAddons.includes(addon.id));
    },
    buttonText() {
      // Ubah teks tombol berdasarkan currentStep
      if (this.currentStep === 1) {
        return 'Selanjutnya';
      } else if (this.currentStep === 2) {
        return 'Lanjutkan Pembayaran';
      }
      return 'Konfirmasi Pembayaran';
    },
    isFormIncomplete() {
      // Validasi form agar tombol di-disable jika form tidak lengkap
      if (this.currentStep === 3) {
        return !this.selectedPaymentMethod; // Jika belum ada metode pembayaran, return true untuk disable button
      }

      return !this.user.name || !this.user.phone || !this.user.email;
    },
    // Hitung total dengan add-ons
    grandTotal() {
      const addonsTotal = this.selectedAddonsDetails.reduce((total, addon) => {
        return total + (addon.price * addon.quantity);
      }, 0);

      let total = this.bookingDetail.totalPrice + this.bookingDetail.serviceFee + addonsTotal;

      // Kurangi dengan voucher jika diterapkan
      if (this.voucherApplied) {
        total -= this.discountAmount;
      }

      // Kurangi dengan poin jika digunakan
      if (this.usePoints) {
        total -= this.pointsToUse;
      }

      return total < 0 ? 0 : total; // Pastikan total tidak negatif
    },
  },
  created() {
    this.getBookingData();
  },
  mounted() {

  },
  methods: {
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method.name;
      this.selectedBankPayload = method; // Simpan detail payload untuk metode yang dipilih
    },
    confirmPayment() {
      this.showLoading = true;
      setTimeout(() => {
        this.showLoading = false;

        // Periksa metode pembayaran berdasarkan kategori
        if (this.selectedBankPayload.category === 'bank') {
          // Jika metode adalah Bank Transfer, tampilkan PaymentVALayout
          this.showPaymentPage = true;
        } else if (this.selectedBankPayload.category === 'xendit') {
          // Jika metode adalah Xendit, arahkan ke halaman URL Xendit
          this.redirectToXendit();
        } else if (this.selectedBankPayload.category === 'ewallet') {
          // Jika metode adalah E-Wallet, arahkan ke halaman E-Wallet
          this.redirectToEwallet();
        } else {
          console.log("Metode pembayaran tidak dikenal");
        }
      }, 1000); // Simulasi loading selama 9 detik
    },
    redirectToXendit() {
      const xenditUrl = "https://checkout.xendit.co/your-payment-url";
      window.location.href = xenditUrl;
    },
    redirectToEwallet() {
      const ewalletUrl = "https://checkout.ewallet.co/your-ewallet-url";
      window.location.href = ewalletUrl;
    },
    goToPaymentSuccess() {
      // Mengarahkan pengguna ke halaman PaymentSuccess
      this.$router.push({ name: 'PaymentSuccess' });
    },
    validatePoints() {
      // Pastikan poin tidak melebihi availablePoints dan tidak kurang dari 0
      if (this.pointsToUse > this.availablePoints) {
        this.pointsError = 'Poin tidak boleh lebih dari yang tersedia';
        this.pointsToUse = this.availablePoints;
      } else if (this.pointsToUse < 0) {
        this.pointsError = 'Poin tidak boleh kurang dari 0';
        this.pointsToUse = 0;
      } else {
        this.pointsError = null; // Hapus error jika valid
      }
    },
    toggleAdditionalMethods() {
      this.showAdditionalMethods = !this.showAdditionalMethods;
    },
    closeModal() {
      // Menutup modal dan menghapus error jika ada
      this.showModalVoucher = false;
      this.voucherError = false;
    },
    applyVoucher() {
      // Dummy voucher code for testing
      const validVoucherCode = 'FSD30D';
      const discount = 150000;

      if (this.voucherCode === validVoucherCode) {
        this.voucherApplied = true;
        this.voucherCode = validVoucherCode;
        this.discountAmount = discount;
        this.voucherError = false;
        this.closeModal();
      } else {
        this.voucherError = true;
      }
    },
    toggleAddon(addon) {
      const index = this.selectedAddons.indexOf(addon.id);
      if (index === -1) {
        // Jika add-on belum ada di selectedAddons, tambahkan dan set qty ke 1
        this.selectedAddons.push(addon.id);
        addon.quantity = addon.quantity || 1;
      } else {
        // Jika add-on sudah ada di selectedAddons, hapus dari list
        this.selectedAddons.splice(index, 1);
      }
    },
    getBookingData() {
      const propertyId = this.$route.query.id;
      const requiresDetails = this.$route.query.requiresDetails;

      // Simulasikan pengambilan data properti berdasarkan ID
      if (propertyId) {
        this.bookingDetail.title = 'Suite Junior Super King';
        this.bookingDetail.location = 'Adimulia Hotel Medan';
        this.bookingDetail.price = 2316367;
      }
      // else {
      //   this.$router.push({ name: '404' });
      //   return;
      // }

      if (requiresDetails) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.user = {
          name: 'Yugosh Lim',
          phone: '+6281805042719',
          email: 'yugoshlim@gmail.com'
        };
      }
    },
    goToNextStep() {
      if (this.currentStep < 3) {
        this.currentStep += 1;
      }
    },
    copyToClipboard(value) {
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('Nomor Virtual Account berhasil disalin!');
    },
  },
};
</script>

<style scoped>
/* Tambahkan style jika diperlukan */
</style>
