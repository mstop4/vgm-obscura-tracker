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
        </Paper>
      </Container>
      <Container maxWidth="xl" sx={{ mt: '1rem' }}>
        <Paper elevation={3}>
          <VideoDataTable videoData={channelData.data} />
        </Paper>
      </Container>
    </>
  );
}
