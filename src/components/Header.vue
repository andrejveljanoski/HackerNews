<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchBar from './SearchBar.vue'
import { AdjustmentsVerticalIcon } from '@heroicons/vue/24/outline';
import { store } from '../store';
import { useRouter } from 'vue-router';

type Props = {
  msg: string;
  title: string;
};
defineProps<Props>();

const searchValue = ref(store.query);
let debounceTimeout: ReturnType<typeof setTimeout>;

watch(searchValue, (newValue) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    store.query = newValue;
  }, 300);
});


</script>

<template>
  <header class="flex items-center gap-8 h-[100px] p-4 text-white bg-white">
    <div class="flex items-center gap-2 h-full">
      <router-link to="/" class="h-full">
        <img alt="logo" src="../assets/logo.png" class="h-full cursor-pointer" />
      </router-link>
      <div class="flex flex-col text-black opacity-30">
        <h1>{{ msg }}</h1>
        <h1>{{ title }}</h1>
      </div>
    </div>
    <div class="w-[60%]">
      <SearchBar v-model:value="searchValue" />
    </div>
    <AdjustmentsVerticalIcon class="ml-auto w-6 h-6 text-black opacity-40 cursor-pointer" />
  </header>
</template>