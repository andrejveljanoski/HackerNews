<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from 'vue';
import PostsList from './PostsList.vue';
import { ShareIcon } from '@heroicons/vue/24/outline';
import { useQuery } from '@tanstack/vue-query';
import { fetchPosts } from '../api/posts';
import { store } from '../store';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{ category: string }>();
const emit = defineEmits(['updateCategory']);

const route = useRoute();
const router = useRouter();

// Initialize selectedCategory with props.category or query parameter
const selectedCategory = ref<string>(route.query.category as string || props.category);

// Watch for changes in the URL query parameters
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      selectedCategory.value = newCategory as string;
    }
  }
);

// Watch for changes in selectedCategory and update the URL query parameter
watch(selectedCategory, (newCategory) => {
  emit('updateCategory', newCategory);
  router.push({ query: { ...route.query, category: newCategory } });
});

// Update filter options
const categories = ref(['All', 'Stories', 'Polls', 'Jobs']);
const popularities = ref(['Most Popular', 'Latest']);
const times = ref(['All time', 'Today', 'This Week', 'This Month']);

const selectedPopularity = ref(popularities.value[0]);
const selectedTime = ref(times.value[0]);

const currentPage = ref(0);

// Map selected filters to API parameters
const tags = computed(() => {
  switch (selectedCategory.value) {
    case 'All':
      return undefined;
    case 'Stories':
      return 'story';
    case 'Polls':
      return 'poll';
    case 'Jobs':
      return 'job';
    default:
      return undefined;
  }
});

const numericFilters = computed(() => {
  const now = Math.floor(Date.now() / 1000);
  let secondsAgo;

  switch (selectedTime.value) {
    case 'All time':
      return undefined;
    case 'Today':
      secondsAgo = 60 * 60 * 24;
      break;
    case 'This Week':
      secondsAgo = 60 * 60 * 24 * 7;
      break;
    case 'This Month':
      secondsAgo = 60 * 60 * 24 * 30;
      break;
    default:
      return undefined;
  }

  if (secondsAgo !== undefined) {
    const timestamp = now - secondsAgo;
    return `created_at_i>${timestamp}`;
  }
  return undefined;
});

const sort = computed(() => {
  switch (selectedPopularity.value) {
    case 'Most Popular':
      return 'byPopularity';
    case 'Latest':
      return 'byDate';
    default:
      return 'byPopularity';
  }
});

// Create a computed property for store.query
const storeQuery = computed(() => store.query);

// Adjust the query key to include filters
const queryKey = computed(() => [
  'posts',
  storeQuery.value,
  currentPage.value,
  selectedCategory.value,
  selectedPopularity.value,
  selectedTime.value,
]);

const { data, isLoading } = useQuery({
  queryKey: queryKey,
  queryFn: () =>
    fetchPosts(
      storeQuery.value,
      currentPage.value,
      tags.value,
      numericFilters.value,
      sort.value
    ),
});

const nextPage = () => {
  currentPage.value += 1;
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
  }
};

// Reset current page when filters change
watch(
  [storeQuery, selectedCategory, selectedPopularity, selectedTime],
  () => {
    currentPage.value = 0;
  }
);
</script>

<template>
  <div class="w-full h-full flex flex-col text-gray-500">
    <div class="p-4 border-b flex">
      <div class="flex gap-4 mt-2 items-center header-text-container w-full">
        <h2 class="text-2xl font-normal">Hot</h2>
        <span>in</span>
        <select v-model="selectedCategory" class="px-4 py-2 bg-white border-gray-200 border-2 rounded">
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
        <span>by</span>
        <select v-model="selectedPopularity" class="px-4 py-2 bg-white border-gray-200 border-2 rounded">
          <option v-for="popularity in popularities" :key="popularity">{{ popularity }}</option>
        </select>
        <span>for</span>
        <select v-model="selectedTime" class="px-4 py-2 bg-white border-gray-200 border-2 rounded">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
        <div class=" flex gap-2 ml-auto">
          <span>{{ data?.totalResults }} results </span>
          <button class="share-button">
            <ShareIcon class="w-6 h-5" />
          </button>
        </div>
      </div>
    </div>
    <div class="p-4 flex-grow h-full">
      <PostsList :isLoading="isLoading" :posts="data?.items ?? []" :currentPage="currentPage" :nextPage="nextPage"
        :prevPage="prevPage" />
    </div>
  </div>
</template>

<style scoped>
.header-text-container {
  span {
    opacity: 0.4;
  }
}
</style>