'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, TrashIcon } from 'lucide-react';

import Button from '@/_components/shared/buttons/Button';
import IconButton from '@/_components/shared/buttons/IconButton';
import ServerTable from '@/_components/shared/table/ServerTable';
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
import EditTopicAreaModal from '@/app/(deans)/deans/topic-area/_components/EditTopicAreaModal';
import TopicAreaForm from '@/app/(deans)/deans/topic-area/_components/TopicAreaForm';

export default function TopicAreaTable() {
  const dialog = useDialog();
  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<KeywordProps>();
  const columns: ColumnDef<KeywordProps>[] = [
    {
      header: 'No',
      cell: (cell) => cell.row.index + 1,
      size: 5,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      size: 20.8,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: (data) => (
        <div className='flex w-max space-x-3'>
          <EditTopicAreaModal
            id={data.row.original.id}
            name={data.row.original.name}
            refetch={refetchTable}
            title={`Edit ${data.row.original.name} Faculty`}
          >
            {({ openModal }) => (
              <Button
                rightIcon={EditIcon}
                variant='primary'
                onClick={openModal}
              >
                Edit
              </Button>
            )}
          </EditTopicAreaModal>
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
        </div>
      ),
    },
  ];
  //#endregion  //*======== Table Definition ===========
  // #region //* =========== Fetch Data ===========

  const url = buildPaginatedTableURL({
    baseUrl: '/master/keywords',
    additionalParam: {
      filter_key: 'name',
      filter_operator: 'like',
      filter_value: tableState.globalFilter,
    },
    tableState,
  });
  const { data: topicAreaData, refetch: refetchTable } = useQuery<
    PaginatedApiResponse<KeywordProps[]>,
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
        .delete(`/master/keywords`, { data: id })
        .then((res) => res.data);
    }),
    {
      loading: 'Deleting topic area...',
      success: 'Topic area deleted successfully',
      error: 'Failed to delete topic area',
    }
  );
  const onDelete = async ({ id, name }: { id: string; name: string }) => {
    dialog({
      title: (
        <>
          Delete Topic area : <strong>{name}</strong>
        </>
      ),
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
        <TopicAreaForm refetch={refetchTable} />
      </section>
      <ServerTable
        meta={topicAreaData?.meta}
        setTableState={setTableState}
        tableState={tableState}
        columns={columns}
        data={topicAreaData?.data || []}
        withFilter
      />
    </>
  );
}
