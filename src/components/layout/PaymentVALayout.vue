<template>
    <div class="container mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-4">
        <!-- Left Section: Payment Instructions -->
        <div class="flex flex-col gap-4 w-full md:w-3/5">
            <!-- Header: Payment Countdown -->
            <div class="flex justify-center md:justify-start">
                <p
                    class="text-sm text-blue-500 border border-blue-500 rounded p-3 bg-white w-auto text-center md:text-left">
                    Selesaikan pembayaran dalam {{ formattedTimeRemaining }}
                </p>
            </div>

            <!-- Payment Details and Instructions -->
            <div class="w-full p-4 md:p-6 bg-white rounded-lg shadow-md">
                <!-- Bank Logo and Account Info -->
                <div class="flex flex-col md:flex-row items-center md:items-start border rounded-lg p-4 gap-4">
                    <!-- Logo Section (50%) -->
                    <div class="flex justify-center md:justify-start w-full md:w-1/2">
                        <img :src="bankLogo" alt="Bank Logo" class="object-contain w-24 h-24 md:w-32 md:h-32" />
                    </div>

                    <!-- Text Section (50%) -->
                    <div class="text-center md:text-left w-full md:w-1/2">
                        <p class="text-lg font-semibold">Virtual Account</p>
                        <p class="text-gray-500">{{ bankAccountName }}</p>
                        <div class="flex flex-col md:flex-row items-center gap-2 mt-4 justify-center md:justify-start">
                            <p class="text-lg md:text-xl font-semibold">{{ virtualAccountNumber }}</p>
                            <button @click="handleCopy"
                                :class="{ 'bg-green-100 text-green-600 border-green-400': isCopied, 'text-blue-500 border-blue-400': !isCopied }"
                                class="copy-button px-3 py-1 border rounded-lg flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:bg-blue-50 hover:scale-105">
                                <AppIcon :icon="isCopied ? 'mdi:check' : 'mdi:content-copy'"
                                    class="w-5 h-5 transition-all duration-300 ease-in-out"
                                    :class="isCopied ? 'text-green-500 scale-110' : 'text-blue-500'" />
                                <span class="transition-opacity duration-300 ease-in-out">{{ isCopied ? "Copied!" :
                        "Copy" }}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Amount to Pay -->
                <div class="text-left mt-6">
                    <p class="text-gray-500 mb-3">Amount to pay</p>
                    <div class="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <p class="text-2xl font-bold">{{ formattedAmount }}</p>
                        <button @click="handleCopyAmount"
                            :class="{ 'bg-green-100 text-green-600 border-green-400': isCopiedAmmount, 'text-blue-500 border-blue-400': !isCopiedAmmount }"
                            class="copy-button px-4 py-1 border rounded-lg flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:bg-blue-50 hover:scale-105">
                            <AppIcon :icon="isCopiedAmmount ? 'mdi:check' : 'mdi:content-copy'"
                                class="w-5 h-5 transition-all duration-300 ease-in-out"
                                :class="isCopiedAmmount ? 'text-green-500 scale-110' : 'text-blue-500'" />
                            <span class="transition-opacity duration-300 ease-in-out">{{ isCopiedAmmount ? "Copied!" :
                        "Copy" }}</span>
                        </button>
                    </div>
                </div>

                <!-- Payment Instructions -->
                <h3 class="text-xl md:text-2xl font-semibold mt-8 md:mt-12 mb-4">Petunjuk Pembayaran</h3>
                <div class="space-y-4 border-t mb-4">
                    <div v-for="(instruction, index) in paymentInstructions" :key="index" class="mt-4 md:mt-8">
                        <button class="flex justify-between items-center w-full text-left font-semibold border-b pb-2"
                            @click="toggleInstruction(index)">
                            {{ instruction.method }}
                            <span :class="{ 'rotate-180': activeInstruction === index }">
                                <AppIcon icon="mdi:chevron-down" />
                            </span>
                        </button>
                        <div v-if="activeInstruction === index" class="text-sm text-gray-700 mt-2 space-y-1">
                            <ul class="list-decimal list-inside space-y-1">
                                <li v-for="(step, stepIndex) in instruction.steps" :key="stepIndex" v-html="step"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Section: Reservation Summary -->
        <div class="w-full md:w-2/5 order-first md:order-none">
            <ReservationSummary :orderId="orderId" :bookingDetail="bookingDetail" :selectedAddons="selectedAddons"
                :selectedAddonsDetails="selectedAddonsDetails" :voucherApplied="voucherApplied"
                :discountAmount="discountAmount" :usePoints="usePoints" :pointsToUse="pointsToUse"
                :grandTotal="grandTotal" />
        </div>
    </div>
