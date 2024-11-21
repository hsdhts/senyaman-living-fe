<!-- BaseCheckBoxBudget.vue -->
<template>
    <div
      class="budget-option flex flex-row sm:flex-row sm:items-center sm:justify-between justify-between items-center gap-4 border border-gray-300 rounded-lg p-3 w-full sm:w-1/3 cursor-pointer hover:bg-gray-50 transition"
      @click="toggleSelection"
    >
      <div>
        <p class="text-gray-500 text-sm">{{ label }}</p>
        <p class="text-black font-semibold text-sm break-words">{{ priceRange }}</p>
      </div>
      <input
        id="checkbox-{{ label }}"
        type="checkbox"
        class="form-checkbox h-5 w-5 rounded-md text-blue-600"
        :checked="isSelected"
        @change.stop="toggleSelection"
      />
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'BaseCheckBoxBudget',
    props: {
      label: {
        type: String,
        required: true
      },
      priceRange: {
        type: String,
        required: true
      },
      budgetType: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapGetters('properties', ['selectedBudgets']),
      isSelected() {
        return this.selectedBudgets[this.budgetType];
      }
    },
    methods: {
      ...mapActions('properties', ['toggleBudgetSelection']),
      toggleSelection() {
        this.toggleBudgetSelection(this.budgetType);
      }
    }
  };
  </script>
  
  <style scoped>
  .budget-option {
    cursor: pointer;
    transition: box-shadow 0.3s ease;
  }
  
  .budget-option:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  