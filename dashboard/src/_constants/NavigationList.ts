import { User2Icon } from "lucide-react";

import { Navigation } from "@/_components/layout/navbar/DashboardNavigationList";
import SensorIcon from "@/_icons/Sensor";
import LightbulbIcon from "@/_icons/Lightbulb";

const AdminNavigation: Navigation[] = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: User2Icon,
  },
  {
    name: "Sensors",
    href: "/admin/sensor",
    icon: SensorIcon,
  },
  {
    name: "Tips",
    href: "/admin/tips",
    icon: LightbulbIcon,
  },
];

export function NavigationList() {
  return AdminNavigation;
}
