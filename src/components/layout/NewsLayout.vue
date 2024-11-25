<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <!-- Header -->
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-sm font-bold">News</h2>
      <button
        class="text-green-600 text-xs font-medium"
        @click="toggleDisplay"
      >
        {{ toggleButtonText }}
      </button>
    </div>

    <!-- List of News -->
    <div class="space-y-2">
      <div
        v-for="news in displayedNews"
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
        { id: 3, title: 'More News', summary: 'Sed do eiusmod tempor incididunt ut labore.' },
        { id: 4, title: 'Another News', summary: 'Ut enim ad minim veniam, quis nostrud exercitation.' },
      ],
    },
  },
  data() {
    return {
      displayedCount: 2, 
      isExpanded: false, 
    };
  },
  computed: {
    displayedNews() {
      return this.newsList.slice(0, this.displayedCount);
    },
    toggleButtonText() {
      // Ubah teks tombol berdasarkan status "isExpanded"
      return this.isExpanded ? 'Show Less' : 'See All';
    },
  },
  methods: {
    toggleDisplay() {
      // Toggle antara menampilkan semua berita atau hanya 2 berita awal
      if (this.isExpanded) {
        this.displayedCount = 2; // Kembali ke 2 berita
      } else {
        this.displayedCount = this.newsList.length; // Tampilkan semua berita
      }
      this.isExpanded = !this.isExpanded; // Ubah status
    },
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* Add this line for standard compatibility */
  -webkit-box-orient: vertical;
  box-orient: vertical; /* Also add this line for standard compatibility */
  overflow: hidden;
}
</style>
