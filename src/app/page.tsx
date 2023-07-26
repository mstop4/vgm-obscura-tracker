import ChannelOverview from '@components/ChannelDataTable';
import { getChannelData } from '../../lib/dataFetch';

export default async function Home() {
  console.log('Fetching channel data...');
  // const channelData = await getChannelData();
  console.log('Ok!');
  return <ChannelOverview channelData={{}} />;
}
