import VideoDataTable from '@components/VideoDataTable';
import { YoutubeData, getChannelData } from '../../lib/dataFetch';

export default async function Home() {
  const channelData: YoutubeData = await getChannelData();

  return (
    <main>
      <h1>Welcome!</h1>
      <VideoDataTable videoData={channelData.data} />
    </main>
  );
}
