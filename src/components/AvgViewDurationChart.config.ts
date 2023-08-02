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
    title: {
      color: theme.palette.text.primary,
      display: true,
      font: {
        family: 'Roboto',
        size: 32,
      },
      text: 'Average View Duration %',
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
