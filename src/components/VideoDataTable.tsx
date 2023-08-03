'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  DataGrid,
  GridColDef,
  GridComparatorFn,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { VideoData } from '../../lib/dataFetch';
import { calculateViewsPerDay } from '../../lib/dataUtils';

export type VideoDataTableProps = {
  videoData: Array<VideoData>;
};

type LikesDislikes = {
  likes: number;
  dislikes: number;
};

dayjs.extend(duration);
const now = dayjs();

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
      dayjs(params.value).format('M/D/YYYY'),
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
      dayjs.duration(params.value, 'seconds').format('m:ss'),
  },
  {
    field: 'averageViewDuration',
    headerName: 'Average View Duration',
    flex: 3,
    minWidth: 175,
    valueGetter: (params: GridValueGetterParams) => {
      const { averageViewDuration, duration } = params.row;
      const averageDurationString = dayjs
        .duration(params.value, 'seconds')
        .format('m:ss');
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
    valueGetter: (params: GridValueGetterParams): LikesDislikes => ({
      likes: params.row.likes,
      dislikes: params.row.dislikes,
    }),
    valueFormatter: (params: GridValueFormatterParams<LikesDislikes>) => {
      const { likes, dislikes } = params.value;
      const likeRatio = ((likes / (likes + dislikes)) * 100).toFixed(1);

      return `${likes} / ${dislikes}\n(${likeRatio}%)`;
    },
    sortComparator: (v1: LikesDislikes, v2: LikesDislikes) => {
      return v1.likes - v2.likes || v2.dislikes - v1.dislikes;
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
  let lastUploadDate: dayjs.Dayjs | null = null;

  // Add ids and hiatuses to video data
  const preparedVideoData = videoData.map(video => {
    let hiatus = 0;
    let currentUploadDate = dayjs(video.publishedAt);

    if (lastUploadDate !== null) {
      hiatus = currentUploadDate.diff(lastUploadDate, 'day');
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
        sorting: {
          sortModel: [{ field: 'publishedAt', sort: 'desc' }],
        },
      }}
    />
  );
}
