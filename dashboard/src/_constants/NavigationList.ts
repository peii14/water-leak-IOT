import {
  Bookmark,
  BookOpen,
  FolderClosed,
  Group,
  Lightbulb,
  User2Icon,
  UsersIcon,
} from 'lucide-react';

import { Navigation } from '@/_components/layout/navbar/DashboardNavigationList';
import SensorIcon from '@/_icons/Faculty';
import HomeIcon from '@/_icons/Home';
import ProposalIcon from '@/_icons/Proposal';
import RecommendationIcon from '@/_icons/Recommendation';
import logger from '@/_lib/logger';

const StudentNavigation: Navigation[] = [
  {
    name: 'Home',
    href: '/student/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Proposal',
    href: '/student/proposal',
    icon: ProposalIcon,
  },
  {
    name: 'Recommendation',
    href: '/student/recommendation',
    icon: RecommendationIcon,
  },
  {
    name: 'Thesis access',
    href: '/student/thesis-access',
    icon: FolderClosed,
  },
];

const AdminNavigation: Navigation[] = [
  {
    name: 'Dashboard',
    href: '/admin/account',
    icon: User2Icon,
  },
  {
    name: 'Sensors',
    href: '/admin/sensor',
    icon: SensorIcon,
  },
];

const DeansNavigation: Navigation[] = [
  {
    name: 'Dashboard',
    href: '/deans/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Students',
    href: '/deans/student',
    icon: User2Icon,
  },
  {
    name: 'Supervisors',
    href: '/deans/supervisors',
    icon: UsersIcon,
  },
  {
    name: 'Majors',
    href: '/deans/majors',
    icon: BookOpen,
  },
  {
    name: 'Groups',
    href: '/deans/groups',
    icon: Group,
  },
  {
    name: 'Topic Area',
    href: '/deans/topic-area',
    icon: Bookmark,
  },
  {
    name: 'Thesis access',
    href: '/deans/thesis-access',
    icon: FolderClosed,
  },
];

const SupervisorNavigation: Navigation[] = [
  {
    name: 'Dashboard',
    href: '/supervisor/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Proposal',
    href: '/supervisor/proposal',
    icon: ProposalIcon,
  },
  {
    name: 'Recommendation',
    href: '/supervisor/recommendation',
    icon: BookOpen,
  },
  {
    name: 'My topic area',
    href: '/supervisor/topic-area',
    icon: Lightbulb,
  },
  {
    name: 'Thesis Access',
    href: '/supervisor/thesis-access',
    icon: FolderClosed,
  },
];

export function NavigationList({ role }: { role: string }) {
  if (role === 'Student') {
    return StudentNavigation;
  } else if (role === 'Admin') {
    return AdminNavigation;
  } else if (role === 'Deans') {
    return DeansNavigation;
  } else if (role === 'Supervisor') {
    return SupervisorNavigation;
  } else {
    logger(`Unknown role: ${role}`);
  }
  return [];
}
