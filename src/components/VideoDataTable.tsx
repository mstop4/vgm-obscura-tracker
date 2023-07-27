import { VideoData } from '../../lib/dataFetch';

export type VideoDataTableProps = {
  videoData: Array<VideoData>;
};

export default function VideoDataTable(props: VideoDataTableProps) {
  console.log(props.videoData);

  return <p>Table</p>;
}
