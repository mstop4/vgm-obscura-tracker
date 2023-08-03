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
import { blue } from '@mui/material/colors';
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
        backgroundColor: blue[300],
        borderColor: blue[900],
        borderWidth: 1.5,
        hoverBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  return <Scatter options={options} data={chartData} />;
}
