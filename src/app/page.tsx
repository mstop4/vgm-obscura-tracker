import dayjs from 'dayjs';
import { Card, Container, Paper, Typography } from '@mui/material';
import VideoDataTable from '@components/VideoDataTable';
import { YoutubeData, getChannelData } from '../../lib/dataFetch';

export default async function Home() {
  const channelData: YoutubeData = await getChannelData();
  const lastUpdatedString = dayjs(channelData.lastUpdated).format(
    'MMMM D, YYYY',
  );
  const totalViews = channelData.data.reduce(
    (total, video) => total + video.views,
    0,
  );

  const firstVideoDate = dayjs(channelData.data[0].publishedAt);
  const channelAgeDays = dayjs().diff(firstVideoDate, 'day');
  const channelAge;
  const totalViewsPerDay = (totalViews / channelAgeDays).toFixed(2);

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
      <Container
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <Card sx={{ minWidth: 200 }}>
          <Typography align="center" sx={{ mx: '0.75rem', my: '0.5rem' }}>
            Last updated: {lastUpdatedString}
          </Typography>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <Typography align="center" sx={{ mx: '0.75rem', my: '0.5rem' }}>
            Total Views: {totalViews}
          </Typography>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <Typography align="center" sx={{ mx: '0.75rem', my: '0.5rem' }}>
            Total Views/Day: {totalViewsPerDay}
          </Typography>
        </Card>
      </Container>

      <Paper elevation={3} sx={{ width: '100%', height: '78dvh' }}>
        {channelData.status === 'ok' ? (
          <VideoDataTable videoData={channelData.data} />
        ) : (
          <Typography>Error getting video data</Typography>
        )}
      </Paper>
    </Container>
  );
}
