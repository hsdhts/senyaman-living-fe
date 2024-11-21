<template>
    <div class="relative w-full mb-4" @click="handleDropdownClick">
        <!-- Floating Label -->
        <label v-if="floatingLabel" :class="[
            'absolute text-xs transition-all duration-200',
            {
                'text-blue-500': displayedLabel !== placeholder && displayedLabel !== 'Not Found',
                'text-gray-500 top-2 left-3': displayedLabel === placeholder || displayedLabel === 'Not Found'
            },
            iconFront ? 'left-[42px]' : 'left-3',
            displayedLabel ? 'top-2' : '',
        ]">
            {{ floatingLabel }}
        </label>

        <!-- Select Input Wrapper -->
        <div @click="toggleDropdown"
            :class="[
                cssClass,
                {
                    'pt-6': floatingLabel, // Tambahkan padding atas jika ada floatingLabel
                    'border-blue-500': displayedLabel !== placeholder && displayedLabel !== 'Not Found',
                    'border-gray-500': displayedLabel === placeholder || displayedLabel === 'Not Found',
                    'bg-gray-100': disabled
                }
            ]">
            <!-- Ikon di depan -->
            <span v-if="iconFront" class="mr-2">
                <AppIcon :icon="iconFront" class="text-gray-600" :class="['relative',
                    floatingLabel ? 'bottom-2' : ''
                ]" width="20" height="20" />
            </span>

            <!-- Selected Option atau Placeholder -->
            <div class="flex flex-col flex-grow">
                <span :class="displayedLabelClass">
                    {{ displayedLabel }}
                </span>
            </div>

            <!-- Ikon dropdown (chevron) -->
            <span class="ml-auto">
                <AppIcon icon="mdi:chevron-down" class="text-gray-600 w-4 h-4" :class="['relative',
                    floatingLabel ? 'bottom-2' : ''
                ]" />
            </span>
        </div>

        <!-- Dropdown list -->
        <ul v-if="isOpen" class="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg select-dropdown">
            <li v-for="option in options" :key="option.value" @click="selectOption(option)"
                class="p-2 hover:bg-gray-100 cursor-pointer">
                {{ option.label }}
            </li>
            <li v-if="options.length === 0" class="p-2 text-gray-500 cursor-default">Not Found</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'BaseSelectIcon',
    props: {
        floatingLabel: {
            type: String,
            default: ''
        },
        labelClass: {
            type: String,
            default: 'text-sm text-blue-500 font-medium'
        },
        options: {
            type: Array,
            required: true,
            default: () => []
        },
        placeholder: {
            type: String,
            default: 'Select an option'
        },
        iconFront: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number, null],
            default: null
        },
        cssClass: {
            type : String,
            default : 'flex items-center border rounded-lg px-3 py-2 cursor-pointer'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isOpen: false,
            displayedLabel: this.placeholder
        };
    },
    computed: {
        selectedOption() {
            return this.options.find(option => option.value === this.modelValue);
        },
        displayedLabelClass() {
            return (!this.displayedLabel || this.displayedLabel === this.placeholder || this.displayedLabel === 'Not Found')
                ? 'text-gray-500'
                : 'text-gray-700';
        }
    },
    methods: {
        toggleDropdown() {
            if (!this.disabled) this.isOpen = !this.isOpen;
        },
        selectOption(option) {
            this.$emit('update:modelValue', option.value);
            this.displayedLabel = option.label;
            this.isOpen = false;
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
            const selectedOption = this.options.find(option => option.value === newValue);
            if (selectedOption) {
                this.displayedLabel = selectedOption.label;
            } else {
                this.displayedLabel = this.placeholder;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleDropdownClick);

        if (this.modelValue) {
            const selectedOption = this.options.find(option => option.value === this.modelValue);
            this.displayedLabel = selectedOption ? selectedOption.label : this.placeholder;
        }
    },
    unmounted() {
        document.removeEventListener('click', this.handleDropdownClick);
    }
};
</script>

<style scoped>
.select-dropdown {
    max-height: 200px;
    overflow-y: auto;
}
.border-blue-500 {
    border-color: #3b82f6;
}
.text-blue-500 {
    color: #3b82f6;
}
</style>