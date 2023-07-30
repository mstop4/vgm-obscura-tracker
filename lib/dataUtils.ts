import dayjs from 'dayjs';
import { VideoData } from './dataFetch';

export type ScatterChartDataPoint = {
  id: string;
  x: Date;
  y: number;
};

export function calculateViewsPerDay(
  views: number,
  publishedAt: string,
  now: dayjs.Dayjs,
): number {
  const uploadDate = dayjs(publishedAt);
  return views / now.diff(uploadDate, 'day');
}

export function prepareViewsChartData(
  videoData: Array<VideoData>,
): Array<ScatterChartDataPoint> {
  return videoData.map(video => ({
    id: video.title,
    x: new Date(video.publishedAt),
    y: video.views,
  }));
}
