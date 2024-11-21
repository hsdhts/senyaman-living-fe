// import i18n from "@/plugins/LanguageComponent"; // Import instance i18n

export const RESPONSE_MAPPINGS = {
    // HTTP Status Codes
    HTTP: {
        OK: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },

    // Backend Response Codes
    CODES: {
        SUCCESS: 0,
        INCORRECT_EMAIL_PASSWORD: 1,
        EMAIL_PHONE_NUMBER_REGISTERED: 2,
        PASSWORD_NOT_MATCH: 3,
        ALREADY_VERIFIED: 4,
        NEXT_VERIFICATION: 5,
        FAILED_SEND_VERIFICATION: 6,
        INVALID_VERIFICATION_CODE: 7,
        VERIFICATION_CODE_EXPIRED: 8,
        FAILED_SEND_EKEY: 10,
        GATEWAY_NOT_REGISTERED: 11,
        LOCK_NOT_REGISTERED: 12,
        EMAIL_PHONE_NUMBER_UNREGISTERED: 13,
        DONT_HAVE_ACCESS: 15,
        ALREADY_EXIST: 16,
        FAILED_DELETE: 17,
        FILE_TYPE_NOT_SUPPORTED: 18,
        TARGET_DATE_UNAVAILABLE: 19,
        GENERAL_ERROR: 1000,
        SYSTEM_ERROR: -1,
    },

    // Mapping Status and Messages
    MESSAGES: {
        200: {
            0: "errors.operationSuccessful",
            5: "errors.nextVerificationRequired",
        },
        201: {
            0: "errors.resourceCreated",
        },
        400: {
            1: "errors.incorrectEmailPassword",
            2: "errors.emailPhoneNumberRegistered",
            3: "errors.passwordsNotMatch",
            4: "errors.alreadyVerified",
            6: "errors.failedSendVerification",
            7: "errors.invalidVerificationCode",
            8: "errors.verificationCodeExpired",
            13: "errors.emailPhoneNumberUnregistered",
            18: "errors.fileTypeNotSupported",
            19: "errors.targetDateUnavailable",
        },
        401: {
            15: "errors.unauthorizedAccess",
        },
        404: {
            17: "errors.resourceNotDeleted",
        },
        500: {
            "-1": "errors.systemError",
            1000: "errors.internalServerError",
        },
    },
};

// Default Message
export const DEFAULT_MESSAGE = "errors.defaultError";

/**
 * Mengambil pesan error berdasarkan status HTTP dan kode backend.
 * Mendukung penerjemahan menggunakan i18n.
 * @param {Number} status - Status HTTP dari response.
 * @param {Number} code - Kode dari backend.
 * @returns {String} - Pesan error yang diterjemahkan.
 */
export function getResponseMessage(status, code, returnKey = false) {
    const statusMessages = RESPONSE_MAPPINGS.MESSAGES[status];
    if (!statusMessages) return returnKey ? "errors.defaultError" : DEFAULT_MESSAGE;

    const message = statusMessages[code];
    if (returnKey) return message ? `errors.${message}` : "errors.defaultError";

    return message || DEFAULT_MESSAGE;
}
