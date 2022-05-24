import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { classNames } from 'utils/classNames';
import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useRouter } from 'next/router';
import { isExactPath } from 'utils/pathHelpers';
import { useSession } from 'next-auth/react';
import { ProfileDropdown } from 'components/Shared/ProfileDropdown';

const navigation = [
  { name: 'Dashboard', href: '/Admin', icon: HomeIcon },
  { name: 'Users', href: '/Admin/Users', icon: UsersIcon },
  { name: 'Courses', href: '/Admin/Courses', icon: FolderIcon },
  {
    name: 'Reviews',
    href: '/Admin/Reviews',
    icon: CalendarIcon,
  },
  {
    name: 'Categories',
    href: '/Admin/Categories',
    icon: InboxIcon,
  },
];

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const activePath = router.pathname;
  const session = useSession();
  const isAuthenticated = session?.status === 'authenticated';
  const user = session?.data?.user;

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="/LOGO VC-01.svg"
                    alt="Valley AC"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  <nav className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            isExactPath(activePath, item.href)
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                          )}
                        >
                          <item.icon
                            className={classNames(
                              isExactPath(activePath, item.href)
                                ? 'text-gray-300'
                                : 'text-gray-400 group-hover:text-gray-300',
                              'mr-4 h-6 w-6 flex-shrink-0',
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-cape-cod-200">
            <div className="flex h-16 flex-shrink-0 items-center bg-cape-cod-50 px-4">
              <img
                className="h-8 w-auto"
                src="/LOGO VC-02.svg"
                alt="Valley AC"
              />
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        isExactPath(activePath, item.href)
                          ? 'bg-cape-cod-400 text-cape-cod-50'
                          : 'text-cape-cod-800 hover:bg-cape-cod-300 hover:text-cape-cod-900',
                        'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isExactPath(activePath, item.href)
                            ? 'text-cape-cod-100'
                            : 'text-cape-cod-500 group-hover:text-cape-cod-500',
                          'mr-3 h-6 w-6 flex-shrink-0',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                {
                  // ? Dummy element to force sidebar to grow so profile avatar is on the right side
                }
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                {isAuthenticated && <ProfileDropdown user={user} />}
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="py-4">{children}</div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
};

export default AdminLayout;
