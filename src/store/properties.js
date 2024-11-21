// store/modules/properties.js
import PropertiesData from '@/assets/js/Properties.json';

export default {
  namespaced: true,
  state: () => ({
    properties: [],
    displayedProperties: [],
    isLoading: true,
    loadCount: 10,
    selectedBudgets: { // Menambahkan state untuk pilihan budget
      economy: false,
      popular: false,
      luxury: false,
    },
  }),
  mutations: {
    setProperties(state, properties) {
      state.properties = properties;
      state.displayedProperties = properties.slice(0, state.loadCount);
      state.isLoading = false;
    },
    loadMoreProperties(state) {
      const newCount = state.displayedProperties.length + 2;
      state.displayedProperties = state.properties.slice(0, newCount);
    },
    toggleBudgetSelection(state, budgetType) { // Mutation untuk toggle selection
      // Perbaikan di sini
      if (Object.prototype.hasOwnProperty.call(state.selectedBudgets, budgetType)) {
        state.selectedBudgets[budgetType] = !state.selectedBudgets[budgetType];
      }
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    fetchProperties({ commit }) {
      commit('setLoading', true);
      setTimeout(() => {
        commit('setProperties', PropertiesData);
      }, 1000);
    },
    loadMore({ commit }) {
      commit('loadMoreProperties');
    },
    toggleBudgetSelection({ commit }, budgetType) { // Action untuk toggle selection
      commit('toggleBudgetSelection', budgetType);
    },
    applyBudgetFilter({ commit, state }, filterData) {
      // Implementasi filter sesuai kebutuhan Anda
      // Misalnya, filter state.properties dan mengubah state.displayedProperties
      const { location, priceMin, priceMax, budgetOptions } = filterData;
      let filtered = state.properties;

      if (location) {
        filtered = filtered.filter(prop => prop.location === location);
      }

      if (priceMin) {
        filtered = filtered.filter(prop => prop.price >= Number(priceMin));
      }

      if (priceMax) {
        filtered = filtered.filter(prop => prop.price <= Number(priceMax));
      }

      if (budgetOptions) {
        if (budgetOptions.economy) {
          filtered = filtered.filter(prop => prop.price < 4500000);
        }
        if (budgetOptions.popular) {
          filtered = filtered.filter(prop => prop.price >= 4500000 && prop.price <= 7000000);
        }
        if (budgetOptions.luxury) {
          filtered = filtered.filter(prop => prop.price > 7000000);
        }
      }

      commit('setProperties', filtered);
    },
  },
  getters: {
    locations(state) {
      const locationsSet = new Set(state.properties.map(prop => prop.location));
      return Array.from(locationsSet).map(loc => ({
        label: loc,
        value: loc,
      }));
    },
    isLoading(state) {
      return state.isLoading;
    },
    selectedBudgets(state) { // Getter untuk selectedBudgets
      return state.selectedBudgets;
    },
    // Getter lainnya jika diperlukan
  },
};
