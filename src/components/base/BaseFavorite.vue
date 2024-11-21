<template>
    <button @click.stop="toggleFavorite" class="favorite-button" :aria-label="isFavorited ? 'Remove from favorites' : 'Add to favorites'">
        <AppIcon :icon="isFavorited ? 'mdi:favorite' : 'mdi:favorite-border'" class="favorite-icon" />
    </button>
</template>

<script>
export default {
    name: 'BaseFavorite',
    props: {
        isFavorited: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:favorite'],
    methods: {
        toggleFavorite() {
            this.$emit('update:favorite', !this.isFavorited);
        },
    },
};
</script>

<style scoped>
.favorite-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    padding: 6px;
}

.favorite-icon {
    color: #f87171;
    font-size: 1.25rem;
}
</style>