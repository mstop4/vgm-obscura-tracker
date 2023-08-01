import dayjs from 'dayjs';
import { VideoData } from './dataFetch';

export type ScatterChartDataPoint = {
  id: string;
  x: Date;
  y: number;
};

export type BarChartDataPoint = {
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
): Array<BarChartDataPoint> {
  const now = dayjs();

  return videoData.map(video => {
    const { views, publishedAt } = video;
    return {
      x: video.title,
      y: calculateViewsPerDay(views, publishedAt, now),
    };
  });
}

export function prepareAvgViewDurationData(
  videoData: Array<VideoData>,
): Array<BarChartDataPoint> {
  return videoData.map(video => {
    const { title, averageViewDuration, duration } = video;
    return {
      x: title,
      y: (averageViewDuration / duration) * 100,
    };
  });
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
