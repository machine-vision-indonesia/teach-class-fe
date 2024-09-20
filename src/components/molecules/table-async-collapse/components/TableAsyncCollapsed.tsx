import React, { useState } from 'react'

import { PropsTableAsyncCollapsed } from '../types/TableAsyncCollapsed.type'
import { Table } from './Table'
import { Stack } from '@mui/material'
import { IFilterResult } from '../../filter/types/filterResult.types'
import { FetchParameters } from '../../select-async'
import { Filter } from '../../filter'

/**
 * TableAsyncCollapsed component displays a table with collapsible rows and asynchronous data fetching.
 * It supports grouping and custom configurations for displaying data.
 *
 * @param {object} props - The component props
 * @param {function} props.dataFetchService - The service function to fetch data for the table
 * @param {Array<object>} props.columns - Configuration for table columns, including field names, header names, and more
 * @param {Array<IResultController>} props.resultController - Configuration for result controllers, used for controlling filter data display
 * @param {boolean} props.isCollapsed - Configure for table set collapsed or not by default is not but when active filtered will be set to collapsed
 * @param {string} props.groupFieldKeyTitle - The key used to display the title of the grouped data
 * @param {string} props.groupName - The name field of the grouping list category (must be same object key with the backend response)
 *
 * @returns {React.FC} The TableAsyncCollapsed component
 */

export const TableAsyncCollapsed = ({
  dataFetchService,
  limit = 10,
  defaultSortBy,
  maxWidth = '100%',
  width = '100%',
  dataKey = 'data',
  withOnScroll = true,
  rowSelection = false,
  countBy = 'id',
  emptyText = 'No data created',
  isCollapsed = false,
  groupFieldKeyTitle,
  groupName = 'user',
  columns,
  dataViewController,
  resultController,
  ...props
}: PropsTableAsyncCollapsed) => {
  const [filterParams, setFilterParams] = useState<IFilterResult>();

  const handleFilterChange = (params: IFilterResult) => {
    setFilterParams(params);
  };

  const modifiedDataFetchService = (params?: FetchParameters) => {
    return dataFetchService({
      ...params,
      filterResult: filterParams,
    });
  };

  const isFiltered = filterParams?.resultController && Object.keys(filterParams.resultController).length > 0;

  return (
    <Stack direction={'column'}>
      <Filter
        dataViewController={dataViewController}
        resultController={resultController}
        onChange={handleFilterChange}
      />
      <Table
        {...props}
        dataFetchService={modifiedDataFetchService}
        columns={columns}
        isCollapsed={(!isFiltered ? false : true) ?? isCollapsed}
        groupFieldKeyTitle={groupFieldKeyTitle}
        groupName={groupName}
      />
    </Stack>
  );
};
