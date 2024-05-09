import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import get from 'lodash.get';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import SearchableSelectInput, {
  SearchableSelectInputProps,
} from '@/_components/shared/forms/SearchableSelectInput';
import api from '@/_lib/axios';
import { ApiError, PaginatedApiResponse } from '@/_types/api/api.type';

type ServerSelectInputProps = {
  route: string;
  id: string;
  labelGetter?: string;
  valueGetter?: string;
  selectedItemHook?: <T>(value: T) => void;
} & Omit<Omit<SearchableSelectInputProps, 'options'>, 'id'>;

export default function ServerSelectInputWithGetter({
  route,
  id,
  valueGetter = 'id',
  labelGetter = 'name',
  selectedItemHook,
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
  const options =
    optionsData?.data.map((item) => ({
      value: get(item, valueGetter) + '',
      label: get(item, labelGetter),
    })) || [];

  const { data: optionsDataForSelected } = useQuery<
    PaginatedApiResponse<Array<{ id: number }>>,
    AxiosError<ApiError>
  >([route], {
    keepPreviousData: true,
    queryFn: async () => api.get(route).then((res) => res.data),
  });
  const optionsForHook = optionsDataForSelected?.data;

  const { watch } = useFormContext();
  const selected = watch(id);
  React.useEffect(() => {
    if (selected === undefined) {
      return;
    }
    if (selectedItemHook) {
      if (optionsForHook) {
        let selectedItem: unknown = undefined;
        for (const p of optionsForHook) {
          if (p.id == selected) {
            selectedItem = p as unknown;
          }
        }
        selectedItemHook(selectedItem);
      }
    }
  }, [selected, selectedItemHook, optionsForHook]);

  //#endregion  //*======== Get Options ===========

  return (
    <SearchableSelectInput
      id={id}
      options={options}
      noOptionsMessage={() =>
        isLoading ? 'Getting options...' : 'No option found'
      }
      {...rest}
    />
  );
}
