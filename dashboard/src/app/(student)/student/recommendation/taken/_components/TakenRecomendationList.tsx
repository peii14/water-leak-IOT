'use client';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ServerSelectInput from '@/_components/shared/forms/ServerSelectInput';
import UnderlineLink from '@/_components/shared/links/UnderlineLink';
import PopupFilter, {
  PopupFilterProps,
} from '@/_components/shared/table/PopupFilter';
import ServerTable from '@/_components/shared/table/ServerTable';
import Keywords from '@/_components/shared/tags/Keywords';
import StatusTags from '@/_components/shared/tags/Status';
import useServerTable from '@/_hooks/useServerTable';
import api from '@/_lib/axios';
import { preprocessAdditionalParam } from '@/_lib/preProcessAdditionalParams';
import { buildPaginatedTableURL } from '@/_lib/table';
import { FilterParams } from '@/_types/api/additionalParams';
import { ApiError, PaginatedApiResponse } from '@/_types/api/api.type';
import { SupervisorRecommendationProps } from '@/_types/entity/supervisor-receomendations';

type FilterProps = {
  status: string;
};

export default function TakenRecomendationStudentTable({
  session,
  facultyId,
}: {
  session: number;
  facultyId: number;
}) {
  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } =
    useServerTable<SupervisorRecommendationProps>();
  const columns: ColumnDef<SupervisorRecommendationProps>[] = [
    {
      header: 'No',
      cell: (cell) => cell.row.index + 1,
      size: 5,
    },
    {
      accessorKey: 'draft.title',
      header: 'Title',
      size: 20,
      cell: (cell) => (
        <UnderlineLink
          className='text-primary-600'
          href={`/student/recommendation/detail/${cell.row.original.id}`}
        >
          {cell.row.original.draft?.title}
        </UnderlineLink>
      ),
    },
    {
      accessorKey: 'draft.keywords',
      header: 'Topic area',
      size: 40,
      cell: (cell) => (
        <ul className='grid grid-cols-3 gap-3'>
          {cell.row.original.draft?.keywords.map((keyword) => (
            <Keywords keywords={keyword.name} key={keyword.id} />
          ))}
        </ul>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (cell) => (
        <StatusTags
          status={cell.row.original.draft?.status.name || ''}
          variant={
            cell.row.original.draft?.status.name === 'Available'
              ? 'success'
              : 'neutral'
          }
        />
      ),
      size: 12,
    },
  ];
  //#endregion  //*======== Table Definition ===========
  // #region //* =========== Topic area filter ===========
  const method = useForm();
  const { watch } = method;
  // #endregion  //*======== Topic area filter ===========
  // #region //* =========== Fetch Data ===========
  const [filterQuery, setFilterQuery] = useState<FilterProps>({
    status: '',
  });
  const additionalParam: FilterParams = {
    filter_key: [],
    filter_operator: [],
    filter_value: [],
    keywords_id: [],
    students_id: [],
    related_tables: [
      'draft.keywords',
      'draft.status',
      'supervisor',
      'students',
      'draft.keywords',
    ],
  };
  const addSpecificFilters = (
    params: FilterParams,
    globalFilter?: string,
    status?: string,
    keywords?: string
  ): FilterParams => {
    if (globalFilter) {
      params.filter_key.push('draft.title');
      params.filter_operator.push('globallyLike');
      params.filter_value.push(globalFilter);
      params.filter_key.push('draft.description');
      params.filter_operator.push('globallyLike');
      params.filter_value.push(globalFilter);
    }
    if (status) {
      params.filter_key.push('draft.status_id');
      params.filter_operator.push('eq');
      params.filter_value.push(status);
    }
    if (keywords) {
      params.keywords_id.push(keywords);
    }
    params.students_id.push(session);
    return params;
  };

  const additionalParamCleaned = addSpecificFilters(
    additionalParam,
    tableState.globalFilter,
    filterQuery.status,
    watch('keywordsFilter')
  );

  const cleanedAdditionalParam = preprocessAdditionalParam(
    additionalParamCleaned
  );

  const url = buildPaginatedTableURL({
    baseUrl: '/supervisor-recommendation',
    additionalParam: cleanedAdditionalParam,
    tableState: tableState,
  });
  const filterOption: PopupFilterProps<FilterProps>['filterOption'] = useMemo(
    () => [
      {
        id: 'status',
        name: 'Status',
        options: [
          { id: '5', name: 'Available' },
          { id: '6', name: 'Taken' },
        ],
      },
    ],
    []
  );

  const { data: topicAreaData } = useQuery<
    PaginatedApiResponse<SupervisorRecommendationProps[]>,
    ApiError
  >({
    queryKey: [url],
    keepPreviousData: true,
    enabled: !!session,
    queryFn: async () => await api.get(url).then((res) => res.data),
  });

  //#endregion  //*======== Fetch Data ===========

  return (
    <ServerTable
      tableState={tableState}
      setTableState={setTableState}
      meta={topicAreaData?.meta}
      columns={columns}
      header={
        <>
          <FormProvider {...method}>
            <ServerSelectInput
              className='w-52'
              id='keywordsFilter'
              label=''
              placeholder='Filter by topic area'
              route={`/master/keywords?filter_key=faculty_id&filter_operator=eq&filter_value=${facultyId}`}
            />
          </FormProvider>
          <PopupFilter
            filterOption={filterOption}
            setFilterQuery={setFilterQuery}
          />
        </>
      }
      data={topicAreaData?.data || []}
      withFilter
    />
  );
}
