<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <div class="relative w-full" @click="handleDropdownClick">
            <div
                @click="toggleDropdown"
                class="flex items-center border rounded-lg p-4 cursor-pointer"
            >
                <span v-if="iconFront" class="mr-2">
                    <AppIcon
                        :icon="iconFront"
                        class="text-gray-600"
                        width="20"
                        height="20"
                    />
                </span>
                <div class="flex flex-col flex-grow">
                    <span class="text-gray-700"
                        >{{ displayedCount }} guests</span
                    >
                </div>
                <span class="ml-auto">
                    <AppIcon
                        icon="mdi:chevron-down"
                        class="text-gray-600 w-4 h-4"
                    />
                </span>
            </div>

            <div
                v-if="isOpen"
                class="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4"
            >
                <div
                    v-for="(option, index) in guestCounts"
                    :key="option.label"
                    :class="[
                        'flex justify-between p-2 items-center',
                        { 'border-t border-gray-200': index > 0 },
                    ]"
                >
                    <span>{{ option.label }}</span>
                    <div class="flex items-center">
                        <button
                            @click="decrement(index)"
                            class="text-gray-600"
                            :disabled="option.count <= 0"
                        >
                            <AppIcon
                                :icon="
                                    option.count <= 0
                                        ? 'mdi:minus-circle-outline'
                                        : 'mdi:minus-circle'
                                "
                            />
                        </button>
                        <span class="mx-2 w-6 text-center">{{
                            option.count
                        }}</span>
                        <!-- Tambahkan lebar tetap pada count -->
                        <button @click="increment(index)" class="text-gray-600">
                            <AppIcon icon="mdi:plus-circle" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseSelector",
    props: {
        label: { type: String, default: "" },
        options: { type: Array, required: true },
        iconFront: { type: String, default: "" },
        modelValue: { type: Object, default: () => ({}) },
    },
    emits: ["update:modelValue"],
    data() {
        return {
            isOpen: false,
            guestCounts: this.options.map((option) => ({
                ...option,
                count: this.modelValue[option.label.toLowerCase()] || 0,
            })), // Initialize counts based on modelValue
        };
    },
    computed: {
        displayedCount() {
            return this.guestCounts.reduce(
                (total, option) => total + option.count,
                0
            );
        },
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;

            if (!this.isOpen) {
                this.apply(); // Panggil apply saat dropdown ditutup
            }
        },
        handleDropdownClick(event) {
            // Cek apakah elemen yang di-klik berada di luar dropdown
            const target = event.target;
            if (this.isOpen && !this.$el.contains(target)) {
                this.isOpen = false; // Tutup dropdown jika klik di luar
            }
        },
        increment(index) {
            this.guestCounts[index].count += 1; // Increment the count
        },
        decrement(index) {
            if (this.guestCounts[index].count > 0) {
                this.guestCounts[index].count -= 1; // Decrement the count
            }
        },
        apply() {
            // Emit the updated counts for each category
            const updatedCounts = {};
            this.guestCounts.forEach((option) => {
                updatedCounts[option.label.toLowerCase()] = option.count; // Convert label to lowercase for consistent keys
            });
            this.$emit("update:modelValue", updatedCounts);
            this.isOpen = false; // Close the dropdown
        },
    },
    watch: {
        modelValue: {
            handler(newVal) {
                this.guestCounts = this.options.map((option) => ({
                    ...option,
                    count: newVal[option.label.toLowerCase()] || 0,
                }));
            },
            deep: true,
            immediate: true,
        },
    },
    mounted() {
        document.addEventListener("click", this.handleDropdownClick); // Tambahkan listener saat komponen di-mount
    },
    unmounted() {
        document.removeEventListener("click", this.handleDropdownClick); // Hapus listener saat komponen di-destroy
    },
};
</script>

<style scoped></style>
