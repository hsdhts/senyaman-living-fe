<template>
  <div class="relative mb-4">
      <!-- Label if not using floatingLabel -->
      <label v-if="label && !floatingLabel" :class="['block text-sm font-medium mb-1', labelClass]">
          {{ label }}
      </label>

      <div :class="[
          'rounded-lg overflow-hidden relative',
          !disabled && localInputValue ? 'border border-blue-500' : 'border border-gray-300',
          disabled ? 'bg-gray-100' : '',
          floatingLabel ? 'flex flex-col items-start px-3 py-2' : 'flex items-center'
      ]">
          <!-- Floating Label -->
          <label v-if="floatingLabel" :class="['absolute text-xs transition-all duration-200', {
              'text-blue-500': localInputValue || placeholder,
              'text-gray-500 top-3 left-3': !localInputValue && !placeholder
          }, iconFront ? 'left-10' : 'left-3']">
              {{ floatingLabel }}
          </label>

          <!-- Front Icon -->
          <AppIcon v-if="iconFront" :icon="iconFront" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />

          <!-- Input Element -->
          <input
              :type="isPasswordVisible ? 'text' : type"
              :placeholder="placeholder"
              v-model="localInputValue"
              @input="emitInput"
              @focus="type !== 'password' && moveCursorToEnd"
              :disabled="disabled"
              :class="[
                  'outline-none border-none w-full',
                  disabled ? 'text-gray-500' : 'text-gray-700',
                  floatingLabel ? 'pt-4 pb-1' : 'p-3',
                  iconFront ? 'pl-10' : '',
                  iconBack || type === 'password' ? 'pr-10' : '',
                  'placeholder-gray-500'
              ]"
          />

          <!-- Toggle Password Visibility Icon -->
          <AppIcon
              v-if="type === 'password'"
              :icon="isPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'"
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-600 cursor-pointer"
          />

          <!-- Back Icon for non-password fields -->
          <AppIcon
              v-if="iconBack && type !== 'password'"
              :icon="iconBack"
              @click="handleIconBackClick"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
          />
      </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
      type: {
          type: String,
          default: 'text',
      },
      placeholder: {
          type: String,
          default: '',
      },
      modelValue: {
          type: [String, Number, Boolean],
          default: '',
      },
      floatingLabel: {
          type: String,
          default: '',
      },
      label: {
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
      iconBackClick: {
          type: Function,
          default: null,
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
      };
  },
  methods: {
      emitInput() {
          this.$emit('update:modelValue', this.localInputValue);
      },
      moveCursorToEnd(event) {
          this.$nextTick(() => {
              const input = event.target;
              if (['text', 'search', 'tel', 'url'].includes(this.type)) {
                  const length = input.value.length;
                  input.setSelectionRange(length, length);
              }
          });
      },
      togglePasswordVisibility() {
          this.isPasswordVisible = !this.isPasswordVisible;
      },
      handleIconBackClick() {
          if (this.iconBackClick) {
              this.iconBackClick();
          }
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
.border-blue-500 {
  border-color: #3b82f6;
}

.text-blue-500 {
  color: #3b82f6;
}

/* .text-gray-400 {
  color: #d1d5db;
} */

/* .text-gray-700 {
  color: #374151;
} */

.bg-gray-100 {
  background-color: #f3f4f6;
}
</style>