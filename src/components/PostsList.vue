<template>
    <div class="flex flex-col gap-2 h-full">
        <div v-if="isLoading" class="flex items-center justify-center h-full w-full">
            <LoadingSpinner />
        </div>
        <div v-else>
            <Post v-for="post in posts" :key="post.objectID" :post="post" />
            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
                <span>Page {{ currentPage + 1 }}</span>
                <button @click="nextPage">Next</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Post as PostType } from '../api/posts';
import Post from './Post.vue';
import LoadingSpinner from './LoadingSpinner.vue';

defineProps<{ posts: PostType[], currentPage: number, nextPage: () => void, prevPage: () => void, isLoading: boolean }>();

</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination button {
    margin: 0 10px;
    padding: 5px 10px;
}
</style>