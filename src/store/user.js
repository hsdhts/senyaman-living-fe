import { API_URL } from "@/mainconfig"; // Impor instance API_URL dari mainconfig.js
import router from "@/router"; // Pastikan Anda mengimpor instance router
import { getResponseMessage } from "@/utils/responseMapping";
import i18n from "@/plugins/LanguageComponent.js";

const state = {
    token: null,
    error: null,
    errorKey: null,
    errorMessage: null, // Tambahkan ini
    loading: false,
    user: null,
    isAuthenticated: false,
    verificationIssues: [],
};

const getters = {
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    isAuthenticated: (state) => state.isAuthenticated,
    verificationIssues: (state) => state.verificationIssues,
};

const actions = {
    async sendOTP({ commit }, payload) {
        commit("setLoading", true);
        try {
            const response = await API_URL.post("/user/sendOTP", payload);
            commit("setError", null);
            return response;
        } catch (error) {
            commit("setError", error.response?.data?.message || "An error occurred during OTP sending.");
            throw error;
        } finally {
            commit("setLoading", false);
        }
    },

    async register({ commit }, payload) {
        commit("setLoading", true);
        try {
            const response = await API_URL.post("/user/register", payload);
            commit("setError", null);
            return response;
        } catch (error) {
            commit("setError", error.response?.data?.message || "An error occurred during registration.");
            throw error;
        } finally {
            commit("setLoading", false);
        }
    },

    async login({ commit }, payload) {
        commit("setLoading", true);
        try {
            const response = await API_URL.post("/user/login", payload);
            console.log("responseLogin", response);
            commit("setToken", response.data);

            commit("setError", null);

            return response;
        } catch (error) {
            const { status, data } = error.response || {};
            const errorKey = getResponseMessage(status, data?.code);
            commit("setError", errorKey || "errors.defaultError"); // Kirim errorKey ke mutation
            throw error;
        } finally {

            commit("setLoading", false);
        }
    },

    async logout({ commit }) {
        commit("setToken", null);
        commit("setUser", null);
        commit("setAuthenticated", false);
        localStorage.removeItem("token");
        delete API_URL.defaults.headers.common["Authorization"];

        router.push({ name: 'Home' }); // Redirect ke halaman utama
    },

    async fetchUser({ commit, state }) {
        commit("setLoading", true);
        try {
            const response = await API_URL.get("/user/me", {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                },
            });
            commit("setUser", response.data);
            commit("setError", null);
            return response.data;
        } catch (error) {
            commit("setError", error.response?.data?.message || "An error occurred while fetching user data.");
            throw error;
        } finally {
            commit("setLoading", false);
        }
    },

    async resetPassword({ commit }, payload) {
        commit("setLoading", true);
        try {
            const response = await API_URL.post("/user/resetPassword", payload);
            commit("setError", null);
            return response;
        } catch (error) {
            commit("setError", error.response?.data?.message || "An error occurred during password reset.");
            throw error;
        } finally {
            commit("setLoading", false);
        }
    },

    clearError({ commit }) {
        commit("clearError");
    },

};

const mutations = {
    setError(state, errorKey) {
        state.errorKey = errorKey; // Simpan key error
        state.errorMessage = errorKey ? i18n.global.t(errorKey) : null; // Terjemahkan errorKey
    },
    clearError(state) {
        state.error = null;
        state.errorMessage = null;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    setUser(state, user) {
        if (user) {
            state.user = user.data;
    
            // Simpan user ke localStorage
            localStorage.setItem("user", JSON.stringify(user));
    
            // Reset verification issues
            state.verificationIssues = [];
            if (!user.VerifiedEmail) {
                state.verificationIssues.push("email");
            }
            if (!user.VerifiedPhoneNumber) {
                state.verificationIssues.push("phone");
            }
        } else {
            state.user = null;
            state.verificationIssues = [];
            localStorage.removeItem("user");
        }
    },    
    setToken(state, token) {
        state.token = token;
        localStorage.setItem("token", token); // Simpan token di localStorage
        API_URL.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    setAuthenticated(state, status) { // Tambahkan mutation ini
        state.isAuthenticated = status;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
