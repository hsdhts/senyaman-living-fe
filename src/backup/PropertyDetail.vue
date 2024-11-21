<template>
  <DefaultLayout>
    <div v-if="!loadingDetail">
      <div class="container mx-auto p-4">
        <div class="flex flex-col md:flex-row justify-between">
          <!-- Bagian Kiri: Gambar Properti -->
          <div class="w-full md:w-1/2">
            <div class="grid grid-cols-1 gap-4">
              <!-- Gambar utama yang akan membuka popup -->
              <img :src="property.image[0]" class="rounded-lg cursor-pointer w-full h-[400px] object-cover"
                alt="Property Image" @click="showModal(property.image[0])" />
              <!-- Bagian gambar lainnya, dengan scroll horizontal jika lebih dari 6 -->
              <div class="flex space-x-2 overflow-x-auto">
                <img v-for="(img, index) in property.image.slice(1)" :key="index" :src="img"
                  class="rounded-lg cursor-pointer h-[80px] w-[80px] object-cover flex-shrink-0"
                  @click="showModal(img)" />
              </div>
            </div>
          </div>

          <!-- Bagian Kanan: Detail Properti -->
          <div class="w-full md:w-1/2 sm:mt-4 pl-4">
            <h1 class="text-2xl md:text-3xl font-bold">{{ property.title }}</h1>
            <p>{{ property.location }}</p>

            <div class="flex flex-col md:flex-row items-start md:items-center mt-2 space-x-4">
              <span class="text-xl md:text-2xl font-bold">{{ property.price }} / malam</span>
              <span class="text-md text-red-500">Diskon {{ property.discount }}%</span>
            </div>

            <!-- User Information -->
            <div class="mt-4 flex items-center">
              <img :src="property.user.avatar" alt="User Avatar" class="rounded-full h-10 w-10 mr-2">
              <div>
                <p class="font-semibold">{{ property.user.name }}</p>
                <p>{{ property.user.hostingDuration }}</p>
              </div>
            </div>

            <button @click="handleBooking" class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg w-full md:w-auto">
              Pesan Sekarang
            </button>

            <!-- Bagikan ke Media Sosial -->
            <div class="mt-4">
              <h3 class="font-semibold text-lg mb-2">Bagikan di:</h3>
              <div class="flex items-center mt-4 gap-4">
                <a :href="`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`" target="_blank"
                  class="text-blue-600 w-6 h-6">
                  <img src="@/assets/svg/socialmedia/facebook.svg" alt="Facebook Share" />
                </a>
                <a :href="`https://twitter.com/intent/tweet?url=${currentUrl}`" target="_blank"
                  class="text-blue-400 w-6 h-6">
                  <img src="@/assets/svg/socialmedia/twitter.svg" alt="Twitter Share" />
                </a>
                <a :href="`https://api.whatsapp.com/send?text=${currentUrl}`" target="_blank"
                  class="text-green-500 w-6 h-6">
                  <img src="@/assets/svg/socialmedia/whatsapp.svg" alt="Whatsapp Share" />
                </a>
                <a :href="`https://www.instagram.com/`" target="_blank" class="text-pink-600 w-6 h-6">
                  <img src="@/assets/svg/socialmedia/instagram.svg" alt="Instagram Share" />
                </a>
                <a :href="`mailto:?subject=Check%20this%20property&body=${currentUrl}`" target="_blank"
                  class="text-gray-600 w-6 h-6">
                  <i class="fas fa-envelope fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail tambahan seperti deskripsi dan fasilitas -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold">Serunya Nginep di Sini</h2>
        <div class="flex flex-col md:flex-row gap-4 mt-4 w-full">
          <!-- Card pertama: Cocok untuk perjalanan medis -->
          <div class="p-4 bg-gray-100 rounded-lg flex items-start w-full">
            <img src="@/assets/svg/icon/hospital.svg" alt="Medical Icon" class="h-16 w-16 mr-2" />
            <div>
              <h3 class="font-bold">Cocok untuk perjalanan medis</h3>
              <p class="text-sm text-gray-600">
                Dekat dengan fasilitas kesehatan dan disukai tamu yang melakukan perjalanan medis.
              </p>
            </div>
          </div>

          <!-- Card kedua: Lokasinya strategis -->
          <div class="p-4 bg-gray-100 rounded-lg flex items-start w-full">
            <img src="@/assets/svg/icon/location.svg" alt="Location Icon" class="h-16 w-16 mr-2" />
            <div>
              <h3 class="font-bold">Lokasinya strategis</h3>
              <p class="text-sm text-gray-600">
                Dekat tempat belanja, pelabuhan, dan restoran.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bagian Ulasan -->
      <div class="mt-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <h2 class="text-2xl font-semibold">Ulasan</h2>
            <div class="flex items-center pb-3">
              <span class="text-xl">{{ property.rating }}/5</span>
              <span class="text-gray-600 px-2"> ({{ property.reviews }} ulasan)</span>
            </div>
          </div>
          <!-- Link "Lihat semuanya" di sebelah kanan, warna biru -->
          <div class="mb-2">
            <a href="#" class="text-blue-600 hover:underline">Lihat semuanya..</a>
          </div>
        </div>

        <!-- Grid untuk ulasan -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div v-for="review in property.reviewsList" :key="review.id" class="bg-white p-4 shadow rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-bold">{{ review.user }}</h3>
                <p class="text-sm text-gray-600">{{ review.date }}</p>
              </div>
              <span class="text-lg font-bold">{{ review.rating }}/5</span>
            </div>
            <p class="mt-2 text-sm text-gray-800">{{ review.comment }}</p>
          </div>
        </div>
      </div>

      <!-- Detail tambahan, seperti fasilitas -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold">Fasilitas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <!-- Fasilitas kiri -->
          <div v-for="(offer, index) in property.offersLeft" :key="index" class="flex items-center space-x-4">
            <!-- <img :src="getIcon(offer)" class="w-10 h-10" alt="Icon" /> -->
            <span class="text-lg font-medium">{{ offer }}</span>
          </div>

          <!-- Fasilitas kanan -->
          <div v-for="(offer, index) in property.offersRight" :key="index" class="flex items-center space-x-4">
            <!-- <img :src="getIcon(offer)" class="w-10 h-10" alt="Icon" /> -->
            <span class="text-lg font-medium">{{ offer }}</span>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-2xl font-semibold">Lokasi</h2>
        <div id="map" class="mt-6 w-full h-[300px] md:h-[500px] md:w-[60%]"></div>
      </div>

      <!-- Kebijakan Akomodasi -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold">Kebijakan Akomodasi</h2>
        <div class="mt-4">
          <div class="mb-4 border-b pb-2">
            <h3 class="font-semibold text-lg flex items-center">
              <i class="mr-2">🕑</i> Prosedur Check-in
            </h3>
            <div class="flex text-gray-600 mt-1 gap-2 mx-8 md:mx-6">
              <p><strong>Check-in:</strong> 14:00 - 23:59</p>
              <p><strong>Check-out:</strong> 12:00</p>
            </div>
            <p class="text-sm text-gray-500 mt-1 mx-8 md:mx-6">
              Mau check in lebih awal? Kamu bisa isi Permintaan Khusus di halaman pemesanan.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="font-semibold text-lg">Kebijakan Lainnya</h3>
            <ul class="mt-2 space-y-2 mx-6">
              <li><strong>Anak:</strong> Tamu umur berapa pun bisa menginap di sini. Anak-anak 4 tahun ke atas dianggap
                sebagai tamu dewasa.</li>
              <li><strong>Deposit:</strong> Tamu perlu membayar deposit saat check-in.</li>
              <li><strong>Umur:</strong> Tamu umur berapa pun bisa menginap di sini.</li>
              <li><strong>Sarapan:</strong> Sarapan tersedia pukul 00:00 - 12:00 waktu lokal.</li>
              <li><strong>Hewan peliharaan:</strong> Tidak diperbolehkan membawa hewan peliharaan.</li>
              <li><strong>Merokok:</strong> Tamu diperbolehkan merokok.</li>
              <li><strong>Alkohol:</strong> Minuman beralkohol tidak diperbolehkan.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tentang Palm Garden Guest House -->
      <div class="mt-8">
        <h2 class="text-2xl font-semibold">Tentang {{ property.title }}</h2>
        <div class="mt-4">
          <p><strong>Lokasi:</strong> {{ property.title }} adalah akomodasi di lokasi yang baik, tepatnya
            berada di Samarinda Ulu.</p>
          <p>Selain letaknya yang strategis, Palm Garden Guesthouse Samarinda juga merupakan akomodasi dekat Plaza Mulia
            berjarak sekitar 0,42 km dan Stadion GOR Segiri berjarak sekitar 0,64 km.</p>
          <a href="#" class="text-blue-500 font-semibold">Selengkapnya</a>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-2xl font-semibold">Pertanyaan yang Sering Diajukan</h2>
        <div class="mt-4 space-y-2">
          <!-- Pertanyaan pertama -->
          <div @click="toggleQuestion(1)"
            class="border-t border-b py-4 pr-2 cursor-pointer flex justify-between items-center">
            <span>Di mana alamat Palm Garden Guest House?</span>
            <span>{{ activeQuestion === 1 ? '▲' : '▼' }}</span> <!-- Icon untuk expand/collapse -->
          </div>
          <div v-if="activeQuestion === 1" class="p-4 bg-gray-100">
            Alamatnya di Samarinda Ulu, dekat Plaza Mulia.
          </div>

          <!-- Pertanyaan kedua -->
          <div @click="toggleQuestion(2)"
            class="border-t border-b py-4 pr-2 cursor-pointer flex justify-between items-center">
            <span>Pukul berapa waktu check-in & check-out di Palm Garden Guest House?</span>
            <span>{{ activeQuestion === 2 ? '▲' : '▼' }}</span>
          </div>
          <div v-if="activeQuestion === 2" class="p-4 bg-gray-100">
            Check-in: 14:00 - 23:59, Check-out: 12:00.
          </div>

          <!-- Pertanyaan ketiga -->
          <div @click="toggleQuestion(3)"
            class="border-t border-b py-4 pr-2 cursor-pointer flex justify-between items-center">
            <span>Apa saja fasilitas yang tersedia di Palm Garden Guest House?</span>
            <span>{{ activeQuestion === 3 ? '▲' : '▼' }}</span>
          </div>
          <div v-if="activeQuestion === 3" class="p-4 bg-gray-100">
            Fasilitasnya antara lain WiFi, Parkir, dan Sarapan.
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-2xl font-semibold">Cek pilihan lainnya</h2>
        <div class="flex overflow-x-auto space-x-4 px-2">
          <PropertyCard v-for="property in properties" :key="property.id" :image="property.image"
            :title="property.title" :location="property.location" :price="property.price" :rating="property.rating"
            :reviews="property.reviews" :isInitiallyFavorited="property.isFavorited" :loading="isLoading"
            class="min-w-[300px] cursor-pointer mb-4" @click="goToDetail(property.id)" />
        </div>
      </div>

      <!-- Modal Popup untuk gambar -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" @click="closeModal">
        <div class="relative w-3/4" @click.stop>
          <img :src="currentImage" class="w-full h-auto max-h-screen object-contain" />
          <button @click="closeModal" class="absolute top-2 right-2 bg-white text-black p-2 rounded-full">Close</button>
        </div>
      </div>
    </div>
    <div v-else class="container mx-auto p-4">

      <div class="flex flex-col md:flex-row justify-between">
        <!-- Skeleton untuk gambar besar -->
        <div class="w-full md:w-1/2">
          <Skeleton :loading="loadingDetail" height="400px" />
        </div>

        <!-- Bagian kanan: judul, harga, dll -->
        <div class="w-full md:w-1/2 sm:mt-4 pl-4">
          <!-- Skeleton untuk judul -->
          <Skeleton :loading="loadingDetail" width="75%" height="40px" />
          <!-- Skeleton untuk lokasi -->
          <Skeleton :loading="loadingDetail" width="20%" height="20px" class="mt-2" />

          <!-- Skeleton untuk harga dan diskon -->
          <div class="flex items-center mt-4 space-x-4">
            <Skeleton :loading="loadingDetail" width="30%" height="30px" />
            <Skeleton :loading="loadingDetail" width="20%" height="30px" />
          </div>

          <!-- Skeleton untuk user info -->
          <Skeleton :loading="loadingDetail" width="100%" height="80px" class="mt-4" />

          <!-- Skeleton untuk tombol -->
          <Skeleton :loading="loadingDetail" width="150px" height="40px" class="mt-4" />
        </div>
      </div>

      <!-- Skeleton untuk ulasan dan fasilitas -->
      <div class="mt-8">
        <Skeleton :loading="loadingDetail" width="100%" height="20px" />
        <div class="grid grid-cols-3 gap-4 mt-4">
          <Skeleton v-for="i in 3" :key="i" :loading="loadingDetail" class="w-full h-[100px] rounded-lg" />
        </div>
      </div>

      <!-- Skeleton untuk fasilitas tambahan -->
      <div class="mt-8">
        <Skeleton :loading="loadingDetail" width="100%" height="20px" />
        <div class="grid grid-cols-2 gap-6 mt-4">
          <Skeleton v-for="i in 4" :key="i" :loading="loadingDetail" class="w-full h-[40px]" />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import L from 'leaflet';
