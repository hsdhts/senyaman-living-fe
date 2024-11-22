<template>
  <div class="bg-white p-4 rounded-lg shadow-md mb-4">
    <div class="flex items-center justify-between mb-3">
      <p class="text-sm font-semibold">Membership Status</p>
      <p class="text-green-600 font-bold">{{ points }} Points</p>
    </div>
    <p class="text-sm font-medium text-gray-600">{{ membershipLevel }}</p>
    <div class="relative flex items-center mt-2 space-x-2">
      <div class="w-full h-2 bg-gray-300 rounded-full">
        <div :style="{ width: `${progress}%` }" class="h-2 bg-green-500 rounded-full"></div>
      </div>
      <span class="text-xs lg:text-sm text-green-500">{{ pointsToNext }} Points to next reward</span>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: {
      points: { type: Number, default: 0 },
      membershipLevel: { type: String, default: 'SILVER' },
      progress: { type: Number, default: 25 },
      pointsToNext: { type: Number, default: 15 },
    },
  };
  </script>
  