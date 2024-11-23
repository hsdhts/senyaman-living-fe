<template>
  <div class="relative mb-4 group">
    <!-- Floating Label -->
    <label
      v-if="floatingLabel"
      :class="[
        'absolute transition-all duration-300 pointer-events-auto cursor-text text-sm',
        localInputValue || isFocused
          ? 'text-green-600 text-xs -top-2 left-3'
          : 'text-gray-400 top-3 left-3 group-hover:text-gray-600'
      ]"
      @click="focusInput"
    >
      {{ floatingLabel }}
    </label>

    <!-- Input Field -->
    <input
      ref="inputField"
      :type="isPasswordVisible ? 'text' : type"
      :placeholder="!floatingLabel ? placeholder : ''"
      v-model="localInputValue"
      @input="emitInput"
      @focus="handleFocus(true)"
      @blur="handleFocus(false)"
      :disabled="disabled"
      :class="[
        'w-full outline-none border-b bg-transparent placeholder-gray-400 text-gray-800 transition-all duration-300',
        disabled
          ? 'border-gray-300'
          : 'border-gray-500 focus:border-green-600 group-hover:border-gray-600',
        floatingLabel ? 'pt-5 pb-2' : 'p-2',
        iconFront ? 'pl-10' : '',
        iconBack || type === 'password' ? 'pr-10' : ''
      ]"
    />

    <!-- Front Icon -->
    <AppIcon
      v-if="iconFront"
      :icon="iconFront"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
    />

    <!-- Toggle Password Visibility -->
    <AppIcon
      v-if="type === 'password'"
      :icon="isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'"
      @click="togglePasswordVisibility"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-600 cursor-pointer"
    />

    <!-- Back Icon -->
    <AppIcon
      v-if="iconBack && type !== 'password'"
      :icon="iconBack"
      @click="handleIconBackClick"
      class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: "",
    },
    floatingLabel: {
      type: String,
      default: "",
    },
    iconFront: {
      type: String,
      default: "",
    },
    iconBack: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localInputValue: this.modelValue,
      isPasswordVisible: false,
      isFocused: false,
    };
  },
  methods: {
    emitInput() {
      this.$emit("update:modelValue", this.localInputValue);
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    handleFocus(focused) {
      this.isFocused = focused;
    },
    focusInput() {
      this.$refs.inputField.focus();
    },
  },
  watch: {
    modelValue(newVal) {
      this.localInputValue = newVal;
    },
  },
};
</script>

<style scoped>
input {
  border: none;
  border-bottom: 1px solid #d1d5db;
  transition: all 0.3s ease;
}

input:focus {
  border-bottom-color: #00703c;
  outline: none;
}

input:disabled {
  border-bottom-color: #d1d5db;
  background-color: transparent;
}

label {
  transition: all 0.3s ease;
  cursor: text;
}
</style>
