<script setup>
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '@/stores/transaction'

const transactionStore = useTransactionStore()
const { sortedByDateDesc } = storeToRefs(transactionStore)

function formatAmount(amount, type) {
  const n = new Intl.NumberFormat('ko-KR').format(amount)
  return type === 'expense' ? `−${n}원` : `+${n}원`
}

function typeLabel(type) {
  return type === 'income' ? '수입' : '지출'
}
</script>

<template>
  <section class="transaction" aria-label="거래 내역">
    <ul v-if="sortedByDateDesc.length" class="transaction-list">
      <li
        v-for="tx in sortedByDateDesc"
        :key="tx.id"
        class="transaction-item"
        :class="`transaction-item--${tx.type}`"
      >
        <div class="transaction-item__top">
          <time class="transaction-date" :datetime="tx.date">{{ tx.date }}</time>
          <span class="transaction-type">{{ typeLabel(tx.type) }}</span>
        </div>
        <div class="transaction-item__body">
          <span class="transaction-amount">{{ formatAmount(tx.amount, tx.type) }}</span>
          <span class="transaction-category">{{ tx.category }}</span>
        </div>
        <p v-if="tx.memo" class="transaction-memo">{{ tx.memo }}</p>
      </li>
    </ul>
    <p v-else class="transaction-empty">거래 내역이 없습니다.</p>
  </section>
</template>

<style scoped>
.transaction {
  padding: 0 1rem 1rem;
}

.transaction-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.transaction-item {
  padding: 0.875rem 1rem;
  background: #ffffff;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.transaction-item__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
}

.transaction-date {
  font-size: 0.75rem;
  color: #6b7280;
}

.transaction-type {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background: #f3f4f6;
  color: #4b5563;
}

.transaction-item--income .transaction-type {
  background: #ecfdf5;
  color: #047857;
}

.transaction-item--expense .transaction-type {
  background: #fef2f2;
  color: #b91c1c;
}

.transaction-item__body {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.transaction-amount {
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.transaction-item--income .transaction-amount {
  color: #047857;
}

.transaction-item--expense .transaction-amount {
  color: #111827;
}

.transaction-category {
  font-size: 0.8125rem;
  color: #374151;
  font-weight: 500;
}

.transaction-memo {
  margin: 0.5rem 0 0;
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.45;
}

.transaction-empty {
  margin: 0;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
}
</style>