</template>

<script>
export default {
    name: "PaymentVALayout",
    props: {
        orderId: String,
        bankLogo: String,
        bankAccountName: String,
        virtualAccountNumber: String,
        amountToPay: Number,
        paymentInstructions: Array,
        bookingDetail: Object,
        selectedAddons: Array,
        selectedAddonsDetails: Array,
        voucherApplied: Boolean,
        discountAmount: Number,
        usePoints: Boolean,
        pointsToUse: Number,
        grandTotal: Number,
        countdownStart: {
            type: Number,
            default: 3600 // Default countdown set to 1 hour in seconds
        }
    },
    data() {
        return {
            countdown: this.countdownStart,
            activeInstruction: null,
            isCopied: false, // Untuk status copied
            isCopiedAmmount: false, // Untuk status copied
        };
    },
    computed: {
        formattedInstructions() {
            return this.paymentInstructions.map(instruction => ({
                ...instruction,
                steps: instruction.steps.map(step => {
                    // Temukan URL dan gantikan dengan link HTML berwarna biru dan underline
                    return step.replace(
                        /(https?:\/\/[^\s]+)/g,
                        `<a href="$1" target="_blank" class="text-blue-500 underline">$1</a>`
                    );
                })
            }));
        },
        formattedTimeRemaining() {
            const hours = Math.floor(this.countdown / 3600);
            const minutes = Math.floor((this.countdown % 3600) / 60);
            const seconds = this.countdown % 60;
            return `${String(hours).padStart(2, '0')} jam ${String(minutes).padStart(2, '0')} menit ${String(seconds).padStart(2, '0')} detik`;
        },
        formattedAmount() {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(this.amountToPay).replace("Rp", "IDR");
        }
    },
    methods: {
        handleCopy() {
            this.copyToClipboard(this.virtualAccountNumber); // Salin ke clipboard
            this.isCopied = true; // Tampilkan status copied
            setTimeout(() => {
                this.isCopied = false; // Kembalikan ke tombol 'Copy' setelah 2 detik
            }, 1000);
        },
        handleCopyAmount() {
            this.copyToClipboard(this.amountToPay); // Salin amountToPay ke clipboard
            this.isCopiedAmmount = true; // Ubah status ke "Copied!"

            // Kembali ke status awal setelah 2 detik
            setTimeout(() => {
                this.isCopiedAmmount = false;
            }, 1000);
        },
        toggleInstruction(index) {
            this.activeInstruction = this.activeInstruction === index ? null : index;
        },
        copyToClipboard(text) {
            // Cek apakah `navigator.clipboard` tersedia
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).catch((err) => {
                    console.error("Error copying text: ", err);
                });
            } else {
                // Fallback untuk browser yang tidak mendukung clipboard API
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";  // Hindari scroll saat menyalin
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                try {
                    document.execCommand("copy");
                } catch (err) {
                    console.error("Fallback: Copy command failed", err);
                }
                document.body.removeChild(textarea);
            }
        },
        tick() {
            if (this.countdown > 0) {
                this.countdown--;
            } else {
                clearInterval(this.timer);
            }
        }
    },
    mounted() {
        this.timer = setInterval(this.tick, 1000); // Update setiap detik
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
};
</script>

<style scoped>
.copy-button {
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.copy-button:hover {
    transform: scale(1.05);
    /* Efek memperbesar saat hover */
}

.copy-button .w-5.h-5 {
    transition: color 0.3s ease, transform 0.3s ease;
}

.copy-button .scale-110 {
    transform: scale(1.1);
    /* Perbesar ikon sedikit saat status copied */
}

.transition-opacity {
    transition: opacity 0.3s ease;
    /* Opacity transisi untuk teks */
}

.container {
    max-width: 1200px;
}

.rotate-180 {
    transform: rotate(180deg);
}
</style>