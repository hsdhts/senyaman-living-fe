<template>
    <div class="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 class="text-sm font-bold mb-3">Exclusive Offers 🎉</h2>
      <div class="flex space-x-3 overflow-x-auto">
        <div
          v-for="offer in offers"
          :key="offer.id"
          class="min-w-[150px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center"
        >
          <p class="text-sm font-medium text-center">{{ offer.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
      offers: {
        type: Array,
        default: () => [
          { id: 1, name: 'Lorem Ipsum' },
          { id: 2, name: 'Dolor Sit' },
          { id: 3, name: 'Amet Consectetur' },
        ],
      },
    },
  };
  </script>
  