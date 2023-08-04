'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  CategoryScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { blue } from '@mui/material/colors';
import { VideoData } from '../../../lib/dataFetch';
import { prepareViewsPerDayData } from '../../../lib/dataUtils';
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
        backgroundColor: blue[300],
        borderColor: blue[900],
        borderWidth: 1.5,
        hoverBorderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
