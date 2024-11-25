<template>
    <div class="bg-white p-4 rounded-lg shadow-md mb-4">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-sm font-bold">About Apps</h2>
        <button
          class="text-green-600 text-xs font-medium"
          @click="onSeeAll"
        >
          See all
        </button>
      </div>
      <div class="space-y-2">
        <div
          v-for="about in aboutList"
          :key="about.id"
          class="flex items-center border rounded-lg p-3"
        >
          <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
          <div class="ml-4">
            <p class="font-semibold text-sm">{{ about.title }}</p>
            <p class="text-gray-500 text-xs">{{ about.description }}</p>
          </div>
          <button>
            <span class="text-gray-400 text-lg font-bold">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      aboutList: {
        type: Array,

        default: () => [
          { id: 1, title: 'Senyaman Rewards', description: '' },
          { id: 2, title: 'Collect Point', description: '' },
          { id: 3, title: 'Claim & Use Rewards', description: '' },
        ],
      },
    },
    methods: {
      onSeeAll() {
        console.log("See all clicked");
      },
    },
  };
  </script>
  
  <style scoped>
  .w-16.h-16 {
    background-color: #e5e5e5;
  }
  </style>
  