// plugins/IconComponent.js
import { Icon } from '@iconify/vue';

export default {
    install(app) {
        app.component('AppIcon', Icon); // Daftarkan AppIcon sebagai komponen global
    }
};