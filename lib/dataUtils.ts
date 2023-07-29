import { VideoData } from './dataFetch';
import { MS_PER_DAY } from './timeUtils';

export type ScatterChartDataPoint = {
  id: string;
  x: number;
  y: number;
};

export function calculateViewsPerDay(
  views: number,
  publishedAt: string,
  now: Date,
): number {
  const uploadDate = new Date(publishedAt);
  return views / ((now.getTime() - uploadDate.getTime()) / MS_PER_DAY);
}

export function prepareViewsChartData(
  videoData: Array<VideoData>,
): Array<ScatterChartDataPoint> {
  let firstUploadDate: Date | null = null;

  return videoData.map(video => {
    const currentUploadDate = new Date(video.publishedAt);
    let x;

    if (firstUploadDate === null) {
      x = 0;
      firstUploadDate = currentUploadDate;
    } else {
      x = Math.floor(
        (currentUploadDate.getTime() - firstUploadDate.getTime()) / MS_PER_DAY,
      );
    }

    return {
      id: video.title,
      x,
      y: video.views,
    };
  });
}
