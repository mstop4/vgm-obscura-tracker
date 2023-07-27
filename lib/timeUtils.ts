export const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function formatTime(numSeconds: number): string {
  const minutes = Math.floor(numSeconds / 60);
  const seconds = String(numSeconds % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
}
