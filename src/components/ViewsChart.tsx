'use client';

import { VideoData } from '../../lib/dataFetch';
import { prepareViewsChartData } from '../../lib/dataUtils';

export type ViewsChartProps = {
  videoData: Array<VideoData>;
};

export default function ViewsChart(props: ViewsChartProps) {
  const { videoData } = props;
  const chartData = prepareViewsChartData(videoData);

  return <p>Charts</p>;
}
