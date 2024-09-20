import { type DataGridProps } from '@mui/x-data-grid';
import { type UseQueryResult } from '@tanstack/react-query';
import { IDataViewController, IResultController } from '../../filter/types/filter.types';
import { FetchParameters } from '../../table-list-async/types/TableListAsync.type';

export type PropsTableAsyncV2 = {
  dataFetchService: (params?: FetchParameters) => UseQueryResult<{
    data: any[]
    meta?: { filter_count: number }
    aggregate?: { countDistinct: string }
  }>
  columns: (DataGridProps['columns'][number] & {
    searchable?: boolean
  })[]
  renderEmptyComponent?: React.ReactNode;
  type?: 'inline' | 'sidebar' | 'card-group'
  resultController?: IResultController[]
  dataViewController?: IDataViewController[]
};
