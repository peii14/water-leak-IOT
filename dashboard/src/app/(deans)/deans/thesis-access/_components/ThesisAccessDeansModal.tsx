'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon } from 'lucide-react';
import React from 'react';

import IconLink from '@/_components/shared/links/IconLink';
import Modal from '@/_components/shared/Modal';
import PaginatedTable from '@/_components/shared/table/PaginatedTable';
import Typography from '@/_components/shared/Typography';
import api from '@/_lib/axios';
import { ApiResponse } from '@/_types/api/api.type';
import { GroupsProps } from '@/_types/entity/groups';
import { UserProps } from '@/_types/entity/user';

type ModalReturnType = {
  openModal: () => void;
};

type ThesisAccessDeansModalProps = {
  children: (props: ModalReturnType) => JSX.Element;
  title: string;
  group: GroupsProps;
};

export default function ThesisAccessDetailModal({
  children,
  title,
  group,
}: ThesisAccessDeansModalProps) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };
  // #region  //*=========== Table Definition ===========
  const columns: ColumnDef<UserProps>[] = [
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
      accessorKey: 'Thesis',
      header: 'Thesis',
      cell: (cell) => cell.row.original.studentProposals?.draft?.title ?? '-',
    },
    {
      accessorKey: 'supervisor',
      header: 'Supervisor',
      cell: (cell) =>
        cell.row.original.studentProposals?.supervisor?.name ?? '-',
    },
    {
      header: 'Action',
      // TODO: Accepted proposal only
      cell: (cell) =>
        cell.row.original.studentProposals?.id && (
          <IconLink
            icon={EyeIcon}
            href={`/deans/thesis-access/detail-thesis/${cell.row.original.studentProposals?.id}`}
          />
        ),
    },
  ];
  // #endregion //*=========== Table Definition ===========

  // #region  //*=========== Fetch Details ===========
  const { data: groupsDetails } = useQuery<ApiResponse<GroupsProps[]>>({
    queryFn: async () => {
      return await api
        .get(
          `/master/groups?filter_key=id&filter_operator=eq&filter_value=${group.id}&related_tables=students&related_tables=supervisors`
        )
        .then((res) => res.data);
    },
    enabled: open,
  });
  // #endregion //*=========== Fetch Details ===========
  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title={title}>
        <Modal.Section>
          <Typography variant='h3'>Eligible Supervisors</Typography>
          <ul className='gap-2 py-3'>
            {group.supervisors.length > 0 ? (
              group.supervisors.map((supervisor) => (
                <li key={supervisor.id}>{supervisor.name}</li>
              ))
            ) : (
              <li>No Supervisor</li>
            )}
          </ul>
          <PaginatedTable
            withFilter
            data={groupsDetails?.data[0].students ?? []}
            columns={columns}
          />
          <Typography variant='c1' color='danger'>
            *approved proposal only
          </Typography>
        </Modal.Section>
      </Modal>
    </>
  );
}
