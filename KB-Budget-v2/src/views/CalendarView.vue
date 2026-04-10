<script setup>
import Calendar from '@/components/Calendar.vue';
import { ref } from 'vue';

const today = new Date();
const selectedMonth = ref(
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
);
</script>

<template>
  <div class="calendar-page">
    <Calendar v-model:month="selectedMonth" :show-month-nav="true" />
  </div>
</template>

<style scoped>
.calendar-page {
  max-width: 430px;
  margin: 0 auto;
  padding: 0.75rem 0.65rem 1rem;
  background: var(--color-bg-page);
  box-sizing: border-box;
}
</style>
