'use client';

import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { VideoData } from '../../lib/dataFetch';
import { MS_PER_DAY, formatTime } from '../../lib/timeUtils';

export type VideoDataTableProps = {
  videoData: Array<VideoData>;
};

const now = new Date();

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 6 }, // 400
  {
    field: 'views',
    headerName: 'Views',
    type: 'number',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
  }, // 100
  {
    field: 'publishedAt',
    headerName: 'Upload Date',
    flex: 3,
    valueFormatter: (params: GridValueFormatterParams<string>) =>
      new Date(params.value).toLocaleDateString(),
  }, // 120
  {
    field: 'viewsPerDay',
    headerName: 'Views/Day',
    type: 'number',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
    valueGetter: (params: GridValueGetterParams) => {
      const { views, publishedAt } = params.row;
      const uploadDate = new Date(publishedAt);
      return (
        views /
        ((now.getTime() - uploadDate.getTime()) / MS_PER_DAY)
      ).toFixed(2);
    },
  }, // 100
  {
    field: 'hiatus',
    headerName: 'Hiatus (Days)',
    type: 'number',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'duration',
    headerName: 'Duration',
    flex: 2,
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      formatTime(params.value),
  }, // 100
  {
    field: 'averageViewDuration',
    headerName: 'Average View Duration',
    flex: 3,
    valueGetter: (params: GridValueGetterParams) => {
      const { averageViewDuration, duration } = params.row;
      const averageDurationString = formatTime(averageViewDuration);
      const viewDurationRatio = (
        (averageViewDuration / duration) *
        100
      ).toFixed(1);

      return `${averageDurationString} (${viewDurationRatio}%)`;
    },
  }, // 175
  {
    field: 'likes',
    headerName: 'Likes/Dislikes',
    flex: 3,
    valueGetter: (params: GridValueGetterParams) => {
      const { likes, dislikes } = params.row;
      const likeRatio = ((likes / (likes + dislikes)) * 100).toFixed(1);

      return `${likes} / ${dislikes}\n(${likeRatio}%)`;
    },
  }, // 110
  {
    field: 'comments',
    headerName: 'Comments',
    type: 'number',
    flex: 2,
    align: 'left',
    headerAlign: 'left',
  }, // 100
];

export default function VideoDataTable(props: VideoDataTableProps) {
  const { videoData } = props;
  let lastUploadDate: Date | null = null;

  // Add id to video data
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
          paginationModel: { page: 0, pageSize: 50 },
        },
      }}
    />
  );
}
