import { RESPONSE_MAPPINGS, getResponseMessage } from "@/utils/responseMapping";

export default {
    install(app) {
        // Menambahkan ke global properties
        app.config.globalProperties.$responseMappings = RESPONSE_MAPPINGS;
        app.config.globalProperties.$getResponseMessage = getResponseMessage;
    },
};
