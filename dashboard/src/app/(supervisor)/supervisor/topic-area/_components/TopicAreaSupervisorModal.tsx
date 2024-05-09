'use client';

import React from 'react';

import Modal from '@/_components/shared/Modal';
import TopicAreaForm from '@/app/(deans)/deans/topic-area/_components/TopicAreaForm';

type ModalReturnType = {
  openModal: () => void;
};

type AddTopicAreaSupervisorModalProps = {
  children: (props: ModalReturnType) => JSX.Element;
  title: string;
};

type TopicAreaForm = {
  id: number;
  name: string;
};

export default function AddTopicAreaSupervisorModal({
  children,
  title,
}: AddTopicAreaSupervisorModalProps) {
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: () => setOpen(true),
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen} title={title}>
        <Modal.Section>
          <TopicAreaForm setCloseModal={setOpen} />
        </Modal.Section>
      </Modal>
    </>
  );
}
