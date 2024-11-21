// import BaseButton from './BaseButton.vue';
// import BaseInput from './BaseInput.vue';
// import BaseSelect from './BaseSelect.vue';
// import BaseDatePicker from './BaseDatePicker.vue';
// import BaseDateRangePicker from './BaseDateRangePicker.vue';
// import BaseDate from './BaseDate.vue';
// import BaseSelectIcon from './BaseSelectIcon.vue';
// import BaseSelectPhone from './BaseSelectPhone.vue';
// import BaseSelector from './BaseSelector.vue';
// import BaseSelectorBlack from './BaseSelectorBlack.vue';
// import BaseFavorite from './BaseFavorite.vue';
// import BaseCheckBoxBudget from './BaseCheckBoxBudget.vue';
// import BaseSlider from "./BaseSlider.vue";

// export default {
//   install(app) {
//     app.component('BaseButton', BaseButton);
//     app.component('BaseInput', BaseInput);
//     app.component('BaseSelect', BaseSelect);
//     app.component('BaseDatePicker', BaseDatePicker);
//     app.component('BaseDateRangePicker', BaseDateRangePicker);
//     app.component('BaseDate', BaseDate);
//     app.component('BaseSelectIcon', BaseSelectIcon);
//     app.component('BaseSelector', BaseSelector);
//     app.component('BaseSelectorBlack', BaseSelectorBlack);
//     app.component('BaseFavorite', BaseFavorite);
//     app.component('BaseCheckBoxBudget', BaseCheckBoxBudget);
//     app.component("BaseSlider", BaseSlider);
//     app.component("BaseSelectPhone", BaseSelectPhone);

//   },
// };

export default {
  install(app) {
    // Menggunakan require.context untuk mengimpor semua file .vue di folder `components/base`
    const requireComponent = require.context(
      // Path relatif ke folder komponen
      './',
      // Cari subdirektori
      false,
      // Hanya ambil file yang berakhiran .vue
      /\.vue$/
    );

    // Loop setiap komponen yang ditemukan oleh require.context
    requireComponent.keys().forEach((fileName) => {
      // Ambil konfigurasi komponen
      const componentConfig = requireComponent(fileName);

      // Dapatkan nama komponen dari nama file
      const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');

      // Daftarkan komponen ke Vue
      app.component(componentName, componentConfig.default || componentConfig);
    });
  },
};

