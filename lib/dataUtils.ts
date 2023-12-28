import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { VideoData } from './dataFetch';
import { averageViewsPerDayLagDays } from './config';

export type ScatterChartDataPoint = {
  id: string;
  x: Date;
  y: number;
};

export type BarChartDataPoint = {
  x: string;
  y: number;
};

export function humanizeChannelAge(ageDuration: duration.Duration) {
  const years = ageDuration.years();
  const months = ageDuration.months();
  const days = ageDuration.days();
  let finalString = '';

  if (years > 0) finalString += `${years} year${years > 1 ? 's' : ''}`;
  if (months > 0) finalString += `, ${months} month${months > 1 ? 's' : ''}`;
  if (days > 0) finalString += `, ${days} day${days > 1 ? 's' : ''}`;

  return finalString;
}

export function calculateViewsPerDay(
  views: number,
  publishedAt: string,
  now: dayjs.Dayjs,
): number {
  const uploadDate = dayjs(publishedAt);
  return (
    views / Math.max(1, now.diff(uploadDate, 'day') - averageViewsPerDayLagDays)
  );
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
