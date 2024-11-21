import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// Define your routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'), // Lazy loading
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'), // Lazy loading
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'), // Lazy loading
  },
  {
    path: '/property/:id',
    name: 'PropertyDetail',
    component: () => import('@/views/PropertyDetail.vue'), // Lazy loading
    props: true, // Pass route params as props
    // meta: { requiresAuth: true }, // Example for protected route
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/views/Payment.vue'), // Lazy loading
    // meta: { requiresAuth: true }, // Example for protected route
  },
  {
    path: '/PaymentSuccess',
    name: 'PaymentSuccess',
    component: () => import('@/views/PaymentSuccess.vue'), // Lazy loading
    // meta: { requiresAuth: true }, // Example for protected route
    // Navigasi guard di level route
    // beforeEnter: (to, from, next) => {
    //   // Cek apakah pembayaran sukses dari store
    //   if (store.paymentSuccess) {
    //     next();  // Jika pembayaran sukses, lanjutkan
    //   } else {
    //     next('/404');  // Jika tidak, redirect ke halaman 404
    //   }
    // }
  },
  {
    path: '/area',
    name: 'Area',
    component: () => import('@/views/MapArea.vue'), // Lazy loading
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true },
    redirect: '/dashboard/profile', // Tambahkan redirect ke child route
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
        menu: true,
        icon: 'mdi:plus'
      },
      {
        path: 'ongoing',
        name: 'Ongoing Order',
        component: () => import('@/views/OnGoingOrder.vue'),
        menu: true,
        icon: 'mdi:plus'
      },
      {
        path: 'orderhistory',
        name: 'Order History',
        component: () => import('@/views/BookingHistory.vue'),
        menu: true,
        icon: 'mdi:plus'
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/:catchAll(.*)', // Catch-all route for 404 errors
    redirect: '/404',
  }
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Example navigation guard (optional)
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['user/isAuthenticated']; // Ambil status autentikasi dari store
  
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // Jika route memerlukan autentikasi dan user belum login
    next({ name: 'Login', query: { redirect: to.fullPath } }); // Redirect ke login dengan query string
  } else {
    next(); // Lanjutkan ke route berikutnya
  }
});

export default router;