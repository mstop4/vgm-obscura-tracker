import { AppBar, Card, Container, Paper, Typography } from '@mui/material';
import VideoDataTable from '@components/VideoDataTable';
import { YoutubeData, getChannelData } from '../../lib/dataFetch';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  weight: ['800'],
  subsets: ['latin'],
  display: 'swap',
});

export default async function Home() {
  const channelData: YoutubeData = await getChannelData();
  const lastUpdatedString = new Date(
    channelData.lastUpdated,
  ).toLocaleDateString();

  return (
    <>
      <AppBar position="static">
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontFamily: openSans.style.fontFamily,
            fontWeight: 800,
            p: '1rem',
          }}
        >
          VGM Obscura Stats
        </Typography>
      </AppBar>
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
