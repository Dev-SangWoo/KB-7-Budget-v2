<script setup>
import { ref } from 'vue'
import bearImg from '@/assets/images/곰.png'

// TODO: 플렉스형 곰 전용 이펙트 추가 예정
const mascotEl = ref(null)
</script>

<template>
  <!-- 곰 마스코트 (플렉스형) -->
  <div ref="mascotEl" class="mascot" aria-hidden="true">
    <img :src="bearImg" class="mascot__img" alt="" draggable="false" />
  </div>
</template>

<style scoped>
.mascot {
  position: absolute;
  bottom: -10px;
  right: 1.5rem;
  z-index: 2;
  animation: mascot-walk 10s linear infinite;
  will-change: transform;
}

.mascot__img {
  display: block;
  width: 110px;
  pointer-events: none;
  user-select: none;
}

@keyframes mascot-walk {
  /* ─── 왼쪽으로 걷기 ─── */
  0%   { transform: translateX(0)      translateY(0)    scaleX(1);  }
  8%   { transform: translateX(-48px)  translateY(-4px) scaleX(1);  }
  16%  { transform: translateX(-96px)  translateY(0)    scaleX(1);  }
  24%  { transform: translateX(-144px) translateY(-4px) scaleX(1);  }
  32%  { transform: translateX(-193px) translateY(0)    scaleX(1);  }
  38%  { transform: translateX(-215px) translateY(0)    scaleX(1);  }

  /* ─── 방향 전환 (순간 반전) ─── */
  39%  { transform: translateX(-220px) translateY(0)    scaleX(-1); }
  40%  { transform: translateX(-220px) translateY(0)    scaleX(-1); }

  /* ─── 오른쪽으로 걷기 ─── */
  48%  { transform: translateX(-172px) translateY(-4px) scaleX(-1); }
  56%  { transform: translateX(-124px) translateY(0)    scaleX(-1); }
  64%  { transform: translateX(-76px)  translateY(-4px) scaleX(-1); }
  72%  { transform: translateX(-28px)  translateY(0)    scaleX(-1); }
  78%  { transform: translateX(0)      translateY(0)    scaleX(-1); }

  /* ─── 방향 전환 (순간 복원) ─── */
  79%  { transform: translateX(0)      translateY(0)    scaleX(1);  }

  /* ─── 잠시 제자리 대기 ─── */
  100% { transform: translateX(0)      translateY(0)    scaleX(1);  }
}
</style>
