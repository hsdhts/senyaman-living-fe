<template>
    <div class="w-full">
      <BaseInput
        v-model="localPassword"
        :type="isVisible ? 'text' : 'password'"
        :placeholder="placeholder"
        :disabled="disabled"
        :label="label"
        :floatingLabel="floatingLabel"
        :iconFront="iconFront"
        :iconBack="isPasswordToggle ? (isVisible ? 'mdi:eye' : 'mdi:eye-off') : iconBack"
        @iconBackClick="isPasswordToggle ? toggleVisibility : handleIconBackClick"
        :class="['w-full', inputClass]"
      />
  
      <!-- Progress bar untuk kekuatan password -->
      <div
        v-if="showStrength"
        class="mt-3 mb-4 h-1 rounded-full bg-border overflow-hidden"
        role="progressbar"
        :aria-valuenow="calculateStrength.score"
        aria-valuemin="0"
        aria-valuemax="5"
      >
        <div
          :class="['h-full', STRENGTH_CONFIG.colors[calculateStrength.score]]"
          :style="{ width: (calculateStrength.score / 5) * 100 + '%' }"
          class="transition-all duration-500"
        />
      </div>
  
      <p
        v-if="showStrength"
        id="password-strength"
        class="mb-2 text-sm font-medium flex justify-between"
      >
        <span>Must contain:</span>
        <span>{{ STRENGTH_CONFIG.texts[Math.min(calculateStrength.score, 4)] }}</span>
      </p>
  
      <!-- Persyaratan password -->
      <ul
        v-if="showStrength"
        class="space-y-1.5"
        aria-label="Password requirements"
      >
        <li
          v-for="(req, index) in calculateStrength.requirements"
          :key="index"
          class="flex items-center space-x-2"
        >
          <AppIcon :icon="req.met ? 'mdi:check' : 'mdi:close'" class="text-red-500" />
          <span :class="['text-xs', req.met ? 'text-emerald-600' : 'text-muted-foreground']">
            {{ req.text }}
            <span class="sr-only">{{ req.met ? ' - Requirement met' : ' - Requirement not met' }}</span>
          </span>
        </li>
      </ul>
    </div>
  </template>
  
<script>
const PASSWORD_REQUIREMENTS = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    // { regex: /[0-9]/, text: 'At least 1 number' },
    { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    // { regex: /[!-/:-@[-`{-~]/, text: 'At least 1 special character' },
];

const STRENGTH_CONFIG = {
    colors: {
        0: 'bg-border',
        1: 'bg-red-500',
        2: 'bg-orange-500',
        3: 'bg-amber-500',
        4: 'bg-amber-700',
        5: 'bg-emerald-500',
    },
    texts: {
        0: 'Enter a password',
        1: 'Weak password',
        2: 'Medium password!',
        3: 'Strong password!!',
        4: 'Very Strong password!!!',
    },
};

export default {
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: 'Enter your password',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        floatingLabel: {
            type: String,
            default: '',
        },
        iconFront: {
            type: String,
            default: '',
        },
        iconBack: {
            type: String,
            default: '',
        },
        showStrength: { // Properti baru untuk mengontrol pengukur strength
        type: Boolean,
         default: true, // Secara default aktif
    },
    },
    data() {
        return {
            localPassword: this.modelValue,
            isVisible: false,
        };
    },
    computed: {
        requirementsMet() {
            // Pastikan semua persyaratan terpenuhi
            return this.calculateStrength.requirements.every((req) => req.met);
        },
        isPasswordToggle() {
            return this.type === 'password';
        },
        calculateStrength() {
            const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
                met: req.regex.test(this.localPassword),
                text: req.text,
            }));
            return {
                score: requirements.filter((req) => req.met).length,
                requirements,
            };
        },
    },
    methods: {
        emitInput() {
            this.$emit('update:modelValue', this.localPassword);
        },
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        },
    },
    watch: {
        requirementsMet(newVal) {
            // Emit nilai ke parent setiap kali status berubah
            this.$emit('requirements-met', newVal);
        },
        localPassword: {
            handler(newValue) {
                this.$emit('update:modelValue', newValue); // Emit setiap kali localPassword berubah
            },
            immediate: true,
        },
        modelValue(newVal) {
            this.localPassword = newVal;
        },
    },
    setup() {
        return {
            STRENGTH_CONFIG, // Pastikan STRENGTH_CONFIG dikembalikan di sini
        };
    },
};
</script>

<style scoped>
/* Custom Styles for Password Strength Indicator */
.border-blue-500 {
    border-color: #3b82f6;
}

.text-blue-500 {
    color: #3b82f6;
}

.text-gray-500 {
    color: #d1d5db;
}
.text-gray-700 {
    color: #374151;
}

.bg-gray-100 {
    background-color: #f3f4f6;
}
</style>
