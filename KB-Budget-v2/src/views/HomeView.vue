<script setup>
import { ref } from 'vue'
import Filter from '@/components/Filter.vue'
import FilterModal from '@/components/FilterModal.vue'
import Transaction from '@/components/Transaction.vue'

const filterModalOpen = ref(false)
const filterFocusSection = ref('date')

function openFilter(section) {
  filterFocusSection.value = section
  filterModalOpen.value = true
}
</script>

<template>
  <div class="home">
    <Filter
      @open-date="openFilter('date')"
      @open-category="openFilter('category')"
    />
    <Transaction />
    <FilterModal
      v-model="filterModalOpen"
      :focus-section="filterFocusSection"
    />
  </div>
</template>

<style scoped>
.home {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
