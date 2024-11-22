<template>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <h2 class="text-sm font-bold mb-3">News</h2>
      <div class="space-y-2">
        <div
          v-for="news in newsList"
          :key="news.id"
          class="flex items-center border rounded-lg p-3"
        >
          <div class="w-16 h-16 bg-gray-200 rounded-lg"></div>
          <div class="ml-4">
            <p class="font-semibold text-sm">{{ news.title }}</p>
            <p class="text-gray-500 text-xs">{{ news.summary }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      newsList: {
        type: Array,
        default: () => [
          { id: 1, title: 'Breaking News', summary: 'Lorem ipsum dolor sit amet.' },
          { id: 2, title: 'Update News', summary: 'Consectetur adipiscing elit.' },
        ],
      },
    },
  };
  </script>
  