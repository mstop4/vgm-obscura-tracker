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
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
  estimatedMinutesWatched: number;
  averageViewDuration: number;
};

export async function getChannelData() {
  const data = await fetch(`${process.env.SERVER_URL}/api/channelData`);
  return data;
}
