import dayjs from 'dayjs';
import { Card, Container, Paper, Typography } from '@mui/material';
import VideoDataTable from '@components/VideoDataTable';
import { YoutubeData, getChannelData } from '../../lib/dataFetch';

export default async function Home() {
  const channelData: YoutubeData = await getChannelData();
  const lastUpdatedString = dayjs(channelData.lastUpdated).format(
    'MMMM D, YYYY',
  );

  return (
    <>
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
        <Card sx={{ width: 200 }}>
          <Typography align="center">
            Last updated: {lastUpdatedString}
          </Typography>
        </Card>

        <Paper elevation={3} sx={{ width: '100%', height: '78dvh' }}>
          {channelData.status === 'ok' ? (
            <VideoDataTable videoData={channelData.data} />
          ) : (
            <Typography>Error getting video data</Typography>
          )}
        </Paper>
      </Container>
    </>
  );
}
