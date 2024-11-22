<template>
    <div class="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 class="text-sm font-bold mb-3">Tukar Poin Sekarang!</h2>
      <div class="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="reward in rewards"
          :key="reward.id"
          class="flex items-center border rounded-lg p-3"
        >
          <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
          <div class="ml-4">
            <p class="font-semibold text-sm">{{ reward.name }}</p>
            <p class="text-gray-500 text-xs">{{ reward.description }}</p>
            <p class="text-green-600 font-bold text-sm">{{ reward.points }} Points</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      rewards: {
        type: Array,
        default: () => [
          { id: 1, name: '[Nama Reward]', description: '[Description]', points: 120 },
          { id: 2, name: '[Nama Reward]', description: '[Description]', points: 120 },
        ],
      },
    },
  };
  </script>
  