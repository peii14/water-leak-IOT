'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { EditIcon, TrashIcon } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
import IconButton from '@/_components/shared/buttons/IconButton';
import ServerTable from '@/_components/shared/table/ServerTable';
import useServerTable from '@/_hooks/useServerTable';
import api from '@/_lib/axios';
import { buildPaginatedTableURL } from '@/_lib/table';
import { ApiError, PaginatedApiResponse } from '@/_types/api/api.type';
import { MajorsProps } from '@/_types/entity/majors';
import EditMajorModal from '@/app/(deans)/deans/majors/_components/EditMajorModal';
import MajorsAdminForm from '@/app/(deans)/deans/majors/_components/MajorsForm';

export default function MajorsAdminTable() {
  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<MajorsProps>();
  const columns: ColumnDef<MajorsProps>[] = [
    {
      header: 'No',
      cell: (cell) => cell.row.index + 1,
      size: 5,
    },
    {
      accessorKey: 'name',
      header: 'Major',
      size: 25,
    },
    {
      accessorKey: 'faculty.name',
      header: 'Faculty',
      size: 25,
    },
    {
      accessorKey: 'groups',
      header: 'Total Groups',
      size: 10,
      cell: (cell) => cell.row.original.groups?.length,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: (data) => (
        <div className='flex w-max space-x-3'>
          <EditMajorModal
            majorProps={data.row.original}
            refetch={refetchFaculty}
            title={`Edit ${data.row.original.name}`}
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
          </EditMajorModal>
          <IconButton
            onClick={() =>
              mutateAsyncDelete({
                id: data.row.original.id.toString(),
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
    baseUrl: '/master/majors',
    additionalParam: {
      filter_key: 'name',
      filter_operator: 'like',
      filter_value: tableState.globalFilter,
      related_tables: ['faculty', 'groups'],
    },
    tableState,
  });
  const { data: newsData, refetch: refetchFaculty } = useQuery<
    PaginatedApiResponse<MajorsProps[]>,
    ApiError
  >({
    queryKey: [url],
    keepPreviousData: true,
    queryFn: async () => await api.get(url).then((res) => res.data),
  });

  //#endregion  //*======== Fetch Data ===========

  // #region //* =========== Delete Data ===========
  const deleteNews = async ({ id }: { id: string }) => {
    const response = await api.delete('/master/majors', {
      data: {
        id: id,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to delete news');
    }

    return response.data;
  };
  const deleteMutation = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      refetchFaculty();
      toast.dismiss();
      toast.success('Group has been Deleted');
    },
    onError: () => {
      toast.dismiss();
      toast.error('Failed to delete Group');
    },
    onMutate: () => {
      toast.loading('Deleting group...');
    },
  });

  const { mutateAsync: mutateAsyncDelete } = deleteMutation;
  // #endregion  //*======== Delete Data ===========
  return (
    <>
      <section className='my-5 w-1/3'>
        <MajorsAdminForm refetch={refetchFaculty} />
      </section>
      <ServerTable
        meta={newsData?.meta}
        setTableState={setTableState}
        tableState={tableState}
        columns={columns}
        data={newsData?.data || []}
        withFilter
      />
    </>
  );
}
