import { Container, Typography } from '@mui/material';
// import VideoDataTable from '@components/VideoDataTable';
import { YoutubeData, getChannelData } from '../../lib/dataFetch';
import styles from '@styles/Home.module.scss';

export default async function Home() {
  // const channelData: YoutubeData = await getChannelData();

  return (
    <Container className={styles.contain} maxWidth="lg">
      <Typography>Test</Typography>
    </Container>
  );
}
