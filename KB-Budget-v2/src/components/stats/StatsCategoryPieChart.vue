<script setup>
import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#FF6B6B',
  '#FF9F43',
  '#FECA57',
  '#48DBFB',
  '#1DD1A1',
  '#54A0FF',
  '#5F27CD',
  '#FF9FF3',
  '#00D2D3',
  '#C8D6E5',
];

const props = defineProps({
  slices: { type: Array, default: () => [] },
  emptyHint: { type: String, default: '내역이 없습니다.' },
});

const hasData = computed(() => props.slices && props.slices.length > 0);

const chartData = computed(() => ({
  labels: props.slices.map((s) => s.category),
  datasets: [
    {
      data: props.slices.map((s) => s.amount),
      backgroundColor: props.slices.map((_, i) => COLORS[i % COLORS.length]),
      borderColor: '#ffffff',
      borderWidth: 2,
      hoverOffset: 4,
    },
  ],
}));

const outerLabelPlugin = {
  id: 'outerLabel',
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    const meta = chart.getDatasetMeta(0);
    if (!meta?.data?.length) return;

    const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
    if (total === 0) return;

    const cx = (chartArea.left + chartArea.right) / 2;
    const cy = (chartArea.top + chartArea.bottom) / 2;
    const r = meta.data[0]?.outerRadius ?? 80;

    const ELBOW_DIST = r + 36; // 파이 중심 → elbow 거리
    const HORIZ_W = 20; // 수평선 길이
    const LINE_H = 20; // 라벨 행 간격

    const sliceInfos = meta.data.map((arc, i) => {
      const midAngle = (arc.startAngle + arc.endAngle) / 2;
      const value = chart.data.datasets[0].data[i];
      const pct = (value / total) * 100;
      const sinA = Math.sin(midAngle);
      const cosA = Math.cos(midAngle);
      return {
        midAngle,
        pct,
        sinA,
        cosA,
        color: chart.data.datasets[0].backgroundColor[i],
        label: chart.data.labels[i],
      };
    });

    // ── 4분면 기준 분류 ─────────────────────────────────────────
    // sin < 0 → 위쪽 반원, sin >= 0 → 아래쪽 반원
    // cos >= 0 → 오른쪽, cos < 0 → 왼쪽
    // 총 4그룹: 우상, 우하, 좌상, 좌하
    const topRight = sliceInfos
      .filter((s) => s.cosA >= 0 && s.sinA < 0)
      .sort((a, b) => a.midAngle - b.midAngle);
    const bottomRight = sliceInfos
      .filter((s) => s.cosA >= 0 && s.sinA >= 0)
      .sort((a, b) => a.midAngle - b.midAngle);
    const topLeft = sliceInfos
      .filter((s) => s.cosA < 0 && s.sinA < 0)
      .sort((a, b) => b.midAngle - a.midAngle);
    const bottomLeft = sliceInfos
      .filter((s) => s.cosA < 0 && s.sinA >= 0)
      .sort((a, b) => a.midAngle - b.midAngle);

    // ── y 분배 ─────────────────────────────────────────────────
    // 위쪽 그룹: 자연 y 기준 위로 쌓기 (가장 위부터)
    // 아래쪽 그룹: 자연 y 기준 아래로 쌓기
    function spreadYTop(group) {
      if (!group.length) return [];
      const natYs = group.map((s) => cy + s.sinA * ELBOW_DIST);
      const minY = Math.min(...natYs);
      const maxY = Math.max(...natYs);
      const totalSpan = Math.max((group.length - 1) * LINE_H, maxY - minY);
      const startY = (minY + maxY) / 2 - totalSpan / 2;
      return group.map((s, idx) => ({ ...s, labelY: startY + idx * LINE_H }));
    }

    function spreadYBottom(group) {
      if (!group.length) return [];
      const natYs = group.map((s) => cy + s.sinA * ELBOW_DIST);
      const minY = Math.min(...natYs);
      const maxY = Math.max(...natYs);
      const totalSpan = Math.max((group.length - 1) * LINE_H, maxY - minY);
      const startY = (minY + maxY) / 2 - totalSpan / 2;
      return group.map((s, idx) => ({ ...s, labelY: startY + idx * LINE_H }));
    }

    // ── 선 + 라벨 그리기 ───────────────────────────────────────
    function draw(group, side) {
      group.forEach((s) => {
        // 선 시작: 파이 테두리
        const p1x = cx + s.cosA * (r + 4);
        const p1y = cy + s.sinA * (r + 4);

        // elbow x: midAngle 방향 x, 좌우 clamp
        let p2x = cx + s.cosA * ELBOW_DIST;
        if (side === 'right') p2x = Math.max(p2x, cx + r * 0.25);
        else p2x = Math.min(p2x, cx - r * 0.25);

        const p2y = s.labelY;

        // 수평선 끝
        const p3x = side === 'right' ? p2x + HORIZ_W : p2x - HORIZ_W;
        const p3y = s.labelY;
        const textX = side === 'right' ? p3x + 4 : p3x - 4;

        // 선
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.lineTo(p3x, p3y);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();

        // 카테고리
        ctx.textAlign = side === 'right' ? 'left' : 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#3a3a3c';
        ctx.font = '600 10px -apple-system, sans-serif';
        ctx.fillText(s.label, textX, s.labelY);

        // 퍼센트
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#8e8e93';
        ctx.font = '500 9px -apple-system, sans-serif';
        ctx.fillText(s.pct.toFixed(1) + ' %', textX, s.labelY + 1);

        ctx.restore();
      });
    }

    draw(spreadYTop(topRight), 'right');
    draw(spreadYBottom(bottomRight), 'right');
    draw(spreadYTop(topLeft), 'left');
    draw(spreadYBottom(bottomLeft), 'left');
  },
};

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  cutout: '0%',
  layout: {
    padding: {
      top: 40,
      bottom: 40,
      left: 100,
      right: 100,
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
}));

const plugins = [outerLabelPlugin];
</script>

<template>
  <div class="chart-panel">
    <div v-if="hasData" class="chart-wrap">
      <Doughnut :data="chartData" :options="chartOptions" :plugins="plugins" />
    </div>
    <p v-else class="chart-empty">{{ emptyHint }}</p>
  </div>
</template>

<style scoped>
.chart-panel {
  padding: 0.35rem 0 0;
  background: transparent;
}
.chart-wrap {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  /* 양옆에 CSS 패딩을 추가하여 캔버스 자체가 중앙에 오게 함 */
  padding: 0 20px;
  box-sizing: border-box;
}
.chart-empty {
  margin: 0;
  padding: 1.25rem 0.75rem;
  text-align: center;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  line-height: 1.45;
}
</style>
