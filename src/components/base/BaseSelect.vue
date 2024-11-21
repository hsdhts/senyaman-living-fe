<template>
    <div class="flex-col items-start w-full">
        <label v-if="label" class="mb-2">{{ label }}</label>
        <div class="relative w-full" @click="handleDropdownClick">
            <div
                @click="toggleDropdown"
                class="flex items-center border rounded p-4 cursor-poimter"
            >
                <span v-if="icon" class="mr-2">
                    <AppIcon
                        :icon="icon"
                        class="text-gray-600"
                        width="20"
                        height="20"
                    />
                </span>
                <input
                    v-model="displayedLabel"
                    class="w-full outline-none"
                    :placeholder="placeholder"
                />
                <span class="ml-2">
                    <AppIcon
                        icon="mdi:chevron-down"
                        class="text-gray-600 w-4 h-4"
                    />
                </span>
            </div>
            <ul
                v-if="isOpen"
                class="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-40"
            >
                <li
                    v-for="option in filteredOptions"
                    :key="option.value"
                    @click="selectOption(option)"
                    class="p-2 hover:bg-gray-100 cursor-pointer"
                >
                    {{ option.label }}
                </li>
                <li
                    v-if="options.length === 0"
                    class="p-2 text-gray-500 cursor-default"
                >
                    Not Found
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseSelect",
    props: {
        label: {
            type: String,
        },
        icon: {
            type: String,
        },
        placeholder: {
            type: String,
            default: "placeholder",
        },
        options: {
            type: Array,
            required: true,
            default: () => [],
        },
        modelValue: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            isOpen: false,
            displayedLabel: "",
        };
    },
    computed: {
        selectedOption() {
            return this.options.find(
                (option) => option.value === this.modelValue
            );
        },
        filteredOptions() {
            return this.options.filter((option) =>
                option.label
                    .toLowerCase()
                    .includes(this.displayedLabel.toLowerCase())
            );
        },
    },
    mounted() {
        document.addEventListener("click", this.handleDropdownClick);

        if (!this.modelValue && !this.placeholder && this.options.length > 0) {
            this.$emit("update:modelValue", this.options[0].value);
            this.displayedLabel = this.options[0].label;
        }
    },
    unmounted() {
        document.removeEventListener("click", this.handleDropdownClick);
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectOption(option) {
            this.$emit("update:modelValue", option.value);
            this.displayedLabel = option.label;
            this.isOpen = false;
        },
        closeModal() {
            this.$emit("close");
        },
        handleDropdownClick(event) {
            const target = event.target;
            if (this.isOpen && !this.$el.contains(target)) {
                this.isOpen = false;
            }
        },
    },
    watch: {
        modelValue(newValue) {
            const selectedOption = this.options.find(
                (option) => option.value === newValue
            );
            if (selectedOption) {
                this.displayedLabel = selectedOption.label;
            } else if (!this.placeholder && this.options.length > 0) {
                this.displayedLabel = this.options[0].label;
            } else {
                this.displayedLabel = this.placeholder || "Not Found";
            }
        },
    },
};
</script>

<style scoped>
.select-dropdown {
    max-height: 200px;
    overflow-y: auto;
}
</style>
