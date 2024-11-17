<template>
    <div class="home">
        <Content :category="currentCategory" @updateCategory="handleCategoryChange" />
    </div>
</template>

<script setup lang="ts">
import Content from '../components/Content.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from "vue3-toastify";

const route = useRoute();
const currentCategory = ref((route.query.category as string) || 'All');

// Watch for changes in the URL query parameters
watch(
    () => route.query.category,
    (newCategory) => {
        if (newCategory) {
            currentCategory.value = newCategory as string;
        }
    }
);

const handleCategoryChange = (category: string) => {
    try {
        currentCategory.value = category;
    } catch (error) {
        console.error('Error changing category:', error);
        toast.error('Failed to change category. Please try again later.');
    }
};
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 100px);
}
</style>