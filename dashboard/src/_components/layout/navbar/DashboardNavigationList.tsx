"use client";
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { IconType } from "react-icons";
import { FiChevronDown } from "react-icons/fi";

import UnstyledLink from "@/_components/shared/links/UnstyledLink";
import NextImage from "@/_components/shared/NextImage";
import { NavigationList } from "@/_constants/NavigationList";
import clsxm from "@/_lib/clsxm";
import useAuthStore from "@/_store/useAuthStore";
import { useItemStorage } from "@/_store/useSuperAdminStorage";

export type Navigation = {
  name: string;
  href: string;
  icon: IconType | LucideIcon;
  /**
   * Use this when the route is also used as a nested route
   * @example Use exactMatch for '/dashboard' to avoid both navigation links active when visiting '/dashboard/edit'
   */
  exactMatch?: boolean;
  activeState?: boolean;
  children?: Navigation[];
  avatar?: string;
  action?: () => void;
};

type NavigationProps = React.ComponentPropsWithoutRef<"nav">;

export default function DashboardNavigationList({
  className,
  ...rest
}: NavigationProps) {
  const navigation = NavigationList();
  const logout = useAuthStore.useLogout();

  return (
    <nav className={clsxm(className)} {...rest}>
      <div className="space-y-1.5">
        {navigation.map((nav) => {
          return nav.children ? (
            <NestedNavigation key={nav.name} navigation={nav} />
          ) : nav.action !== undefined ? (
            <NavigationAction
              activeState={nav.activeState}
              key={nav.name}
              navigation={nav}
              action={nav.name == "Logout" ? logout : nav.action}
            />
          ) : (
            <NavigationLink key={nav.name} navigation={nav} />
          );
        })}
      </div>
    </nav>
  );
}

function NestedNavigation({
  navigation: navChildren,
}: {
  navigation: Navigation;
}) {
  const pathname = usePathname();
  const auth = useAuthStore();
  function checkActive(nav?: Navigation[]): boolean {
    if (!nav) return false;

    return nav.some((n) => {
      if (!n.children) {
        const isActive = n.exactMatch
          ? pathname === n.href
          : pathname.startsWith(n.href);

        return isActive;
      }

      return checkActive(n.children);
    });
  }
  const logout = useAuthStore.useLogout();
  const storageValue = useItemStorage((state) => state.whichStorage);

  return (
    <Disclosure as="div" defaultOpen={checkActive(navChildren.children)}>
      {({ open }) => (
        <div className={`rounded-xl ${open ? "md:bg-darkGreen" : ""}`}>
          <Disclosure.Button
            className={clsx(
              "hover:bg-primary-400 hover:text-white ",
              "text-typo-primary",
              "group flex w-full items-center rounded-xl px-2 py-2 text-sm font-medium",
              "focus-visible:ring-primary-500 focus-visible:ring-offset-primary-500 focus:outline-none focus-visible:ring-2",
              "transition duration-100"
            )}
          >
            {navChildren.avatar ? (
              <NextImage
                className="mr-1.5 flex-shrink-0 overflow-hidden rounded-full"
                quality={60}
                src={navChildren.avatar}
                alt="avatar"
                width={35}
                height={35}
              />
            ) : (
              <navChildren.icon
                className={clsx(
                  "mr-1.5 flex-shrink-0",
                  "text-typo-secondary text-lg group-hover:text-white",
                  open && "mt-[1px] self-start"
                )}
                aria-hidden="true"
              />
            )}
            <span className={clsx("text-left", !open && "truncate")}>
              {navChildren.avatar ? auth.user?.name : navChildren.name}
            </span>
            <FiChevronDown
              className={clsx(
                "flex-shrink-0",
                "text-typo-icons ml-auto text-lg group-hover:text-white",
                open && "mt-[1px] rotate-180 self-start"
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="ml-5 mt-0.5">
            {navChildren.children?.map((nav) =>
              nav.children ? (
                <NestedNavigation key={nav.name} navigation={nav} />
              ) : nav.action !== undefined ? (
                <NavigationAction
                  key={nav.name}
                  navigation={nav}
                  activeState={
                    nav.name === "Safari mas"
                      ? storageValue === 2
                      : nav.name === "Sinar Safari Motor"
                      ? storageValue === 1
                      : nav.name === "Warehouse"
                      ? storageValue === 3
                      : false
                  }
                  action={nav.name == "Logout" ? logout : nav.action}
                />
              ) : (
                <NavigationLink key={nav.name} navigation={nav} />
              )
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function NavigationLink({
  navigation,
  className,
}: {
  navigation: Navigation;
  className?: string;
}) {
  const pathname = usePathname();

  const isActive = navigation.exactMatch
    ? pathname === navigation.href
    : pathname.startsWith(navigation.href);
  return (
    <UnstyledLink
      href={navigation.href}
      className={clsxm(
        isActive
          ? "bg-primary-500 text-white"
          : "text-typo-primary hover:bg-primary-400 hover:text-white",
        "group my-0.5 flex w-max items-center rounded-md px-2 py-2 text-sm font-medium",
        "focus-visible:ring-offset-secondary-500 focus:outline-none focus-visible:ring-2  focus-visible:ring-green-500",
        "transition duration-100",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <navigation.icon
        color={isActive ? "white" : undefined}
        className={clsx(
          "mr-1.5 flex-shrink-0",
          "text-lg group-hover:text-white",
          isActive ? "text-white" : "text-typo-darkGreen"
        )}
        aria-hidden="true"
      />
      <span className="ml-3 truncate">{navigation.name}</span>
    </UnstyledLink>
  );
}

function NavigationAction({
  navigation,
  className,

  action,
  activeState,
}: {
  navigation: Navigation;
  className?: string;
  action?: () => void;
  activeState?: boolean;
}) {
  return (
    <div
      onClick={action}
      className={clsxm(
        activeState
          ? "text-darkGreen bg-primary-500"
          : "text-typo-primary hover:bg-primary-400 hover:text-white",
        "group flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium",
        "focus-visible:ring-offset-secondary-500 focus-visible:ring-darkGreen focus:outline-none  focus-visible:ring-2",
        "transition duration-100",
        className
      )}
      aria-current={activeState ? "page" : undefined}
    >
      <navigation.icon
        className={clsx(
          "mr-1.5 flex-shrink-0",
          "group-hover:text-dark-green text-lg",
          activeState ? "text-darkGreen" : "text-typo-darkGreen"
        )}
        aria-hidden="true"
      />
      <span className="truncate">{navigation.name}</span>
    </div>
  );
}
