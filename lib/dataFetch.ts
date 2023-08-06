export type YoutubeData = {
  status: string;
  reason?: string;
  startDate: string;
  endDate: string;
  lastUpdated: Date;
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
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/youtube/api/channelData`,
      { next: { revalidate: 3600 } },
    );
    return res.json();
  } catch (e) {
    let message = 'Unknown error';
    if (e instanceof Error) message = e.message;
    console.log(message);
    console.log(`${process.env.SERVER_URL}/youtube/api/channelData`);

    return {
      status: 'error',
      startDate: '',
      endDate: '',
      lastUpdated: new Date(),
      data: [],
    };
  }
}
