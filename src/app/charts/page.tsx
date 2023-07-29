import { YoutubeData, getChannelData } from '../../../lib/dataFetch';
import ViewsChart from '@components/ViewsChart';

export default async function Charts() {
  const channelData: YoutubeData = await getChannelData();

  return <ViewsChart videoData={channelData.data} />;
}
