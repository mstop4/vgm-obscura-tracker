import { MS_PER_DAY } from './timeUtils';

export function calculateViewsPerDay(
  views: number,
  publishedAt: string,
  now: Date,
) {
  const uploadDate = new Date(publishedAt);
  return views / ((now.getTime() - uploadDate.getTime()) / MS_PER_DAY);
}
