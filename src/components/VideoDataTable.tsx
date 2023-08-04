'use client';

import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './VideoDataTable.config';
import { VideoData } from '../../lib/dataFetch';

export type VideoDataTableProps = {
  videoData: Array<VideoData>;
};

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
