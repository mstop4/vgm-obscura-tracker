'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  CategoryScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { VideoData } from '../../lib/dataFetch';
import { prepareViewsPerDayData } from '../../lib/dataUtils';
import { options } from './ViewsPerDayChart.config';

export type ViewsPerDayChartProps = {
  videoData: Array<VideoData>;
};

ChartJS.register(Title, CategoryScale, BarElement, Tooltip);

export default function ViewsPerDayChart(props: ViewsPerDayChartProps) {
  const { videoData } = props;
  const chartData = {
    datasets: [
      {
        label: 'Views/Day',
        data: prepareViewsPerDayData(videoData),
        backgroundColor: 'rgba(255, 128, 128, 0.75)',
        borderColor: 'rgba(128, 64, 64, 0.9)',
        borderWidth: 1.5,
        hoverBorderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
