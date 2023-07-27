import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { VideoData } from '../../lib/dataFetch';
import { MS_PER_DAY, formatTime } from '../../lib/timeUtils';

export type VideoDataTableProps = {
  videoData: Array<VideoData>;
};

export default function VideoDataTable(props: VideoDataTableProps) {
  const { videoData } = props;
  const now = new Date();
  let lastUploadDate: Date | null = null;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Views</TableCell>
          <TableCell>Upload Date</TableCell>
          <TableCell>Views/Day</TableCell>
          <TableCell>Hiatus (Days)</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Average View Duration</TableCell>
          <TableCell>Likes/Dislikes</TableCell>
          <TableCell>Comments</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {videoData.map(video => {
          const viewDurationRatio = (
            (video.averageViewDuration / video.duration) *
            100
          ).toFixed(1);

          const likeRatio = (
            (video.likes / (video.likes + video.dislikes)) *
            100
          ).toFixed(1);

          const uploadDate = new Date(video.publishedAt);
          const viewsPerDay = (
            video.views /
            ((now.getTime() - uploadDate.getTime()) / MS_PER_DAY)
          ).toFixed(2);

          const durationString = formatTime(video.duration);
          const averageDurationString = formatTime(video.averageViewDuration);
          const hiatus =
            lastUploadDate !== null
              ? (
                  (uploadDate.getTime() - lastUploadDate.getTime()) /
                  MS_PER_DAY
                ).toFixed(0)
              : 0;

          lastUploadDate = uploadDate;

          return (
            <TableRow key={video.title}>
              <TableCell>{video.title}</TableCell>
              <TableCell>{video.views}</TableCell>
              <TableCell>{uploadDate.toLocaleDateString()}</TableCell>
              <TableCell>{viewsPerDay}</TableCell>
              <TableCell>{hiatus}</TableCell>
              <TableCell>{durationString}</TableCell>
              <TableCell>
                {averageDurationString} ({viewDurationRatio}%)
              </TableCell>
              <TableCell>
                {video.likes} / {video.dislikes}
                <br />({likeRatio}%)
              </TableCell>
              <TableCell>{video.comments}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
