'use client';
import {
  Chart as ChartJS,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import { Scatter } from 'react-chartjs-2';
import { VideoData } from '../../lib/dataFetch';
import { prepareViewsChartData } from '../../lib/dataUtils';

export type ViewsChartProps = {
  videoData: Array<VideoData>;
};

ChartJS.register(
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const options = {
  scales: {
    x: {
      type: 'time' as const, // https://github.com/reactchartjs/react-chartjs-2/issues/1009
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

export default function ViewsChart(props: ViewsChartProps) {
  const { videoData } = props;
  const chartData = {
    datasets: [
      {
        label: 'Views',
        data: prepareViewsChartData(videoData),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return <Scatter options={options} data={chartData} />;
}
