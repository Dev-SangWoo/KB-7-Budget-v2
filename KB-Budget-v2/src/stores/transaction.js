import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import seed from '../../db.json'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref(seed.transactions.map((t) => ({ ...t })))

  const sortedByDateDesc = computed(() =>
    [...transactions.value].sort((a, b) => {
      const byDate = b.date.localeCompare(a.date)
      if (byDate !== 0) return byDate
      return String(b.id).localeCompare(String(a.id), undefined, { numeric: true })
    }),
  )

  /** 날짜 내림차순 섹션: 같은 날짜 거래는 함께 묶음 */
  const groupedByDateDesc = computed(() => {
    const sections = []
    let currentDate = null
    for (const tx of sortedByDateDesc.value) {
      if (tx.date !== currentDate) {
        currentDate = tx.date
        sections.push({ date: tx.date, items: [] })
      }
      sections[sections.length - 1].items.push(tx)
    }
    return sections
  })

  function setTransactions(rows) {
    transactions.value = Array.isArray(rows) ? [...rows] : []
  }

  return {
    transactions,
    sortedByDateDesc,
    groupedByDateDesc,
    setTransactions,
  }
})
