'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon } from 'lucide-react';
import { useEffect } from 'react';

import IconButton from '@/_components/shared/buttons/IconButton';
import ServerTable from '@/_components/shared/table/ServerTable';
import StatusTags from '@/_components/shared/tags/Status';
import useServerTable from '@/_hooks/useServerTable';
import api from '@/_lib/axios';
import { buildPaginatedTableURL } from '@/_lib/table';
import { useItemStorage } from '@/_store/useSuperAdminStorage';
import { PaginatedApiResponse } from '@/_types/api/api.type';
import { GroupsProps } from '@/_types/entity/groups';
import ThesisAccessDetailModal from '@/app/(deans)/deans/thesis-access/_components/ThesisAccessDeansModal';

export default function ThesisAccessSpvTable() {
  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<GroupsProps>();
  const columns: ColumnDef<GroupsProps>[] = [
    {
      header: 'No',
      cell: (cell) =>
        tableState.pagination.pageSize * tableState.pagination.pageIndex +
        cell.row.index +
        1,
      size: 5,
    },
    {
      accessorKey: 'name',
      header: 'Group',
      size: 7,
    },
    {
      accessorKey: 'Major',
      header: 'Major',
      cell: (cell) => cell.row.original.majors.name,
      size: 10,
    },
    {
      accessorKey: 'students',
      header: 'Student',
      cell: (cell) => cell.row.original.students.length,
      size: 5,
    },
    {
      accessorKey: 'supervisors',
      header: 'Supervisor',
      cell: (cell) => (
        <ul>
          {cell.row.original.supervisors.length === 0
            ? '-'
            : cell.row.original.supervisors.map((supervisor) => (
                <li key={supervisor.id}>{supervisor.name}</li>
              ))}
        </ul>
      ),
      size: 5,
    },
    {
      accessorKey: 'group_status',
      header: 'Status',
      cell: (cell) => (
        <StatusTags
          status={cell.row.original.group_status ? 'Open' : 'Closed'}
          variant={cell.row.original.group_status ? 'success' : 'danger'}
        />
      ),
      size: 7,
    },

    {
      header: 'Action',
      cell: (cell) => (
        <div className='flex gap-3'>
          <ThesisAccessDetailModal
            title={`Group ${cell.row.original.name} Detail`}
            group={cell.row.original}
          >
            {({ openModal }) => (
              <IconButton
                onClick={openModal}
                icon={EyeIcon}
                variant='outline'
              />
            )}
          </ThesisAccessDetailModal>
        </div>
      ),
      size: 15,
    },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========

  const url = buildPaginatedTableURL({
    baseUrl: '/master/groups',
    tableState,
    additionalParam: {
      filter_key: ['name'],
      filter_operator: ['like'],
      filter_value: [tableState.globalFilter],
      related_tables: ['majors', 'students', 'supervisors'],
    },
  });

  const { data: queryData, refetch: refetchTable } = useQuery<
    PaginatedApiResponse<GroupsProps[]>,
    Error
  >([url], {
    keepPreviousData: true,
    queryFn: async () => api.get(url).then((res) => res.data),
  });
  const whichStorage = useItemStorage((state) => state.whichStorage);
  useEffect(() => {
    refetchTable();
  }, [whichStorage, refetchTable]);
  //#endregion  //*======== Fetch Data ===========

  return (
    <ServerTable
      columns={columns}
      data={queryData?.data ?? []}
      meta={queryData?.meta}
      tableState={tableState}
      setTableState={setTableState}
      className='mt-5'
      withFilter
    />
  );
}
