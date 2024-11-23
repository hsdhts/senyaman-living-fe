<template>
    <button :class="buttonClasses" :type="nativeType" :disabled="disabled">
        <slot />
    </button>
</template>

<script>
export default {
    name: "BaseButton",
    props: {
        type: {
            type: String,
            default: "default", // 'default', 'primary', 'success', 'danger', etc.
        },
        nativeType: {
            type: String,
            default: "button", // 'button', 'submit', 'reset'
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        buttonClasses() {
            return [
                "base-button",
                `base-button--${this.type}`,
                { "is-disabled": this.disabled },
            ];
        },
    },
};
</script>

<style scoped>
.base-button {
    padding: 0.5em 1em;
    border: none;
    cursor: pointer;
    font-size: 1em;
}

.base-button--default {
    background-color: #f5f5f5;
    color: #333;
}

.base-button--primary {
    background-color: #00703c;
    color: #fff;
    border: 1px solid #00703c;
}

.base-button--secondary {
    background-color: white;
    border: 1px solid #00703c;
    color: #00703c;
    border-radius: 4px;
}

.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
</style>


