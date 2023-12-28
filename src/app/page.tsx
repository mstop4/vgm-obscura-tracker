import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Card, Container, Box, Paper, Typography } from '@mui/material';
import VideoDataTable from '@components/VideoDataTable';
import { YoutubeData, getChannelData } from '../../lib/dataFetch';
import { humanizeChannelAge } from '../../lib/dataUtils';
import { averageViewsPerDayLagDays } from '../../lib/config';

dayjs.extend(duration);
dayjs.extend(relativeTime);

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
  const channelAgeHuman = humanizeChannelAge(
    dayjs.duration(channelAgeDays, 'day'),
  );
  const totalViewsPerDay = (
    totalViews / Math.max(1, channelAgeDays - averageViewsPerDayLagDays)
  ).toFixed(2);

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
          flexWrap: 'wrap',
        }}
      >
        <Card sx={{ minWidth: 200 }}>
          <Typography align="center" sx={{ mx: '0.75rem', my: '0.5rem' }}>
            <Box component="span" fontWeight="fontWeightBold">
              Last updated:&nbsp;
            </Box>
            {lastUpdatedString}
          </Typography>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <Typography align="center" sx={{ mx: '0.75rem', my: '0.5rem' }}>
            <Box component="span" fontWeight="fontWeightBold">
              First Video Age:&nbsp;
            </Box>
            {channelAgeHuman}
          </Typography>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <Typography align="center" sx={{ mx: '0.75rem', my: '0.5rem' }}>
            <Box component="span" fontWeight="fontWeightBold">
              Total Views:&nbsp;
            </Box>
            {totalViews.toLocaleString()}
          </Typography>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <Typography align="center" sx={{ mx: '0.75rem', my: '0.5rem' }}>
            <Box component="span" fontWeight="fontWeightBold">
              Total Views/Day:&nbsp;
            </Box>
            {totalViewsPerDay.toLocaleString()}
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
