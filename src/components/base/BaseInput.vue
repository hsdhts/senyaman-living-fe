<template>
    <div class="relative mb-3"> <!-- Ubah mb-4 menjadi mb-3 untuk jarak lebih rapat -->
      <label v-if="label && !floatingLabel" :class="['block text-sm font-medium mb-1', labelClass]">
        {{ label }}
      </label>
  
      <div :class="[
          'relative',
          floatingLabel ? 'flex flex-col items-start px-3 py-2' : 'flex items-center'
      ]">
        <label v-if="floatingLabel" :class="['absolute text-xs transition-all duration-200', {
            'text-blue-500': localInputValue || placeholder,
            'text-gray-500 top-3 left-3': !localInputValue && !placeholder
        }, iconFront ? 'left-10' : 'left-3']">
          {{ floatingLabel }}
        </label>
  
        <AppIcon v-if="iconFront" :icon="iconFront" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
  
        <input
          :type="isPasswordVisible ? 'text' : type"
          :placeholder="placeholder"
          v-model="localInputValue"
          @input="emitInput"
          @focus="type !== 'password' && moveCursorToEnd"
          :disabled="disabled"
          :class="[
              'outline-none w-full border-b',
              disabled ? 'text-gray-500 border-gray-300' : 'text-gray-700 border-gray-500 focus:border-blue-500',
              floatingLabel ? 'pt-4 pb-1' : 'p-2',
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
  
        <!-- Back Icon -->
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
.relative {
  border: none;
  background: none;
}

input {
  border: none; 
  border-bottom: 1px solid #d1d5db; 
  transition: border-color 0.3s; 
  padding: 0.5;
}

input:focus {
  border-bottom-color: #00703c;
  outline: none; 
}

input:disabled {
  border-bottom-color: #d1d5db; 
  background-color: transparent; 
}

.AppIcon {
  cursor: pointer;
}
</style>