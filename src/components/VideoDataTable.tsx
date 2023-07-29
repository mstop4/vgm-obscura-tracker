'use client';

import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { VideoData } from '../../lib/dataFetch';
import { calculateViewsPerDay } from '../../lib/dataUtils';
import { MS_PER_DAY, formatTime } from '../../lib/timeUtils';

export type VideoDataTableProps = {
  videoData: Array<VideoData>;
};

const now = new Date();

// Columns
const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 6, minWidth: 300 },
  {
    field: 'views',
    headerName: 'Views',
    type: 'number',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    minWidth: 100,
  },
  {
    field: 'publishedAt',
    headerName: 'Upload Date',
    flex: 3,
    minWidth: 120,
    valueFormatter: (params: GridValueFormatterParams<string>) =>
      new Date(params.value).toLocaleDateString(),
  },
  {
    field: 'viewsPerDay',
    headerName: 'Views/Day',
    type: 'number',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    minWidth: 100,
    valueGetter: (params: GridValueGetterParams) => {
      const { views, publishedAt } = params.row;
      return calculateViewsPerDay(views, publishedAt, now).toFixed(2);
    },
  },
  {
    field: 'hiatus',
    headerName: 'Hiatus (Days)',
    type: 'number',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    minWidth: 100,
  },
  {
    field: 'duration',
    headerName: 'Duration',
    flex: 2,
    minWidth: 100,
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      formatTime(params.value),
  },
  {
    field: 'averageViewDuration',
    headerName: 'Average View Duration',
    flex: 3,
    minWidth: 175,
    valueGetter: (params: GridValueGetterParams) => {
      const { averageViewDuration, duration } = params.row;
      const averageDurationString = formatTime(averageViewDuration);
      const viewDurationRatio = (
        (averageViewDuration / duration) *
        100
      ).toFixed(1);

      return `${averageDurationString} (${viewDurationRatio}%)`;
    },
  },
  {
    field: 'likes',
    headerName: 'Likes/Dislikes',
    flex: 3,
    minWidth: 110,
    valueGetter: (params: GridValueGetterParams) => {
      const { likes, dislikes } = params.row;
      const likeRatio = ((likes / (likes + dislikes)) * 100).toFixed(1);

      return `${likes} / ${dislikes}\n(${likeRatio}%)`;
    },
  },
  {
    field: 'comments',
    headerName: 'Comments',
    type: 'number',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    minWidth: 100,
  },
];

export default function VideoDataTable(props: VideoDataTableProps) {
  const { videoData } = props;
  let lastUploadDate: Date | null = null;

  // Add ids and hiatuses to video data
  const preparedVideoData = videoData.map(video => {
    let hiatus = 0;
    let currentUploadDate = new Date(video.publishedAt);

    if (lastUploadDate !== null) {
      hiatus = Math.floor(
        (currentUploadDate.getTime() - lastUploadDate.getTime()) / MS_PER_DAY,
      );
    }

    lastUploadDate = currentUploadDate;
    return {
      id: video.title,
      hiatus,
      ...video,
    };
  });

  return (
    <DataGrid
      rows={preparedVideoData}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 25 },
        },
      }}
    />
  );
}
