<template>
    <div class="container mx-auto py-4 md:p-8">
        <!-- Payment Stepper -->
        <div v-if="disableStepper" :class="isMobile ? 'flex flex-row overflow-x-auto hide-scrollbar px-4 items-center' : 'flex flex-row justify-between items-center'">
            <!-- Step 1: Detail Pesanan -->
            <div class="step-item">
                <div :class="{'bg-blue-500 text-white': currentStep >= 1, 'bg-gray-200 text-blue-500 border border-blue-500': currentStep < 1}" class="step-circle">
                    <template v-if="currentStep > 1">
                        <!-- Ikon centang -->
                        <AppIcon icon="mdi-check" class="h-5 w-5 text-white" />
                    </template>
                    <template v-else>
                        <span>1</span>
                    </template>
                </div>
                <div class="step-label mt-2" v-if="!isMobile">STEP 1</div>
                <div class="step-name whitespace-nowrap">Detail Pesanan</div>
            </div>

            <!-- Garis Penghubung -->
            <div :class="isMobile ? 'mobile-line-separator' : 'line-separator'"></div>

            <!-- Step 2: Data Diri Pemesan -->
            <div class="step-item">
                <div :class="{'bg-blue-500 text-white': currentStep >= 2, 'bg-gray-200 text-blue-500 border border-blue-500': currentStep < 2}" class="step-circle">
                    <template v-if="currentStep > 2">
                        <!-- Ikon centang -->
                        <AppIcon icon="mdi-check" class="h-5 w-5 text-white" />
                    </template>
                    <template v-else>
                        <span>2</span>
                    </template>
                </div>
                <div class="step-label mt-2" v-if="!isMobile">STEP 2</div>
                <div class="step-name whitespace-nowrap">Data Diri Pemesan</div>
            </div>

            <!-- Garis Penghubung -->
            <div :class="isMobile ? 'mobile-line-separator' : 'line-separator'"></div>

            <!-- Step 3: Pilih Metode Bayar -->
            <div class="step-item">
                <div :class="{'bg-blue-500 text-white': currentStep === 3, 'bg-gray-200 text-blue-500 border border-blue-500': currentStep < 3}" class="step-circle">
                    <span>3</span>
                </div>
                <div class="step-label mt-2" v-if="!isMobile">STEP 3</div>
                <div class="step-name whitespace-nowrap">Pilih Metode Bayar</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StepperLayout',
    props: {
        currentStep: {
            type: Number,
            required: true,
        },
        disableStepper: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            isMobile: window.innerWidth <= 768 // Check if device is mobile
        };
    },
    mounted() {
        window.addEventListener('resize', this.checkIfMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkIfMobile);
    },
    methods: {
        checkIfMobile() {
            this.isMobile = window.innerWidth <= 768;
        }
    }
}
</script>

<style scoped>
.step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.step-circle {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: bold;
}

.step-label {
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280; /* Tailwind gray-600 */
}

.step-name {
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: #374151; /* Tailwind gray-700 */
}

.line-separator {
    flex-grow: 1;
    height: 2px;
    background-color: #d1d5db; /* Tailwind gray-300 */
    margin: 0 1rem;
    flex-shrink: 0; /* Tambahkan ini */
}

.mobile-line-separator {
    width: 2rem;
    height: 2px;
    background-color: #d1d5db; /* Tailwind gray-300 */
    margin: 0 0.5rem;
    flex-shrink: 0; /* Tambahkan ini */
}

/* Untuk menyembunyikan scrollbar di mobile */
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
.hide-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

@media (max-width: 768px) {
    .step-item {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }
    .step-circle {
        width: 1.5rem;
        height: 1.5rem;
        font-size: 0.75rem;
    }
    .step-label {
        display: none; /* Sembunyikan label langkah di mobile */
    }
    .step-name {
        font-size: 0.875rem; /* Ukuran teks lebih kecil untuk mobile */
    }
}
</style>