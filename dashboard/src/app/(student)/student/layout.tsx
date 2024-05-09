'use client';

import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

import Header from '@/_components/layout/navbar/Header';
import Sidebar from '@/_components/layout/navbar/Sidebar';
import BaseDialog from '@/_components/shared/Dialog';
import useDialogStore, { useOpen } from '@/_store/useDialogStore';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = ({ children }) => {
  //#region  //*=========== Store ===========
  const open = useOpen();
  const state = useDialogStore.useState();
  const handleClose = useDialogStore.useHandleClose();
  const handleSubmit = useDialogStore.useHandleSubmit();
  //#endregion  //*======== Store ===========
  return (
    <html lang='id' className='flex flex-row '>
      <BaseDialog
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={open}
        options={state}
      />
      <SessionProvider>
        <Header />
        <Sidebar />
        <body className='w-full md:ml-[16.8%] md:w-10/12'>{children}</body>
      </SessionProvider>
    </html>
  );
};

export default DashboardLayout;
