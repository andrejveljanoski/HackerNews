<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchPostDetails, Post } from '../api/posts';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { toast } from "vue3-toastify";

const route = useRoute();
const postId = route.params.id as string;

const post = ref<Post | null>(null);
const comments = ref<Post[]>([]);
const isLoading = ref(true);

const fetchDetails = async () => {
    const data = await fetchPostDetails(postId);
    post.value = data?.post;
    comments.value = data?.comments;
    isLoading.value = false;
};

const timeAgo = (dateString: string) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const key in intervals) {
        const interval = intervals[key];
        const count = Math.floor(diffInSeconds / interval);
        if (count >= 1) {
            return `${count} ${key}${count > 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
};

onMounted(() => {
    fetchDetails();
});
</script>

<template>
    <div class="post-details w-3/4 bg-gray-100 p-4 text-black">
        <LoadingSpinner v-if="isLoading" />
        <div v-else>
            <div v-if="post" class="post-content bg-white p-4 rounded shadow-md mb-4">
                <h1 class="text-2xl font-bold mb-2">{{ post.title }}</h1>
                <p v-if="post.story_text" class="text-gray-700 mb-4">{{ post.story_text }}</p>
                <a v-if="post.url" :href="post.url" target="_blank" class="text-blue-500">{{ post.url }}</a>
            </div>
            <div v-if="comments?.length" class="comments-section">
                <h2 class="text-xl font-semibold mb-4">Comments</h2>
                <ul>
                    <li v-for="comment in comments" :key="comment.objectID"
                        class="comment bg-white p-4 rounded shadow-md mb-4">
                        <div class="comment-header flex items-center mb-2">
                            <span class="font-semibold">{{ comment.author }}</span>
                            <span class="text-gray-500 ml-2">{{ timeAgo(comment.created_at) }}</span>
                        </div>
                        <div v-html="comment.text" class="comment-text text-gray-700 mb-2"></div>
                        <ul v-if="comment.children" class="pl-4 border-l-2 border-gray-200">
                            <li v-for="child in comment.children" :key="child.objectID"
                                class="comment bg-gray-50 p-4 rounded shadow-md mb-2">
                                <div class="comment-header flex items-center mb-2">
                                    <span class="font-semibold">{{ child.author }}</span>
                                    <span class="text-gray-500 ml-2">{{ timeAgo(child.created_at) }}</span>
                                </div>
                                <div v-html="child.text" class="comment-text text-gray-700"></div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.post-details {
    padding: 20px;
    background-color: #f7f7f7;
    height: 100%;
    min-height: calc(100vh - 100px);
    /* 100px is the height of the header */
    overflow-x: hidden;
}

.post-content {
    margin-bottom: 20px;
}

.comments-section ul {
    list-style-type: none;
    padding-left: 0;
}

.comment {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.comment-text {
    color: #333333;
}

.comment ul {
    padding-left: 20px;
    border-left: 2px solid #e0e0e0;
}

.comment ul .comment {
    background-color: #f9f9f9;
}
</style>