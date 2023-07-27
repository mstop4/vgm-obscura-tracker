import { Container, Typography } from '@mui/material';
// import VideoDataTable from '@components/VideoDataTable';
import { YoutubeData, getChannelData } from '../../lib/dataFetch';
import styles from '@styles/Home.module.scss';

export default async function Home() {
  // const channelData: YoutubeData = await getChannelData();

  return (
    <Container maxWidth="lg">
      <Typography align="center" variant="h2">
        VGM Obscura Stats
      </Typography>
    </Container>
  );
}
