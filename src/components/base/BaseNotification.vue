<template>
    <div v-if="visible" class="notification" :class="type">
        <span>{{ message }}</span>
        <button @click="closeNotification" class="close-btn">&times;</button>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "info", // Jenis notifikasi: info, success, error, warning
        },
    },
    data() {
        return {
            visible: true, // Status visibilitas notifikasi
        };
    },
    methods: {
        closeNotification() {
            this.visible = false;
        },
    },
};
</script>

<style scoped>
.notification {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 300px;
    z-index: 1000;
    animation: slide-in 0.3s ease-out;
}

.notification.info {
    background-color: #d9edf7;
    color: #31708f;
}

.notification.success {
    background-color: #dff0d8;
    color: #3c763d;
}

.notification.error {
    background-color: #f2dede;
    color: #a94442;
}

.notification.warning {
    background-color: #fcf8e3;
    color: #8a6d3b;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: inherit;
    cursor: pointer;
}

@keyframes slide-in {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>