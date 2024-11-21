<template>
  <div class="relative w-full">
    <div @click="toggleModal"
      class="flex items-center justify-between border border-blue-400 rounded-lg px-3 py-2 cursor-pointer">
      <div class="flex flex-col flex-grow">
        <label v-if="label" :class="labelClass">{{ label }}</label>
        <span :class="displayedLabelClass">
          {{ displayedDate }}
        </span>
      </div>
      <span v-if="iconBack" class="ml-2">
        <AppIcon :icon="iconBack" class="text-gray-600 w-5 h-5" />
      </span>
    </div>

    <!-- Modal untuk Pemilihan Tanggal -->
    <transition name="slide-down">
      <div v-if="isModalOpen" :class="['absolute mt-2 z-50 w-full', positionClass]" @click.stop>
        <BaseDate :selectedDate="modelValue" :position="position" @dateSelected="handleDateSelected" @close="closeModal" style="width: 400px;" />
      </div>
    </transition>
  </div>
</template>

<script>
import BaseDate from './BaseDate.vue';
import { format } from 'date-fns';

export default {
  name: 'BaseDatePicker',
  components: { BaseDate },
  props: {
    label: {
      type: String,
      default: ''
    },
    labelClass: {
      type: String,
      default: 'text-sm text-blue-500 font-medium'
    },
    placeholder: {
      type: String,
      default: 'Select date'
    },
    iconBack: {
      type: String,
      default: 'mdi:calendar'
    },
    modelValue: {
      type: Date,
      default: null
    },
    position: {
      type: String,
      default: 'right', // default adalah 'right', bisa diganti 'left' sesuai kebutuhan
      validator: value => ['left', 'right'].includes(value)
    }
  },
  data() {
    return {
      isModalOpen: false
    };
  },
  computed: {
    displayedDate() {
      return this.modelValue ? format(this.modelValue, 'dd MMM yyyy') : this.placeholder;
    },
    displayedLabelClass() {
      return this.modelValue ? 'text-sm text-gray-700' : 'text-sm text-gray-500';
    },
    positionClass() {
      return this.position === 'right' ? 'sm:left-auto sm:right-0' : 'sm:left-0 sm:right-auto';
    }
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleDateSelected(selectedDate) {
      this.$emit('update:modelValue', selectedDate);
      this.isModalOpen = false;
    },
    handleClickOutside(event) {
      if (this.isModalOpen && !this.$el.contains(event.target)) {
        this.isModalOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-down-enter,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.z-50 {
  z-index: 50;
}
</style>