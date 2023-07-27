import { Container, Paper, Typography } from '@mui/material';
import VideoDataTable from '@components/VideoDataTable';
import { YoutubeData, getChannelData } from '../../lib/dataFetch';
import { Open_Sans } from 'next/font/google';
import '@styles/Home.scss';

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
      <Container maxWidth="xl" sx={{ mt: '1rem' }}>
        <Paper elevation={3}>
          <Typography
            align="center"
            variant="h2"
            component="h1"
            sx={{
              fontFamily: openSans.style.fontFamily,
              fontWeight: 800,
              p: '1rem',
            }}
          >
            VGM Obscura Stats
          </Typography>
          <Typography>Last updated: {lastUpdatedString}</Typography>
        </Paper>
      </Container>
      <Container maxWidth="xl" sx={{ mt: '1rem' }}>
        <Paper elevation={3}>
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
