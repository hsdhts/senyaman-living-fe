<template>
  <DefaultLayout>
    <div class="bg-grey-100 w-full">
      <div class="container mx-auto p-4">
        <div class="flex flex-col md:flex-row gap-4">

          <!-- Column Kiri: Detail Properti -->
          <div class="w-full md:w-2/3 space-y-8">
            <!-- Bagian Gambar Properti -->
            <div>
              <img :src="property.mainImage" class="w-full h-80 md:h-96 object-cover rounded-lg mb-4"
                alt="Main Property Image" @click="showModal(property.mainImage)" />
              <div class="flex space-x-2 overflow-x-auto pb-3">
                <img v-for="(img, index) in property.otherImages" :key="index" :src="img"
                  class="h-20 w-20 object-cover rounded cursor-pointer" @click="showModal(img)" />
              </div>
            </div>

            <!-- Nama Properti, Harga, dan Rating -->
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-2xl font-semibold">{{ property.title }}</h1>
                <p class="text-gray-600">{{ property.location }} - {{ property.name }}</p>
                <div class="flex items-center text-yellow-500 mt-2">
                  <AppIcon icon="mdi:star" class="w-5 h-5 mr-1" />
                  <span class="font-medium">{{ property.rating }} ({{ property.reviews }} reviews)</span>
                </div>
                <p class="text-gray-500">{{ property.address }}</p>
              </div>
              <div class="text-right" style="line-height: 2.3rem;">
                <span class="text-xl font-bold">{{ property.price }} / night</span>
                <div class="flex justify-end space-x-2 mt-2">
                  <button class="flex items-center justify-center shadow bg-gray-100 p-2 rounded-full">
                    <AppIcon icon="mdi:share-variant" class="w-5 h-5 text-gray-600" />
                  </button>
                  <button class="flex items-center justify-center shadow bg-gray-100 p-2 rounded-full">
                    <AppIcon icon="mdi:heart" class="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Detail Host -->
            <div class="flex flex-col gap-2">
              <h2 class="text-md font-semibold">Host Detail</h2>
              <div class="flex items-center border border-gray-200 rounded-lg p-4 shadow-sm">
                <img src="https://via.placeholder.com/50" alt="Host Avatar" class="w-12 h-12 rounded-full mr-4">
                <div class="flex-1">
                  <p class="font-semibold text-gray-800">Host Name</p>
                </div>
                <a href="#"
                  class="flex items-center justify-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition">
                  <AppIcon icon="mdi:phone" class="mr-2 w-4 h-4" /> Contact Host
                </a>
              </div>
            </div>


            <!-- Room Facilities -->
            <div>
              <h2 class="text-2xl font-semibold mb-4">Room Facilities</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="facility in property.facilities" :key="facility" class="flex items-center space-x-2">
                  <AppIcon :icon="getFacilityIcon(facility.name)" class="text-gray-500" />
                  <span>{{ facility.name }}</span>
                </div>
              </div>
            </div>

            <!-- Additional Services -->
            <div>
              <h2 class="text-lg font-semibold mb-4">Additional in-room services</h2>
              <ul class="space-y-4">
                <li v-for="service in property.additionalServices" :key="service.name" class="border-b pb-2">
                  <div class="flex items-center gap-2">
                    <span class="font-medium">{{ service.name }}</span>
                    <span>-</span>
                    <span class="font-medium">{{ service.price }}</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">[Description]</p>
                </li>
              </ul>
              <button @click="showFacilitiesModal"
                class="mt-4 px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50">View
                more</button>
            </div>

            <!-- Modal Popup untuk Room Facilities -->
            <div v-if="isFacilitiesModalOpen"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" style="margin:0"
              @click.self="closeFacilitiesModal">
              <div class="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 relative">
                <button @click="closeFacilitiesModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                  <AppIcon icon="mdi:close" class="w-6 h-6" />
                </button>
                <h2 class="text-2xl font-semibold mb-4">Room Facilities</h2>
                <hr class="mb-4" />

                <!-- List of Facilities -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-for="facility in property.facilities" :key="facility.name" class="flex items-center space-x-2">
                    <AppIcon :icon="getFacilityIcon(facility.name)" class="text-gray-500 w-8 h-8" />
                    <div>
                      <p class="font-semibold">{{ facility.name }}</p>
                      <p class="text-sm text-gray-500">{{ facility.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- Additional Services -->
                <h2 class="text-xl font-semibold mt-6 mb-4">Additional Services</h2>
                <ul class="space-y-4">
                  <li v-for="service in property.additionalServices" :key="service.name" class="border-b pb-2">
                    <div class="flex items-center gap-2">
                      <span class="font-medium">{{ service.name }}</span>
                      <span>-</span>
                      <span class="font-medium">{{ service.price }}</span>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">[Description]</p>
                  </li>
                </ul>
              </div>
            </div>


            <!-- Reviews Section -->
            <div class="mt-8">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Ulasan <span class="text-yellow-500">⭐ 4.9 (90 reviews)</span></h2>
                <a href="#" class="text-blue-500" @click.prevent="openReviewsModal">See all</a>
              </div>

              <!-- Section Ulasan -->
              <div class="bg-gray-100 p-4 rounded-lg shadow mb-6">
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 px-4 w-full">
                  <!-- Item Kebersihan -->
                  <div class="flex flex-col items-left">
                    <p class="text-sm font-medium">Kebersihan</p>
                    <div class="flex items-left mt-2">
                      <AppIcon icon="mdi:star" class="w-7 h-7 text-gray-500 mr-1" />
                      <p class="text-xl font-semibold">4.9</p>
                    </div>
                  </div>

                  <!-- Item Lokasi -->
                  <div class="flex flex-col items-left">
                    <p class="text-sm font-medium">Lokasi</p>
                    <div class="flex items-left mt-2">
                      <AppIcon icon="mdi:map-marker-radius-outline" class="w-7 h-7 text-gray-500 mr-1" />
                      <p class="text-xl font-semibold">4.9</p>
                    </div>
                  </div>

                  <!-- Item Kepuasan -->
                  <div class="flex flex-col items-left">
                    <p class="text-sm font-medium">Kepuasan</p>
                    <div class="flex items-left mt-2">
                      <AppIcon icon="mdi:emoticon-happy" class="w-7 h-7 text-gray-500 mr-1" />
                      <p class="text-xl font-semibold">4.9</p>
                    </div>
                  </div>

                  <!-- Item Check-in/out -->
                  <div class="flex flex-col items-left">
                    <p class="text-sm font-medium">Check-in/out</p>
                    <div class="flex items-left mt-2">
                      <AppIcon icon="mdi:clock-outline" class="w-7 h-7 text-gray-500 mr-1" />
                      <p class="text-xl font-semibold">4.9</p>
                    </div>
                  </div>

                  <!-- Item Ekonomis -->
                  <div class="flex flex-col items-left">
                    <p class="text-sm font-medium">Ekonomis</p>
                    <div class="flex items-left mt-2">
                      <AppIcon icon="mdi:cash" class="w-7 h-7 text-gray-500 mr-1" />
                      <p class="text-xl font-semibold">4.9</p>
                    </div>
                  </div>

                  <!-- Item Staff -->
                  <div class="flex flex-col items-left">
                    <p class="text-sm font-medium">Staff</p>
                    <div class="flex items-left mt-2">
                      <AppIcon icon="mdi:account-group" class="w-7 h-7 text-gray-500 mr-1" />
                      <p class="text-xl font-semibold">4.9</p>
                    </div>
                  </div>
                </div>
              </div>


              <!-- Individual Reviews -->
              <div class="overflow-x-auto pb-4">
                <div class="flex space-x-4">
                  <div v-for="review in property.reviewsList" :key="review.id"
                    class="bg-white p-4 rounded-lg shadow w-[300px] min-w-[300px]">
                    <!-- Stars and Date -->
                    <div class="flex items-center mb-2">
                      <div class="flex items-center text-blue-500">
                        <!-- Star icons -->
                        <AppIcon v-for="i in 5" :key="i"
                          :icon="i <= Math.floor(review.rating) ? 'mdi:star' : (i - review.rating < 1 && i > review.rating ? 'mdi:star-half-full' : 'mdi:star-outline')"
                          :class="i <= review.rating ? 'text-blue-500' : 'text-blue-300'" class="w-4 h-4" />
                      </div>
                      <span class="text-gray-500 mx-2">•</span>
                      <span class="text-sm text-gray-500">{{ review.date }}</span>
                    </div>

                    <!-- User Name -->
                    <h3 class="font-semibold">{{ review.user }}</h3>

                    <!-- Comment Text -->
                    <p class="text-sm text-gray-700 mt-1">
                      {{ truncatedComment(review.comment) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reviews Summary & Individual Reviews di luar modal -->
            <!-- Anda bisa menambahkan ringkasan di sini jika perlu -->

            <!-- Modal Reviews -->
            <div v-if="isReviewsModalOpen"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" style="margin:0"
              @click.self="closeReviewsModal">
              <div class="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 relative">
                <!-- Tombol untuk menutup modal -->
                <button @click="closeReviewsModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                  <AppIcon icon="mdi:close" class="w-6 h-6" />
                </button>

                <!-- Judul Modal -->
                <h2 class="text-2xl font-semibold mb-4">Ulasan <span class="text-yellow-500">⭐ 4.9 (90 reviews)</span>
                </h2>
                <hr class="mb-4" />

                <!-- Konten Reviews Summary di dalam Modal -->
                <div class="flex flex-row justify-between gap-4 px-4 w-full mb-6 shadow rounded p-8">
                  <div class="flex flex-col items-left" v-for="(summary, index) in reviewsSummary" :key="index">
                    <p class="text-sm font-medium">{{ summary.title }}</p>
                    <div class="flex items-center mt-2">
                      <AppIcon :icon="summary.icon" class="w-7 h-7 text-gray-500 mr-1" />
                      <p class="text-xl font-semibold">{{ summary.score }}</p>
                    </div>
                  </div>
                </div>

                <!-- Individual Reviews -->
                <div class="overflow-y-auto max-h-96">
                  <div v-for="review in property.reviewsList" :key="review.id"
                    class="bg-white p-4 rounded-lg shadow mb-4">
                    <div class="flex items-center mb-2">
                      <div class="flex items-center text-blue-500">
                        <AppIcon v-for="i in 5" :key="i"
                          :icon="i <= Math.floor(review.rating) ? 'mdi:star' : (i - review.rating < 1 && i > review.rating ? 'mdi:star-half-full' : 'mdi:star-outline')"
                          :class="i <= review.rating ? 'text-blue-500' : 'text-blue-300'" class="w-4 h-4" />
                      </div>
                      <span class="text-gray-500 mx-2">•</span>
                      <span class="text-sm text-gray-500">{{ review.date }}</span>
                    </div>
                    <h3 class="font-semibold">{{ review.user }}</h3>
                    <p class="text-sm text-gray-700 mt-1">{{ truncatedComment(review.comment) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- About Property -->
            <div class="mt-8">
              <h3 class="text-lg font-semibold text-gray-500 mb-2">About Property</h3>
              <h2 class="text-2xl font-bold mb-2">[Nama Property]</h2>
              <p class="text-gray-700 mb-6 leading-relaxed">
                {{ truncatedDescription(property.description) }}
              </p>

              <!-- Property Facilities -->
              <h3 class="text-xl font-semibold mb-4">Property Facilities</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="facility in property.facilities" :key="facility.name" class="flex items-center space-x-4">
                  <AppIcon :icon="getFacilityIcon(facility.name)" class="text-gray-500 w-8 h-8" />
                  <div>
                    <p class="font-semibold">{{ facility.name }}</p>
                    <p class="text-sm text-gray-500">{{ facility.description }}</p>
                  </div>
                </div>
              </div>

              <!-- View More Button -->
              <div class="mt-4">
                <button class="text-blue-500 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50"
                  @click="openAboutPropertyModal">
                  View more
                </button>
              </div>
            </div>

            <!-- Modal About Property -->
            <div v-if="isAboutPropertyModalOpen"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" style="margin:0"
              @click.self="closeAboutPropertyModal">
              <div class="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 relative">
                <!-- Tombol untuk menutup modal -->
                <button @click="closeAboutPropertyModal"
                  class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                  <AppIcon icon="mdi:close" class="w-6 h-6" />
                </button>

                <!-- Konten Modal -->
                <h2 class="text-2xl font-bold mb-2">{{ property.name }}</h2>
                <hr class="mb-4" />
                <p class="text-gray-500 mb-6">{{ property.address }}</p>

                <h3 class="text-xl font-semibold mb-4">Facilities</h3>
                <div class="grid grid-cols-3 md:grid-cols-3 gap-4">
                  <div v-for="facility in property.facilities" :key="facility.name" class="flex items-center space-x-4">
                    <AppIcon :icon="getFacilityIcon(facility.name)" class="text-gray-500 w-8 h-8" />
                    <div>
                      <p class="font-semibold">{{ facility.name }}</p>
                      <p class="text-sm text-gray-500">{{ facility.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <!-- Lokasi Map  -->
            <div>
              <h2 class="text-2xl font-semibold mb-4">Lokasi</h2>
              <div class="map-container">
                <iframe :src="mapUrl" width="100%" height="450" style="border:0;" loading="lazy" allowfullscreen
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>

              </div>
            </div>

            <!-- Informasi Tambahan -->
            <div class="mt-8">
              <h2 class="text-2xl font-semibold mb-4">Informasi Tambahan</h2>
              <hr class="border-gray-300 mb-4" />

              <!-- Prosedur Check-in -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold">Prosedur Check-in</h3>
                <div class="flex text-gray-700 mt-2 gap-12">
                  <div>
                    <p class="text-sm font-medium">Check-in</p>
                    <p class="text-lg font-semibold">14:00 - 22:00</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium">Check-out</p>
                    <p class="text-lg font-semibold">12:00</p>
                  </div>
                </div>
              </div>

              <!-- Lainnya -->
              <div>
                <h3 class="text-lg font-semibold">Lainnya</h3>

                <!-- Anak -->
                <div class="mt-4">
                  <p class="font-semibold">Anak</p>
                  <ul class="list-disc list-inside text-gray-700">
                    <li>Tamu umur berapa pun bisa menginap di sini.</li>
                    <li>Anak-anak 17 tahun ke atas dianggap sebagai tamu dewasa.</li>
                    <li>Pastikan umur anak yang menginap sesuai dengan detail pemesanan. Jika berbeda, tamu mungkin akan
                      dikenakan biaya tambahan saat check-in.</li>
                  </ul>
                </div>

                <!-- Deposit -->
                <div class="mt-4">
                  <p class="font-semibold">Deposit</p>
                  <p class="text-gray-700">
                    Tamu tidak perlu membayar deposit saat check-in.
                  </p>
                </div>

                <!-- Umur -->
                <div class="mt-4">
                  <p class="font-semibold">Umur</p>
                  <p class="text-gray-700">
                    Tamu umur berapa pun bisa menginap di sini.
                  </p>
                </div>

                <!-- Hewan Peliharaan -->
                <div class="mt-4">
                  <p class="font-semibold">Hewan peliharaan</p>
                  <p class="text-gray-700">
                    Tidak diperbolehkan membawa hewan peliharaan.
                  </p>
                </div>
              </div>
            </div>

            <!-- FAQ -->
            <div class="mt-8">
              <h2 class="text-2xl font-semibold mb-4">FAQ</h2>
              <div class="space-y-2">

                <!-- Pertanyaan pertama -->
                <div @click="toggleQuestion(1)"
                  class="border-t border-b py-4 cursor-pointer flex justify-between items-center">
                  <span>Berapa kisaran harga kamar untuk menginap di Hozby Skyview Setiabudi Medan?</span>
                  <span>
                    <AppIcon :icon="activeQuestion === 1 ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                      class="text-gray-600" />
                  </span>
                </div>
                <div v-if="activeQuestion === 1" class="p-4 text-gray-500">
                  Harga termurah di Hozby Skyview Setiabudi Medan kalau kamu mau menginap hari ini adalah IDR 229.611.
                </div>

                <!-- Pertanyaan kedua -->
                <div @click="toggleQuestion(2)"
                  class="border-t border-b py-4 cursor-pointer flex justify-between items-center">
                  <span>Jenis kamar apa saja yang tersedia di Hozby Skyview Setiabudi Medan?</span>
                  <span>
                    <AppIcon :icon="activeQuestion === 2 ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                      class="text-gray-600" />
                  </span>
                </div>
                <div v-if="activeQuestion === 2" class="p-4 text-gray-500">
                  Kamar tersedia dalam berbagai tipe mulai dari single hingga suite untuk memenuhi kebutuhan tamu.
                </div>

                <!-- Pertanyaan ketiga -->
                <div @click="toggleQuestion(3)"
                  class="border-t border-b py-4 cursor-pointer flex justify-between items-center">
                  <span>Di mana alamat Hozby Skyview Setiabudi Medan?</span>
                  <span>
                    <AppIcon :icon="activeQuestion === 3 ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                      class="text-gray-600" />
                  </span>
                </div>
                <div v-if="activeQuestion === 3" class="p-4 text-gray-500">
                  Alamatnya terletak di pusat kota Medan, dekat dengan berbagai fasilitas umum dan wisata.
                </div>

                <!-- Pertanyaan keempat -->
                <div @click="toggleQuestion(4)"
                  class="border-t border-b py-4 cursor-pointer flex justify-between items-center">
                  <span>Pukul berapa waktu check-in & check-out di Hozby Skyview Setiabudi Medan?</span>
                  <span>
                    <AppIcon :icon="activeQuestion === 4 ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                      class="text-gray-600" />
                  </span>
                </div>
                <div v-if="activeQuestion === 4" class="p-4 text-gray-500">
                  Waktu check-in dimulai dari pukul 14:00 dan check-out sebelum pukul 12:00.
                </div>

                <!-- Pertanyaan kelima -->
                <div @click="toggleQuestion(5)"
                  class="border-t border-b py-4 cursor-pointer flex justify-between items-center">
                  <span>Apa saja fasilitas yang tersedia di Hozby Skyview Setiabudi Medan?</span>
                  <span>
                    <AppIcon :icon="activeQuestion === 5 ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                      class="text-gray-600" />
                  </span>
                </div>
                <div v-if="activeQuestion === 5" class="p-4 text-gray-500">
                  Fasilitasnya meliputi WiFi gratis, kolam renang, pusat kebugaran, dan sarapan gratis.
                </div>

              </div>
            </div>

            <!-- Rekomendasi Lainnya -->
            <div class="mt-8">
              <h2 class="text-2xl font-semibold">Cek pilihan lainnya</h2>
              <div class="flex overflow-x-auto space-x-4 px-2">
                <PropertyCard v-for="property in properties" :key="property.id" :image="property.image"
                  :title="property.title" :location="property.location" :price="property.price"
                  :rating="property.rating" :reviews="property.reviews" :isInitiallyFavorited="property.isFavorited"
                  :loading="isLoading" class="min-w-[300px] cursor-pointer mb-4" @click="goToDetail(property.id)" />
              </div>
            </div>
          </div>

          <div class="flex flex-col w-full gap-2">
            <!-- Column Kanan: Form Reservasi -->
            <div class="w-full p-3 bg-white rounded-lg shadow-lg" style="height: fit-content;">
              <h2 class="text-2xl font-semibold mb-4">Reserve now</h2>

              <!-- Toggle Harian/Bulanan -->
              <div class="flex mb-4">
                <button class="flex-1 py-2 font-semibold rounded-lg border text-center"
                  :class="{ 'bg-blue-500 text-white': isDaily, 'border-blue-500 text-blue-500': !isDaily }"
                  @click="isDaily = true">Harian</button>
                <button class="flex-1 py-2 font-semibold rounded-lg border text-center ml-2"
                  :class="{ 'bg-blue-500 text-white': !isDaily, 'border-blue-500 text-blue-500': isDaily }"
                  @click="isDaily = false">Bulanan</button>
              </div>

              <!-- Kolom Check-in dan Check-out -->
              <div class="flex flex-col justify-around md:flex-row items-center gap-2 md:col-span-2">
                <div class="flex flex-col gap-2 w-full">
                  <h2>{{ $t('checkIn') }}</h2>
                  <BaseDatePicker iconBack="mdi:calendar" v-model="checkInDate" :is-open="openDatePicker === 'checkIn'"
                    position="right" @open="openPicker('checkIn')" @close="closePicker"
                    @dateSelected="handleDatesSelected" class="w-full absolute z-50" />
                </div>

                <!-- Sembunyikan elemen ini di mobile, tampilkan di layar md ke atas -->
                <p class="hidden md:block mt-6">-</p>

                <div class="flex flex-col gap-2 w-full">
                  <h2>{{ $t('checkOut') }}</h2>
                  <BaseDatePicker iconBack="mdi:calendar" v-model="checkOutDate"
                    :is-open="openDatePicker === 'checkOut'" position="right" @open="openPicker('checkOut')"
                    @close="closePicker" @dateSelected="handleDatesSelected" class="w-full absolute z-50" />
                </div>
              </div>

              <!-- Field Durasi (Bulan) -->
              <div v-if="!isDaily" class="flex flex-col mt-4">
                <h2>Durasi (Bulan)</h2>
                <BaseInput type="number" v-model="duration" min="0" :placeholder="'1'" @input="validateDuration"
                  class="text-sm rounded-lg z-10" />
                <p v-if="durationInvalid" class="text-sm text-red-500 mt-1">Durasi tidak boleh kurang dari 1 bulan.</p>
              </div>

              <!-- Pilihan Tamu -->
              <div class="flex flex-col mt-4">
                <h2>{{ $t('guests') }}</h2>
                <BaseSelector iconFront="mdi:person" v-model="guests" :options="guestOptions"
                  class="md:col-span-2 custom-selector" />
              </div>

              <!-- Detail Harga -->
              <div class="border-t pt-4 space-y-2 text-sm">
                <div class="flex justify-between text-gray-700">
                  <span>IDR 1.300.000 × 2 nights</span>
                  <span>IDR 2.600.000</span>
                </div>
                <div class="flex justify-between text-gray-700">
                  <span>Service fee</span>
                  <span>IDR 130.000</span>
                </div>
                <hr class="my-2" />
                <div class="flex justify-between font-semibold">
                  <span>Total</span>
                  <span class="text-lg">IDR 2.730.000</span>
                </div>
              </div>
            </div>

            <!-- Tombol Reserve di Luar Card -->
            <button class="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-4">Reserve</button>
          </div>

        </div>
      </div>
    </div>

    <!-- Modal Popup untuk gambar -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      @click="closeModal">
      <div class="relative w-3/4" @click.stop>
        <img :src="currentImage" class="w-full h-auto max-h-screen object-contain" />
        <button @click="closeModal" class="absolute top-2 right-2 bg-white text-black p-2 rounded-full">Close</button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
import PropertiesData from '@/assets/js/Properties.json';

export default {
  name: "PropertyDetail",
  components: { DefaultLayout },
  data() {
    return {
      mapUrl: "https://www.google.com/maps?q=3.594417,98.685667&hl=id;z=14&output=embed",
      isModalOpen: false,
      openDatePicker: null, // 'checkIn', 'checkOut', or null
      checkInDate: null, // Initialized as Date
      checkOutDate: null, // Initialized as Date
      isDaily: true, // untuk toggle Harian/Bulanan
      currentImage: null,
      duration: 1, // Default durasi
      durationInvalid: false, // Status validasi untuk durasi
      isFacilitiesModalOpen: false, // Status modal
      isReviewsModalOpen: false,  // Kontrol modal untuk Reviews
      isAboutPropertyModalOpen: false,
      activeQuestion: null,
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
      property: {
        title: "Modern Apartment in City Center",
        description:
          "Lorem ipsum dolor sit amet consectetur. Suspendisse sed etiam vulputate eget morbi dictum quam. Feugiat ac sit tempor magna nulla mattis. Quis tortor orci enim tellus in. Tempus quis faucibus nulla sollicitudin est amet consequat aliquam. Quis tortor orci enim tellus in. Tempus quis lorenzo",
        name: "[Nama Property]",
        location: "San Francisco, CA",
        address: "Jln Medan No 8823",
        price: "IDR 1.299.999",
        rating: 4.9,
        reviews: 90,
        mainImage: "https://via.placeholder.com/600x400",
        otherImages: [
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
          "https://via.placeholder.com/80x80",
        ],
        host: {
          name: "Host Name",
          avatar: "https://via.placeholder.com/50"
        },
        facilities: [
          { name: "WiFi", description: "High-speed internet access" },
          { name: "Parking", description: "Free parking space available" },
          { name: "Swimming Pool", description: "Outdoor pool open from 8am to 8pm" },
          { name: "Gym", description: "24/7 access with your room key" },
          { name: "Air Conditioning", description: "Individual controls in each room" },
          { name: "TV", description: "Flat-screen TV with streaming options" },
        ],
        additionalServices: [
          { name: "Multipurpose table", price: "IDR 99.000" },
          { name: "Extra chair", price: "IDR 50.000" },
          { name: "Extra Bed", price: "IDR 199.000" },
        ],
        reviewsList: [
          {
            id: 1,
            user: "Customer Name",
            date: "20 Nov 2024",
            rating: 2.0,
            comment: "Excellent stay, very comfortable! The room was spacious and well-equipped. Would definitely come back."
          },
          {
            id: 2,
            user: "Customer Name",
            date: "19 Nov 2024",
            rating: 1.5,
            comment: "Great location and friendly staff! The check-in process was smooth, and the amenities exceeded my expectations. A perfect choice for a weekend getaway."
          },
          {
            id: 3,
            user: "Customer Name",
            date: "18 Nov 2024",
            rating: 4.7,
            comment: "Very clean and cozy place to stay. The location is superb and close to many attractions. Only downside was the breakfast options, but overall very satisfied."
          },
          {
            id: 4,
            user: "Customer Name",
            date: "17 Nov 2024",
            rating: 5,
            comment: "Amazing hospitality! The host went above and beyond to make sure we had everything we needed. The room was spotless and very comfortable."
          },
          {
            id: 5,
            user: "Customer Name",
            date: "16 Nov 2024",
            rating: 4.5,
            comment: "Lovely atmosphere with a great view from the balcony. Room was clean and had all essentials. Only minor issue was the Wi-Fi, but it wasn't a big deal for us."
          },
          {
            id: 6,
            user: "Customer Name",
            date: "15 Nov 2024",
            rating: 4.8,
            comment: "A perfect stay! I loved the location, as it was close to everything. The room decor was modern and comfortable. Will definitely recommend to friends and family!"
          },
          {
            id: 7,
            user: "Customer Name",
            date: "14 Nov 2024",
            rating: 4.9,
            comment: "Fantastic experience. The staff was friendly, and the facilities were well-maintained. A bit pricey, but worth every penny for the quality."
          },
          {
            id: 8,
            user: "Customer Name",
            date: "13 Nov 2024",
            rating: 5,
            comment: "Unforgettable stay! The location was ideal, and everything was exceptionally clean. The bed was super comfortable, and we felt at home."
          },
          {
            id: 9,
            user: "Customer Name",
            date: "12 Nov 2024",
            rating: 4.6,
            comment: "Good value for money. Clean, quiet, and comfortable. Only suggestion is to improve breakfast variety. Other than that, we had a lovely time."
          },
          {
            id: 10,
            user: "Customer Name",
            date: "11 Nov 2024",
            rating: 2.0,
            comment: "Spacious and beautifully decorated room. The staff was very attentive, and the neighborhood was charming. Highly recommend this property!"
          }
        ],
      },
      guests: {
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0
      },
      reviewsSummary: [
        { title: "Kebersihan", score: 4.9, icon: "mdi:star" },
        { title: "Lokasi", score: 4.9, icon: "mdi:map-marker-radius-outline" },
        { title: "Kepuasan", score: 4.9, icon: "mdi:emoticon-happy" },
        { title: "Check-in/out", score: 4.9, icon: "mdi:clock-outline" },
        { title: "Ekonomis", score: 4.9, icon: "mdi:cash" },
        { title: "Staff", score: 4.9, icon: "mdi:account-group" }
      ]
    };
  },
  computed: {
    guestOptions() {
      return [
        { label: 'Adults', count: this.guests.adults || 0 },
        { label: 'Children', count: this.guests.children || 0 },
        { label: 'Infants', count: this.guests.infants || 0 },
        { label: 'Pets', count: this.guests.pets || 0 }
      ];
    }
  },
  watch: {
    duration() { // Menghapus newVal
      if (!this.isDaily && this.duration > 0) {
        if (!this.checkInDate) {
          this.checkInDate = new Date(); // Set ke tanggal hari ini
        }
        this.updateCheckoutDate();
      }
    },
    checkInDate() { // Menghapus newVal
      if (!this.isDaily && this.duration > 0) {
        this.updateCheckoutDate();
      }
    }
  },
  created() {
    // Simulasi pengambilan data
    setTimeout(() => {
      // Ambil atau tetapkan data properties Anda di sini
      this.properties = PropertiesData;
    }, 1000); // Delay simulasi
  },
  methods: {
    truncatedComment(comment) {
      // Memotong teks jika lebih dari 200 karakter dan menambahkan "..."
      return comment.length > 100 ? comment.slice(0, 100) + '...' : comment;
    },
    truncatedDescription(description) {
      // Memotong deskripsi jika lebih dari 200 karakter
      return description.length > 200 ? description.slice(0, 200) + "..." : description;
    },
    toggleQuestion(questionNumber) {
      this.activeQuestion = this.activeQuestion === questionNumber ? null : questionNumber;
    },
    showModal(image) {
      this.currentImage = image;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentImage = null;
    },
    showFacilitiesModal() {
      this.isFacilitiesModalOpen = true;
    },
    closeFacilitiesModal() {
      this.isFacilitiesModalOpen = false;
    },
    openReviewsModal() {
      this.isReviewsModalOpen = true;
    },
    closeReviewsModal() {
      this.isReviewsModalOpen = false;
    },
    openAboutPropertyModal() {
      this.isAboutPropertyModalOpen = true;
    },
    closeAboutPropertyModal() {
      this.isAboutPropertyModalOpen = false;
    },
    getFacilityIcon(facilityName) {
      switch (facilityName) {
        case "WiFi":
          return "mdi:wifi";
        case "Parking":
          return "mdi:car";
        case "Swimming Pool":
          return "mdi:pool";
        case "Gym":
          return "mdi:weight-lifter";
        case "Air Conditioning":
          return "mdi:air-conditioner";
        case "TV":
          return "mdi:television";
        default:
          return "mdi:help-circle"; // Ikon default jika tidak ditemukan
      }
    },
    openPicker(picker) {
      this.closeAllPopups(); // Pastikan semua tertutup sebelum membuka yang baru
      this.openDatePicker = picker;
    },
    closePicker() {
      this.openDatePicker = null;
    },
    validateDuration() {
      // Pastikan durasi tidak boleh kurang dari 1
      if (this.duration < 0) {
        this.durationInvalid = true;
        this.duration = 0; // Reset ke 1 jika nilainya kurang dari 1
      } else {
        this.durationInvalid = false;
      }
    },
    updateCheckoutDate() {
      if (this.checkInDate && this.duration > 0) {
        // Menghitung checkout berdasarkan checkInDate + duration (bulan)
        const checkout = new Date(this.checkInDate);
        checkout.setMonth(checkout.getMonth() + this.duration); // Tambah bulan sesuai dengan durasi
        this.checkOutDate = checkout;
      }
    },
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

/* Style untuk memastikan modal muncul di tengah */
.fixed {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: rgba(0, 0, 0, 0.75);
}

.map-container {
  width: 100%;
  height: 450px;
  overflow: hidden;
  border-radius: 8px;
}

.custom-selector {
  z-index: auto !important;
}
</style>
