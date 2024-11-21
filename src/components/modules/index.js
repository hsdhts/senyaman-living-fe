// import PropertyCard from './PropertyCard.vue';
// import UserMenu from './UserMenu.vue';
// import SearchBar from './SearchBar.vue';
// import ChangeLanguage from './ChangeLanguage.vue';
// import AppSidebar from './Sidebar.vue';
// import LoadingScreen from './LoadingScreen.vue';
// import PaymentSummaryModal from './PaymentSummaryModal.vue';
// import ReservationSummary from './ReservationSummary.vue';
// import ForgotPassword from './ForgotPassword.vue';
// import ChangePhoneNumber from './ChangePhoneNumber.vue';
// import ChangeEmail from './ChangeEmail.vue';
// import VerificationOTP from './VerificationOTP.vue';
// import ViewPinModal from './ViewPinModal.vue';

// export default {
//     PropertyCard,
//     UserMenu,
//     SearchBar,
//     ChangeLanguage,
//     AppSidebar,
//     LoadingScreen,
//     PaymentSummaryModal,
//     ReservationSummary,
//     ForgotPassword,
//     ChangePhoneNumber,
//     ChangeEmail,
//     VerificationOTP,
//     ViewPinModal
// };


const modules = {};

// Mengimpor semua file .vue dari folder yang sama
const requireModule = require.context('./', false, /\.vue$/);

requireModule.keys().forEach((fileName) => {
  // Ekstrak nama komponen dari nama file
  const name = fileName.replace(/^\.\/(.*)\.vue$/, '$1');

  console.log(`Registering component: ${name}`);

  // Tambahkan ke dalam object modules
  modules[name] = requireModule(fileName).default;
});

export default modules;
