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
import { FacultyProps } from '@/_types/entity/faculty';
import EditFacultyModal from '@/app/(univ-admin)/admin/sensor/_components/EditSensorModal';
import FacultyAdminForm from '@/app/(univ-admin)/admin/sensor/_components/SensorForm';

export default function FacultyAdminTable() {
  const dialog = useDialog();
  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<FacultyProps>();
  const columns: ColumnDef<FacultyProps>[] = [
    {
      header: 'No',
      cell: (cell) => cell.row.index + 1,
      size: 5,
    },
    {
      accessorKey: 'name',
      header: 'Faculty',
      size: 20.8,
    },
    {
      accessorKey: 'majors',
      header: 'major',
      cell: (cell) => cell.row.original.majors.map((m) => m.name).join(', '),
    },
    {
      accessorKey: 'majors.groups',
      header: 'Total Groups',
      cell: (cell) =>
        cell.row.original.majors?.reduce(
          (acc, curr) => acc + curr.groups.length,
          0
        ),
    },
    {
      id: 'actions',
      header: 'Action',
      cell: (data) => (
        <div className='flex w-max space-x-3'>
          <EditFacultyModal
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
          </EditFacultyModal>
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
    baseUrl: '/master/faculty',
    additionalParam: {
      filter_key: 'name',
      filter_operator: 'like',
      filter_value: tableState.globalFilter,
      related_tables: ['majors.groups'],
    },
    tableState,
  });
  const { data: facultyData, refetch: refetchTable } = useQuery<
    PaginatedApiResponse<FacultyProps[]>,
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
        .delete(`/master/faculty`, { data: id })
        .then((res) => res.data);
    }),
    {
      loading: 'Deleting faculty...',
      success: 'Faculty deleted successfully',
      error: 'Failed to delete faculty',
    }
  );
  const onDelete = async ({ id, name }: { id: string; name: string }) => {
    dialog({
      title: (
        <>
          Delete Faculty : <strong>{name}</strong>
        </>
      ),
      description: (
        <>
          Are you sure to delete <strong>{name}</strong>? This will also delete
          all groups under this faculty
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
        <FacultyAdminForm refetch={refetchTable} />
      </section>
      <ServerTable
        meta={facultyData?.meta}
        setTableState={setTableState}
        tableState={tableState}
        columns={columns}
        data={facultyData?.data || []}
        withFilter
      />
    </>
  );
}
