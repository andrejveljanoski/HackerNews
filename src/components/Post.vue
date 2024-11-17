<script setup lang="ts">
import { ShareIcon, StarIcon, HeartIcon, UserIcon, ClockIcon } from '@heroicons/vue/24/outline';
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/solid';
import { defineProps, computed } from 'vue';
import { Post } from '../api/posts';
import { useRouter } from 'vue-router';

const props = defineProps<{ post: Post }>();

const timeAgo = computed(() => {
    const now = new Date();
    const createdAt = new Date(props.post.created_at);
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
});

const postDomain = computed(() => {
    try {
        const url = new URL(props.post.url);
        return url.hostname;
    } catch {
        return props.post.url;
    }
});

const router = useRouter();

const goToPostDetails = () => {
    router.push({ name: 'PostDetails', params: { id: props.post.objectID } });
};
</script>

<template>
    <router-link :to="{ name: 'PostDetails', params: { id: props.post.objectID } }"
        class="flex items-center p-4 border-b w-full h-24 bg-white shadow-md cursor-pointer">
        <img src="https://via.placeholder.com/100" alt="Thumbnail" class="w-16 h-16 object-cover mr-4" />
        <div class="flex-grow">
            <h3 class="text-xl font-semibold">{{ post.title }}</h3>
            <p class="text-sm text-gray-500 flex items-center gap-2">
                <span v-if="post.points" class="gap-1 flex items-center">
                    <HeartIcon class="w-5 h-5" />
                    <span>{{ post.points }} points</span>
                </span>
                <span class="gap-1 flex items-center">
                    <UserIcon class="w-5 h-5" />
                    <span>{{ post.author }}</span>
                </span>
                <span class="flex items-center gap-1">
                    <ClockIcon class="w-5 h-5" />
                    <span>{{ timeAgo }}</span>
                    <a :href="post.url" target="_blank" rel="noopener noreferrer" class="ml-2 text-blue-500">{{
                        postDomain }}</a>
                </span>
            </p>
        </div>
        <div class="flex items-center space-x-4">
            <button class="text-gray-500 flex items-center relative">
                <ChatBubbleLeftIcon class="w-10 h-10" />
                <span class="absolute inset-0 flex items-center justify-center text-xs text-white  w-10 h-8">{{
                    post.num_comments > 999 ? "999+" : post.num_comments }}</span>
            </button>
            <button class="text-gray-500">
                <ShareIcon class="w-6 h-6" />
            </button>
            <button class="text-gray-500">
                <StarIcon class="w-6 h-6" />
            </button>
        </div>
    </router-link>
</template>

<style scoped>
/* Add any additional styling here */
</style>
