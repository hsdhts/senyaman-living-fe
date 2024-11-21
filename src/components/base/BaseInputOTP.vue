<template>
    <div class="flex items-center justify-center space-x-2">
        <input
            v-for="(digit, index) in length"
            :key="index"
            ref="input"
            type="text"
            maxlength="1"
            :value="otp[index]"
            class="w-12 h-12 border border-gray-300 rounded-md text-center text-xl font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            @input="handleInput($event, index)"
            @keydown.backspace="handleBackspace($event, index)"
        />
    </div>
</template>


<script>
export default {
    name: "BaseInputOTP",
    props: {
        length: {
            type: Number,
            default: 6, // Jumlah digit OTP (default: 6)
        },
        modelValue: {
            type: String,
            required: true, // v-model binding dari parent
        },
    },
    data() {
        return {
            otp: Array(this.length).fill(""), // Array untuk menyimpan setiap digit OTP
        };
    },
    watch: {
        // Update modelValue dari parent ke komponen internal
        modelValue(newValue) {
            this.otp = newValue.split("").slice(0, this.length);
        },
        // Emit nilai OTP setiap kali ada perubahan
        otp: {
            handler(newOtp) {
                this.$emit("update:modelValue", newOtp.join("")); // Kirim kembali nilai gabungan
            },
            deep: true,
        },
    },
    methods: {
        handleInput(event, index) {
            const value = event.target.value;

            // Validasi input harus angka
            if (!/^\d$/.test(value)) {
                this.otp[index] = ""; // Kosongkan jika bukan angka
                return;
            }

            // Perbarui array otp pada index tertentu
            this.otp.splice(index, 1, value);

            // Pindah fokus ke input berikutnya jika ada
            if (index < this.length - 1) {
                this.$refs.input[index + 1]?.focus();
            }
        },
        handleBackspace(event, index) {
            if (!this.otp[index] && index > 0) {
                this.$refs.input[index - 1]?.focus(); // Fokus ke input sebelumnya
            }
        },
    },
};
</script>


<style scoped>
/* Tambahan styling jika diperlukan */
</style>