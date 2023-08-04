import { TooltipItem } from 'chart.js';
import theme from '@/theme';
import { BarChartDataPoint } from '../../../lib/dataUtils';

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 40,
      right: 40,
    },
  },
  plugins: {
    title: {
      color: theme.palette.text.primary,
      display: true,
      font: {
        family: 'Roboto',
        size: 32,
      },
      text: 'Average View Duration %',
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        label: (context: TooltipItem<'bar'>) => {
          const data = context.raw as BarChartDataPoint;
          return `${data.y.toFixed(2)}% watched`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: false,
        text: 'Videos',
        color: theme.palette.text.primary,
      },
      border: {
        color: 'rgba(255, 255, 255, 0.65)',
        width: 2,
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.25)',
      },
      ticks: { display: false, color: theme.palette.text.primary },
    },
    y: {
      title: {
        display: false,
        text: 'Avg. View Duration',
        color: theme.palette.text.primary,
      },
      border: {
        color: 'rgba(255, 255, 255, 0.65)',
        width: 2,
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.25)',
      },
      ticks: {
        color: theme.palette.text.primary,
        min: 0,
        max: 100,
        callback: (value: string | number) => value + '%',
      },
    },
  },
};
