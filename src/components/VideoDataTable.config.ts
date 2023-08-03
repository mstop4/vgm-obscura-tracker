import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { calculateViewsPerDay } from '../../lib/dataUtils';

type LikesDislikes = {
  likes: number;
  dislikes: number;
};

type Durations = {
  averageViewDuration: number;
  totalDuration: number;
};

dayjs.extend(duration);
const now = dayjs();

// Columns
export const columns: GridColDef[] = [
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
    valueGetter: (params: GridValueGetterParams): Durations => ({
      averageViewDuration: params.row.averageViewDuration,
      totalDuration: params.row.duration,
    }),
    valueFormatter: (params: GridValueFormatterParams<Durations>) => {
      const { averageViewDuration, totalDuration } = params.value;
      const averageDurationString = dayjs
        .duration(averageViewDuration, 'seconds')
        .format('m:ss');
      const viewDurationRatio = (
        (averageViewDuration / totalDuration) *
        100
      ).toFixed(1);

      return `${averageDurationString} (${viewDurationRatio}%)`;
    },
    sortComparator: (v1: Durations, v2: Durations) =>
      v1.averageViewDuration / v1.totalDuration -
      v2.averageViewDuration / v2.totalDuration,
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
    sortComparator: (v1: LikesDislikes, v2: LikesDislikes) =>
      v1.likes - v2.likes || v2.dislikes - v1.dislikes,
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
