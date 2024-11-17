<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { toast } from "vue3-toastify";

const props = defineProps<{ value: string }>()
const emit = defineEmits(['update:value'])

const updateValue = (event: Event) => {
    try {
        const target = event.target as HTMLInputElement
        emit('update:value', target.value)
        console.log("Updated value: ", target.value)
    } catch (error) {
        console.error('Error updating value:', error);
        toast.error('Failed to update value. Please try again later.');
    }
}
</script>

<template>
    <div class="flex items-center w-full bg-white rounded-full p-2 shadow-md">
        <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input type="text" :value="props.value" @input="updateValue" placeholder="Search..."
            class="ml-2 bg-transparent outline-none text-black w-full" />
    </div>
</template>
