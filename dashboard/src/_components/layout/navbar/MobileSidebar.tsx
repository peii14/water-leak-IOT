'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Twirl as Hamburger } from 'hamburger-react';
import React from 'react';

import DashboardNavigationList from '@/_components/layout/navbar/DashboardNavigationList';
import Typography from '@/_components/shared/Typography';
import BooksIcon from '@/_icons/Books';
type MobileNavigationProps = {
  readonly sidebarOpen: boolean;
  readonly setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileNavigationList({
  sidebarOpen,
  setSidebarOpen,
}: MobileNavigationProps) {
  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-40 flex md:hidden'
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter='transition ease-in-out duration-300 transform'
          enterFrom='-translate-y-full'
          enterTo='translate-y-0'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='translate-y-0'
          leaveTo='-translate-y-full'
        >
          <div className='relative top-14 flex h-max flex-1 flex-col bg-white pb-5 pt-3'>
            <nav className='flex-1 overflow-y-auto'>
              <ul className='space-y-5 px-10'>
                <DashboardNavigationList />
              </ul>
            </nav>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

export default function MobileSidebar() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <>
      <div className='fixed z-50 flex w-screen items-center bg-white px-3 py-4 md:hidden'>
        <div className='absolute'>
          <Hamburger
            toggled={sidebarOpen}
            toggle={() => setSidebarOpen(!sidebarOpen)}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
        <div className='mx-auto flex space-x-3'>
          <BooksIcon />
          <Typography variant='h4'>My Proposal</Typography>
        </div>
      </div>
      <MobileNavigationList
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
    </>
  );
}
