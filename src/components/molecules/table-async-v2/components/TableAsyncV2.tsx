import { Stack } from "@mui/material";
import { useState } from "react";
import { Filter } from "../../filter";
import { IFilterResult } from "../../filter/types/filterResult.types";
import { TableListAsync } from "../../table-list-async";
import { FetchParameters } from "../../table-list-async/types/TableListAsync.type";
import { PropsTableAsyncV2 } from "../types/TableAsyncV2.type";

export const TableAsyncV2 = ({
  dataFetchService,
  columns,
  renderEmptyComponent,
  dataViewController,
  resultController,
}: PropsTableAsyncV2) => {
  const [filterParams, setFilterParams] = useState<IFilterResult>();

  const handleFilterChange = (params: IFilterResult) => {
    setFilterParams(params)
  };

  const modifiedDataFetchService = (params?: FetchParameters) => {
    return dataFetchService({
      ...params,
      filterResult: filterParams,
    });
  };

  return (
    <Stack direction={'column'}>
      <Filter
        dataViewController={dataViewController}
        resultController={resultController}
        onChange={handleFilterChange}
      />
      <TableListAsync
        dataFetchService={modifiedDataFetchService}
        columns={columns}
        renderEmptyComponent={renderEmptyComponent}
      />
    </Stack>
  )
}
