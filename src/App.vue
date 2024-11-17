<script setup lang="ts">
import { BanknotesIcon, BookOpenIcon, ChatBubbleOvalLeftEllipsisIcon, FireIcon, HomeIcon, LightBulbIcon, SpeakerWaveIcon, StarIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import "./style.css";

const menuItems = [
  { name: "All", icon: HomeIcon, clickable: true },
  { name: "Hot", icon: FireIcon, clickable: false },
  { name: "Show HN", icon: SpeakerWaveIcon, clickable: false },
  { name: "Ask HN", icon: ChatBubbleOvalLeftEllipsisIcon, clickable: false },
  { name: "Stories", icon: BookOpenIcon, clickable: true },
  { name: "Polls", icon: LightBulbIcon, clickable: true },
  { name: "Jobs", icon: BanknotesIcon, clickable: true },
  { name: "Starred", icon: StarIcon, clickable: false }
];

const currentCategory = ref('All');
const handleCategoryChange = (category: string) => {
  currentCategory.value = category;
};

</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <Header msg="Search" title="Hacker News" />
    <div class="flex flex-row w-full">
      <Sidebar :menuItems="menuItems" :currentCategory="currentCategory" @selectCategory="handleCategoryChange" />
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
