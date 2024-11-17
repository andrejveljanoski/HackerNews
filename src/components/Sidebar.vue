<script setup lang="ts">
import { defineProps, FunctionalComponent } from 'vue';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

type MenuItem = {
    name: string;
    icon: FunctionalComponent;
    clickable?: boolean;
};

type Props = {
    menuItems: MenuItem[];
};

defineProps<Props>();

const route = useRoute();
const currentCategory = ref(route.query.category as string || 'All');

watch(() => route.query.category, (newCategory) => {
    currentCategory.value = newCategory as string || 'All';
});

</script>

<template>
    <div class="w-1/4 h-full">
        <ul class="flex flex-col h-full text-black pt-8">
            <li v-for="item in menuItems" :key="item.name" :class="[
                'flex items-center space-x-2 gap-4 h-12 p-4 px-6 w-full',
                item.clickable ? 'cursor-pointer hover:bg-gray-200' : 'opacity-50 cursor-default',
                item.name.toLowerCase() === currentCategory.toLowerCase() ? 'bg-gray-300' : ''
            ]">
                <component :is="item.clickable ? 'router-link' : 'span'" :to="{
                    path: '/', query: {
                        category: item.name
                    }
                }" class="flex items-center space-x-2 gap-4 w-full">
                    <component :is="item.icon" class="w-6 h-6 text-black" />
                    <span class="text-lg font-semibold">{{ item.name }}</span>
                </component>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>