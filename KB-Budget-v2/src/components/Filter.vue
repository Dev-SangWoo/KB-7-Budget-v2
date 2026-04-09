<script setup>
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '@/stores/transaction'
import { SlidersHorizontal } from 'lucide-vue-next'

const emit = defineEmits(['open-filter'])

const transactionStore = useTransactionStore()
const { hasDateFilter, hasCategoryFilter } = storeToRefs(transactionStore)
</script>

<template>
  <button
    type="button"
    class="filter-btn"
    :class="{ 'filter-btn--active': hasDateFilter || hasCategoryFilter }"
    @click="emit('open-filter')"
    aria-label="필터"
  >
    <SlidersHorizontal :size="14" :stroke-width="2.2" />
    <span class="filter-btn__text">필터</span>
    <span
      v-if="hasDateFilter || hasCategoryFilter"
      class="filter-btn__dot"
      aria-hidden="true"
    />
  </button>
</template>

<style scoped>
.filter-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.65rem;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: var(--color-text-muted);
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-pill);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 1px 3px rgba(26, 20, 16, 0.05);
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s,
    transform 0.15s var(--ease-spring);
}

.filter-btn--active {
  background: rgba(251, 191, 36, 0.14);
  border-color: rgba(245, 158, 11, 0.5);
  color: var(--color-brand-deep);
  box-shadow:
    0 1px 3px rgba(26, 20, 16, 0.05),
    0 0 0 2px rgba(251, 191, 36, 0.1);
}

.filter-btn__text {
  line-height: 1;
}

.filter-btn__dot {
  position: absolute;
  top: 2px;
  right: 3px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-brand);
  box-shadow: 0 0 0 1.5px var(--color-bg);
}

.filter-btn:active {
  transform: scale(0.95);
}
</style>
