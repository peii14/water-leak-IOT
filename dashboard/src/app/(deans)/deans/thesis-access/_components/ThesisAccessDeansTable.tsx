'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Edit2Icon, EyeIcon, LockIcon, UnlockIcon } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import Button from '@/_components/shared/buttons/Button';
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
import EditGroupsSupervisorModal from '@/app/(deans)/deans/thesis-access/_components/ThesisAccessDeansSpvModal';

export default function ThesisAccessDeansTable({
  sessions_faculty,
}: {
  sessions_faculty: number;
}) {
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
      cell: (cell) => cell.row.original.supervisors.length,
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
          <IconButton
            onClick={() => {
              groupStatusMutation.mutate(cell.row.original.id);
            }}
            variant={cell.row.original.group_status ? 'danger' : 'primary'}
            icon={cell.row.original.group_status ? UnlockIcon : LockIcon}
          />
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
          <EditGroupsSupervisorModal
            refetch={refetchTable}
            title='Edit eligible supervisor'
            group={cell.row.original}
            faculty_session={sessions_faculty}
          >
            {({ openModal }) => (
              <Button
                onClick={openModal}
                variant='outline'
                rightIcon={Edit2Icon}
              >
                Edit Supervisor
              </Button>
            )}
          </EditGroupsSupervisorModal>
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
  // #region //*======== Table Action ===========
  const groupStatusMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await api.put(`/master/groups/status`, { id });
      return res.data;
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success('Group status changed');
      refetchTable();
    },
    onError: () => {
      toast.dismiss();
      toast.error('Failed to change group status');
    },
    onMutate: () => {
      toast.loading('Loading...');
    },
  });
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
