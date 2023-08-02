'use client';
import {
  Chart as ChartJS,
  Title,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';
import { Scatter } from 'react-chartjs-2';
import { VideoData } from '../../lib/dataFetch';
import { prepareViewsChartData } from '../../lib/dataUtils';
import { options } from './ViewsChart.config';

export type ViewsChartProps = {
  videoData: Array<VideoData>;
};

ChartJS.register(
  Title,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Tooltip,
);

export default function ViewsChart(props: ViewsChartProps) {
  const { videoData } = props;
  const chartData = {
    datasets: [
      {
        label: 'Views',
        data: prepareViewsChartData(videoData),
        backgroundColor: 'rgba(255, 128, 128, 0.75)',
        borderColor: 'rgba(128, 64, 64, 0.9)',
        borderWidth: 1.5,
        hoverBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  return <Scatter options={options} data={chartData} />;
}
