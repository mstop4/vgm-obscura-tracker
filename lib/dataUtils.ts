import dayjs from 'dayjs';
import { VideoData } from './dataFetch';

export type ViewsChartDataPoint = {
  id: string;
  x: Date;
  y: number;
};

export type ViewsPerDayChartDataPoint = {
  x: string;
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

export function prepareViewsPerDayData(
  videoData: Array<VideoData>,
): Array<ViewsPerDayChartDataPoint> {
  const now = dayjs();

  return videoData.map(video => {
    const { views, publishedAt } = video;
    return {
      x: video.title,
      y: calculateViewsPerDay(views, publishedAt, now),
    };
  });
}

export function prepareViewsChartData(
  videoData: Array<VideoData>,
): Array<ViewsChartDataPoint> {
  return videoData.map(video => ({
    id: video.title,
    x: new Date(video.publishedAt),
    y: video.views,
  }));
}
