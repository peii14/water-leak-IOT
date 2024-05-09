import DashboardNavigationList from '@/_components/layout/navbar/DashboardNavigationList';

export default function DesktopSidebar() {
  return (
    <nav className=' fixed hidden h-screen w-2/12 overflow-hidden overflow-y-auto border-r px-5 py-7 shadow-md md:block'>
      <ul className='my-14 space-y-2'>
        <DashboardNavigationList />
      </ul>
    </nav>
  );
}
