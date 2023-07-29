'use client';

import { ScatterChart } from '@mui/x-charts';
import { VideoData } from '../../lib/dataFetch';
import { prepareViewsChartData } from '../../lib/dataUtils';

export type ViewsChartProps = {
  videoData: Array<VideoData>;
};

export default function ViewsChart(props: ViewsChartProps) {
  const { videoData } = props;
  const chartData = prepareViewsChartData(videoData);

  // NOTE: This is causing a warning: Invalid DOM property `transform-origin`. Did you mean `transformOrigin`?
  // Using "@mui/x-charts": "^6.0.0-alpha.5"
  return (
    <ScatterChart
      width={900}
      height={450}
      series={[
        {
          label: 'Views',
          data: chartData,
        },
      ]}
    />
  );
}
