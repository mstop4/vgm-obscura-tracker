import { Container, Card, Paper, Typography } from '@mui/material';
import { YoutubeData, getChannelData } from '../../../lib/dataFetch';
import ViewsChart from '@components/ViewsChart';
import ViewsPerDayChart from '@components/ViewsPerDayChart';

export default async function Charts() {
  const channelData: YoutubeData = await getChannelData();

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{ m: '1rem', width: '64dvw', height: '36dvw', minHeight: '400px' }}
      >
        {channelData.status === 'ok' ? (
          <ViewsChart videoData={channelData.data} />
        ) : (
          <Typography>Error getting video data</Typography>
        )}
      </Card>

      <Card
        sx={{ m: '1rem', width: '64dvw', height: '36dvw', minHeight: '400px' }}
      >
        {channelData.status === 'ok' ? (
          <ViewsPerDayChart videoData={channelData.data} />
        ) : (
          <Typography>Error getting video data</Typography>
        )}
      </Card>
    </Container>
  );
}
