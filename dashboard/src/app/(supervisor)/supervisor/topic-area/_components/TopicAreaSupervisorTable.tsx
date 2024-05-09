'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';

import IconButton from '@/_components/shared/buttons/IconButton';
import PaginatedTable from '@/_components/shared/table/PaginatedTable';
import useMutationToast from '@/_hooks/toast/useMutationToast';
import useDialog from '@/_hooks/useDialog';
import useServerTable from '@/_hooks/useServerTable';
import api from '@/_lib/axios';
import { buildPaginatedTableURL } from '@/_lib/table';
import {
  ApiError,
  ApiResponse,
  PaginatedApiResponse,
} from '@/_types/api/api.type';
import { KeywordProps } from '@/_types/entity/keywords';
import { UserProps } from '@/_types/entity/user';
import TopicAreaSupervisorForm from '@/app/(supervisor)/supervisor/topic-area/_components/TopicAreaSupervisorForm';

export default function TopicAreaSupervisorTable({
  session,
  faculty_id,
}: {
  session: number;
  faculty_id: number;
}) {
  const dialog = useDialog();
  //#region  //*=========== Table Definition ===========
  const { tableState } = useServerTable<KeywordProps>();
  const columns: ColumnDef<KeywordProps>[] = [
    {
      header: 'No',
      cell: (cell) => cell.row.index + 1,
      size: 5,
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      id: 'actions',
      header: 'Action',
      cell: (data) => (
        <IconButton
          onClick={() =>
            onDelete({
              id: data.row.original.id.toString(),
              name: data.row.original.name,
            })
          }
          icon={TrashIcon}
          variant='outline'
        />
      ),
    },
  ];
  //#endregion  //*======== Table Definition ===========
  // #region //* =========== Fetch Data ===========

  const url = buildPaginatedTableURL({
    baseUrl: '/master/keywords/account',
    additionalParam: {
      filter_key: 'name',
      filter_operator: 'like',
      filter_value: tableState.globalFilter,
      user_id: session.toString(),
      related_tables: ['keywords'],
    },
    tableState,
  });
  const { data: topicAreaData, refetch: refetchTable } = useQuery<
    PaginatedApiResponse<UserProps>,
    ApiError
  >({
    queryKey: [url],
    keepPreviousData: true,
    queryFn: async () => await api.get(url).then((res) => res.data),
  });

  //#endregion  //*======== Fetch Data ===========

  // #region //* =========== Delete Data ===========
  const { mutateAsync: onDeleleteMutation } = useMutationToast<
    ApiResponse<undefined>,
    { id: string }
  >(
    useMutation(({ id }) => {
      return api
        .delete(`/master/keywords/account`, { data: { keywords_id: id } })
        .then((res) => res.data);
    }),
    {
      loading: 'Removing topic area...',
      success: 'Topic area removed successfully',
      error: 'Failed to remove topic area',
    }
  );
  const onDelete = async ({ id, name }: { id: string; name: string }) => {
    dialog({
      title: (
        <>
          Remove Topic area <strong>{name}</strong> from your account?
        </>
      ),
      description: 'This action cannot be undone.',
      submitText: 'Delete',
      variant: 'danger',
      listenForLoadingToast: true,
    }).then(() => {
      onDeleleteMutation({ id: id }).then(() => refetchTable());
    });
  };

  // #endregion  //*======== Delete Data ===========
  return (
    <>
      <section className='my-5 w-1/3'>
        <TopicAreaSupervisorForm
          refetch={refetchTable}
          faculty_id={faculty_id}
        />
      </section>
      <PaginatedTable
        columns={columns}
        data={topicAreaData?.data.keywords || []}
        withFilter
      />
    </>
  );
}
