import theme from '@/theme';

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
    legend: {
      display: false,
      labels: {
        color: theme.palette.text.primary,
      },
    },
    title: {
      color: theme.palette.text.primary,
      display: true,
      font: {
        family: 'Roboto',
        size: 32,
      },
      text: 'Views',
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        // @ts-ignore
        label: context => {
          const data = context.dataset.data[context.dataIndex];
          return `${data.id}`;
        },
        // @ts-ignore
        afterLabel: context => {
          const data = context.dataset.data[context.dataIndex];
          return `${data?.y} views`;
        },
      },
    },
  },
  scales: {
    x: {
      type: 'time' as const, // https://github.com/reactchartjs/react-chartjs-2/issues/1009
      title: {
        display: true,
        text: 'Date Uploaded',
        color: theme.palette.text.primary,
      },
      border: {
        color: 'rgba(255, 255, 255, 0.65)',
        width: 2,
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.25)',
      },
      ticks: { color: theme.palette.text.primary },
    },
    y: {
      title: {
        display: false,
        text: 'Views',
        color: theme.palette.text.primary,
      },
      border: {
        color: 'rgba(255, 255, 255, 0.65)',
        width: 2,
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.25)',
      },
      ticks: { color: theme.palette.text.primary },
    },
  },
};
