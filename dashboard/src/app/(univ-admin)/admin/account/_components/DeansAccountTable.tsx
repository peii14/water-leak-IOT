'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Edit2Icon, Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';

import IconButton from '@/_components/shared/buttons/IconButton';
import IconLink from '@/_components/shared/links/IconLink';
import ServerTable from '@/_components/shared/table/ServerTable';
import useMutationToast from '@/_hooks/toast/useMutationToast';
import useDialog from '@/_hooks/useDialog';
import useServerTable from '@/_hooks/useServerTable';
import api from '@/_lib/axios';
import { buildPaginatedTableURL } from '@/_lib/table';
import { useItemStorage } from '@/_store/useSuperAdminStorage';
import { ApiResponse, PaginatedApiResponse } from '@/_types/api/api.type';
import { UserProps } from '@/_types/entity/user';

export default function DeansAccountTable() {
  const dialog = useDialog();
  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<UserProps>();
  const columns: ColumnDef<UserProps>[] = [
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
      header: 'Nama',
      size: 15,
    },
    {
      accessorKey: 'username',
      header: 'Username',
      size: 15,
    },
    {
      accessorKey: 'faculties.name',
      header: 'Faculty',
      cell: (cell) => cell.row.original?.faculties[0]?.name,
      size: 15,
    },
    {
      header: 'Action',
      cell: (cell) => (
        <div className='flex gap-3'>
          <IconLink
            icon={Edit2Icon}
            href={`/admin/account/${cell.row.original.id}`}
          />
          <IconButton
            icon={Trash2Icon}
            onClick={() =>
              onDelete({
                id: cell.row.original.id.toString(),
                name: cell.row.original.name,
              })
            }
          />
        </div>
      ),
      size: 15,
    },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========

  const url = buildPaginatedTableURL({
    baseUrl: '/master/users',
    tableState,
    additionalParam: {
      filter_key: tableState.globalFilter ? ['name', 'role_id'] : ['role_id'],
      filter_operator: tableState.globalFilter ? ['like', 'eq'] : ['eq'],
      filter_value: [tableState.globalFilter ?? null, 3],
      related_tables: ['faculties'],
    },
  });

  const { data: queryData, refetch: refetchTable } = useQuery<
    PaginatedApiResponse<UserProps[]>,
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
  // #region //*======== Table Action ===========
  const { mutateAsync: onDeleleteMutation } = useMutationToast<
    ApiResponse<undefined>,
    { id: string }
  >(
    useMutation(({ id }) => {
      return api.delete(`/master/users`, { data: id }).then((res) => res.data);
    }),
    {
      loading: 'Deleting account...',
      success: 'Account deleted successfully',
      error: 'Failed to delete account',
    }
  );
  const onDelete = ({ name, id }: { name: string; id: string }) => {
    dialog({
      title: (
        <>
          Delete user : <strong>{name}</strong>
        </>
      ),
      description: (
        <>
          Are you sure to delete <strong>{name}</strong>?
        </>
      ),
      submitText: 'Delete',
      variant: 'danger',
      listenForLoadingToast: true,
    }).then(() => {
      onDeleleteMutation({ id: id }).then(() => refetchTable());
    });
  };
  //#endregion  //*======== Table Action ===========
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
