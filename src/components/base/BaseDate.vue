<template>
    <div :class="['absolute z-100 bg-white shadow-lg rounded-lg mt-2 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg overflow-hidden', positionClass]">
      <!-- Navigasi Bulan -->
      <div class="flex justify-between items-center mb-4 p-4">
        <button @click="prevMonth" class="text-gray-500 focus:outline-none">&lt;</button>
        <div class="text-lg font-semibold">{{ currentMonthYear }}</div>
        <button @click="nextMonth" class="text-gray-500 focus:outline-none">&gt;</button>
      </div>
  
      <!-- Grid Kalender -->
      <div class="grid grid-cols-7 gap-2 px-4">
        <!-- Nama Hari -->
        <div v-for="day in dayNames" :key="day" class="text-gray-600 text-xs text-center font-medium">
          {{ day }}
        </div>
        <!-- Tanggal -->
        <div v-for="day in currentMonthDays" :key="day.date" :class="{
          'bg-blue-500 text-white': isSelected(day.date),
          'bg-blue-100': isInRange(day.date),
          'text-gray-500': isPastDate(day.date),
          'cursor-not-allowed': isPastDate(day.date)
        }" @click="!isPastDate(day.date) && selectDate(day.date)"
          class="flex flex-col items-center justify-center rounded-full p-1 cursor-pointer"
          style="width: 2.5rem; height: 2.5rem;">
          <span>{{ day.date.getDate() }}</span>
          <span v-if="!isPastDate(day.date)" class="text-xs text-green-500 mt-1">
            {{ day.price ? day.price : '' }}
          </span>
        </div>
      </div>
  
      <!-- Tombol Clear dan Apply -->
      <div class="flex justify-between mt-4 p-4">
        <button @click="clearDate" class="text-sm text-red-500">Clear date</button>
        <button @click="applyDate" class="bg-blue-500 text-white px-4 py-2 rounded-full">
          Apply
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval
  } from 'date-fns';
  
  export default {
    name: 'BaseDate',
    props: {
      selectedDate: {
        type: [Date, Object],
        default: null
      },
      position: {
        type: String,
        default: 'right', // posisi default
        validator: value => ['left', 'right'].includes(value)
      },
      range: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const initialDate = this.range ? (this.selectedDate ? this.selectedDate.startDate : new Date()) : (this.selectedDate || new Date());
      return {
        currentMonth: new Date(initialDate),
        internalSelectedDate: this.selectedDate,
        dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        prices: {
          '2024-10-30': '599rb',
          '2024-11-06': '299rb'
        },
        selectingRange: false
      };
    },
    computed: {
      currentMonthYear() {
        return format(this.currentMonth, 'MMMM yyyy');
      },
      currentMonthDays() {
        const start = startOfMonth(this.currentMonth);
        const end = endOfMonth(this.currentMonth);
        return eachDayOfInterval({ start, end }).map(date => ({
          date,
          price: this.prices[format(date, 'yyyy-MM-dd')] || null
        }));
      },
      positionClass() {
        return this.position === 'right' ? 'sm:left-auto sm:right-0' : 'sm:left-0 sm:right-auto';
      }
    },
    methods: {
      prevMonth() {
        this.currentMonth = subMonths(this.currentMonth, 1);
      },
      nextMonth() {
        this.currentMonth = addMonths(this.currentMonth, 1);
      },
      selectDate(date) {
        if (this.range) {
          if (!this.selectingRange || !this.internalSelectedDate.startDate) {
            // Memulai pemilihan rentang tanggal
            this.internalSelectedDate = { startDate: date, endDate: null };
            this.selectingRange = true;
          } else {
            // Menentukan tanggal akhir
            if (date < this.internalSelectedDate.startDate) {
              // Jika tanggal akhir sebelum tanggal mulai, tukar
              this.internalSelectedDate = { startDate: date, endDate: this.internalSelectedDate.startDate };
            } else {
              this.internalSelectedDate.endDate = date;
            }
            this.selectingRange = false;
          }
        } else {
          // Pemilihan tanggal tunggal
          this.internalSelectedDate = date;
          this.currentMonth = new Date(date); // Perbarui bulan saat ini ke bulan tanggal yang dipilih
        }
      },
      isSelected(date) {
        if (this.range) {
          if (this.internalSelectedDate && this.internalSelectedDate.startDate && this.internalSelectedDate.endDate) {
            return date.getTime() === this.internalSelectedDate.startDate.getTime() || date.getTime() === this.internalSelectedDate.endDate.getTime();
          } else if (this.internalSelectedDate && this.internalSelectedDate.startDate) {
            return date.getTime() === this.internalSelectedDate.startDate.getTime();
          }
        } else {
          return this.internalSelectedDate && date.toDateString() === this.internalSelectedDate.toDateString();
        }
      },
      isInRange(date) {
        if (this.range && this.internalSelectedDate && this.internalSelectedDate.startDate && this.internalSelectedDate.endDate) {
          return date > this.internalSelectedDate.startDate && date < this.internalSelectedDate.endDate;
        }
        return false;
      },
      isPastDate(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalisasi ke tengah malam
        return date < today;
      },
      clearDate() {
        this.internalSelectedDate = this.range ? { startDate: null, endDate: null } : null;
        this.selectingRange = false;
      },
      applyDate() {
        this.$emit('dateSelected', this.internalSelectedDate);
        this.$emit('close');
      },
      closeModal() {
        this.$emit('close');
      }
    },
    watch: {
      selectedDate(newVal) {
        this.internalSelectedDate = newVal;
        if (newVal) {
          const dateToUse = newVal.startDate || newVal;
          this.currentMonth = new Date(dateToUse); // Perbarui bulan saat ini ketika selectedDate berubah
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Transition Styles */
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .slide-down-enter,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  /* High z-index to overlay other elements */
  .z-100 {
    z-index: 100;
  }
  
  /* Styling for responsiveness */
  @media (max-width: 640px) {
    .max-w-full {
      width: 100%;
    }
  }
  
  @media (min-width: 640px) {
    .sm\:max-w-sm {
      max-width: 24rem;
    }
  }
  
  @media (min-width: 768px) {
    .md\:max-w-md {
      max-width: 28rem;
    }
  }
  
  @media (min-width: 1024px) {
    .lg\:max-w-lg {
      max-width: 32rem;
    }
  }
  
  /* Styling for past dates */
  .text-gray-500 {
    color: #9ca3af;
  }
  
  .cursor-not-allowed {
    cursor: not-allowed;
  }
  </style>