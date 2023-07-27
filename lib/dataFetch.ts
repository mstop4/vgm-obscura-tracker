export type YoutubeData = {
  status: string;
  reason?: string;
  startDate: string;
  endDate: string;
  data: Array<VideoData>;
};

export type VideoData = {
  title: string;
  duration: number;
  publishedAt: string;
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
  estimatedMinutesWatched: number;
  averageViewDuration: number;
};

export async function getChannelData(): Promise<YoutubeData> {
  const res = await fetch(`${process.env.SERVER_URL}/youtube/api/channelData`);
  return res.json();
}
