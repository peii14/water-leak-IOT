import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import get from 'lodash.get';
import * as React from 'react';

import SearchableSelectInput, {
  SearchableSelectInputProps,
} from '@/_components/shared/forms/SearchableSelectInput';
import api from '@/_lib/axios';
import { ApiError, PaginatedApiResponse } from '@/_types/api/api.type';

type ServerSelectInputProps = {
  route: string;
  secondaryLable?: string;
  labelGetter?: string;
  valueGetter?: string;
} & Omit<SearchableSelectInputProps, 'options'>;

export default function ServerSelectInput({
  route,
  valueGetter = 'id',
  labelGetter = 'name',
  secondaryLable = '',
  ...rest
}: ServerSelectInputProps) {
  //#region  //*=========== Get Options ===========
  const { data: optionsData, isLoading } = useQuery<
    PaginatedApiResponse<Array<{ id: number; name: string }>>,
    AxiosError<ApiError>
  >([route], {
    keepPreviousData: true,
    queryFn: async () => api.get(route).then((res) => res.data),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getAllPartNames(item: any[]) {
    if (Array.isArray(item)) {
      return item.map((part) => part.name);
    }
    return [];
  }
  const options =
    optionsData?.data.map((item) => ({
      value: get(item, valueGetter) + '',
      label:
        get(item, labelGetter) +
        (secondaryLable
          ? ` - ${getAllPartNames(get(item, secondaryLable))}`
          : ''),
    })) || [];
  //#endregion  //*======== Get Options ===========

  return (
    <SearchableSelectInput
      options={options}
      noOptionsMessage={() =>
        isLoading ? 'Getting options...' : 'No option found'
      }
      {...rest}
    />
  );
}
