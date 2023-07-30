import { Container, Paper, Typography } from '@mui/material';
import { YoutubeData, getChannelData } from '../../../lib/dataFetch';
import ViewsChart from '@components/ViewsChart';

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
        height: '88dvh',
      }}
    >
      <Paper elevation={3} sx={{ width: '100%' }}>
        {channelData.status === 'ok' ? (
          <ViewsChart videoData={channelData.data} />
        ) : (
          <Typography>Error getting video data</Typography>
        )}
      </Paper>
    </Container>
  );
}