import { useHead } from '@vueuse/head';
import PropertiesData from '@/assets/js/Properties.json';
import { Skeleton } from '@brayamvalero/vue3-skeleton';

export default {
  name: 'PropertyDetail',
  components: { DefaultLayout, Skeleton },
  data() {
    return {
      activeQuestion: null, // Untuk melacak pertanyaan yang sedang dibuka
      property: {
        id: 1,
        image: [
          'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?q=80&w=2534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1729180253305-23990aee8705?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

        ],
        title: 'Modern Apartment in City Center',
        location: 'San Francisco, CA',
        price: '12.499.000',
        rating: 4.9,
        reviews: 120,
        isFavorited: false,
        latitude: 37.7749,
        longitude: -122.4194,
        discount: 10,
        user: {
          name: 'Panomsak',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          hostingDuration: '1 year hosting',
        },
        reviewsList: [
          { id: 1, user: 'Asep', date: '19 Okt 2024', rating: 5.0, comment: 'bagus, nyaman!' },
          { id: 2, user: 'Tini', date: '18 Okt 2024', rating: 5.0, comment: 'Lokasi bagus, pelayanan mantap' },
          { id: 3, user: 'Tono', date: '18 Okt 2024', rating: 5.0, comment: 'Lokasi bagus, pelayanan mantap' },
        ],
        offersLeft: ['Garden view', 'WiFi', 'Pets allowed', 'Free washer'],
        offersRight: ['Kitchen', 'Free driveway parking', '55 inch HDTV', 'Security cameras']
      },
      isModalOpen: false,
      currentImage: null,
      isLoading: true, // Status loading awal
      loadingDetail: true,
      properties: Array.from({ length: 10 }, (_, index) => ({
        id: `skeleton-${index}`,
        image: [],
        title: '',
        location: '',
        price: '',
        rating: '',
        reviews: '',
        isFavorited: false,
      })),
    };
  },
  created() {
    // Simulasi pengambilan data
    setTimeout(() => {
      // Ambil atau tetapkan data properties Anda di sini
      this.properties = PropertiesData;
      this.isLoading = false; // Data telah dimuat
      this.loadingDetail = false; // Data telah dimuat
    }, 1000); // Delay simulasi
  },
  methods: {
    handleBooking() {
      // Simulate login state and order data
      const isLoggedIn = false; // Assume this comes from a store or auth state
      const orderData = this.property; // Assuming this is the property to be booked

      if (!orderData) {
        // Jika data pesanan tidak ada
        alert("Access Denied: No booking data available.");
        return;
      }

      if (!isLoggedIn) {
        // Jika belum login, arahkan ke halaman payment dan minta pengguna mengisi detail
        this.$router.push({
          name: "Payment",
          query: {
            requiresDetails: true, // Indikasi bahwa user harus mengisi detail
            id: this.property.id, // Mengirim data properti yang dipilih
          },
        });
      } else {
        // Jika sudah login, arahkan ke halaman payment dengan data pesanan
        this.$router.push({
          name: "Payment",
          query: {
            id: this.property.id, // Mengirim data properti yang dipilih
          },
        });
      }
    },
    toggleQuestion(questionNumber) {
      // Jika pertanyaan yang sama diklik, collapse; jika tidak, expand
      this.activeQuestion = this.activeQuestion === questionNumber ? null : questionNumber;
    },
    initMap() {
      // Pastikan elemen dengan id="map" ada
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        // Coba ulang inisialisasi map setelah 500ms jika elemen map belum ditemukan
        setTimeout(this.initMap, 500);
        return;
      }

      const map = L.map('map').setView([this.property.latitude, this.property.longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    },
    showModal(image) {
      this.currentImage = image;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentImage = null;
    },
    // getIcon(offer) {
    //   switch (offer) {
    //     case 'WiFi':
    //       return require('@/assets/svg/icon/wifi.svg');
    //     case 'Garden view':
    //       return require('@/assets/svg/icon/garden.svg');
    //     case 'Pets allowed':
    //       return require('@/assets/svg/icon/pets.svg');
    //     case 'Free washer':
    //       return require('@/assets/svg/icon/washer.svg');
    //     case 'Kitchen':
    //       return require('@/assets/svg/icon/kitchen.svg');
    //     case 'Parking':
    //       return require('@/assets/svg/icon/parking.svg');
    //     case '55 inch HDTV':
    //       return require('@/assets/svg/icon/tv.svg');
    //     case 'Security cameras':
    //       return require('@/assets/svg/icon/security.svg');
    //     default:
    //       return require('@/assets/svg/icon/error.svg'); // Default icon if none found
    //   }
    // }
  },
  watch: {
    loadingDetail(newVal) {
      if (!newVal) {
        this.initMap();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.loadingDetail) {
        this.initMap();
      }
    });
    useHead({
      title: this.property.title + ' - Detail Properti',
      meta: [
        {
          name: 'description',
          content: this.property.description
        },
        {
          property: 'og:title',
          content: this.property.title + ' - Detail Properti'
        },
        {
          property: 'og:description',
          content: this.property.description
        },
        {
          property: 'og:url',
          content: window.location.href
        }
      ]
    });
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

/* Style untuk modal popup */
.fixed {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.75);
}

img {
  max-width: 100%;
  height: auto;
}

.grid img {
  object-fit: cover;
}

h2 {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  padding-left: 1rem;
  position: relative;
}

ul li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #1f2937;
  /* Tailwind's gray-900 */
}
</style>