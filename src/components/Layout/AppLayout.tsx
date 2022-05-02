import { Fragment, ReactNode, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { classNames } from 'utils/classNames';
import FormationDropdown from 'components/Layout/FormationDropdown';
import Footer from './Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isExactPath } from 'utils/pathHelpers';
import { ReactQueryDevtools } from 'react-query/devtools';
import { signOut, useSession } from 'next-auth/react';
import LoginModal from 'components/Auth/LoginModal';

type AdminLayoutProps = { children: ReactNode };

export const AppLayout = ({ children }: AdminLayoutProps) => {
  const [loginFormOpen, setloginFormOpen] = useState(false);
  const session = useSession();
  const user = session?.data?.user;
  const isAuthenticated = session?.status === 'authenticated';
  const router = useRouter();
  const activeRouter = router.pathname;

  console.log('user', user);

  return (
    <>
      <Disclosure as="nav" className="bg-cape-cod-50 shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="/LOGO VC-02.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="/LOGO VC-02.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-3">
                    {/*Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <Link href="/">
                      <a
                        className={classNames(
                          isExactPath(activeRouter, '/')
                            ? 'border-b-4 border-valley-yellow-800'
                            : '',
                          'inline-flex items-center px-4 pt-1 text-sm font-medium text-gray-900 hover:bg-cape-cod-100',
                        )}
                      >
                        Acceuil
                      </a>
                    </Link>
                    <FormationDropdown />
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* If not authenticated show login button */}
                  {!isAuthenticated && (
                    <button
                      onClick={() => setloginFormOpen(true)}
                      className="ml-6 inline-flex items-center rounded-md border border-transparent bg-valley-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-valley-yellow-700 focus:outline-none focus:ring-2 focus:ring-valley-yellow-500 focus:ring-offset-2"
                    >
                      Se connecter
                    </button>
                  )}

                  {isAuthenticated && (
                    <button
                      type="button"
                      className="rounded-full bg-cape-cod-50 p-1 text-cape-cod-400 hover:bg-cape-cod-100 hover:text-valley-gray-200 focus:outline-none focus:ring-2 focus:ring-valley-yellow-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  )}

                  {/* Profile dropdown */}
                  {isAuthenticated && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-valley-yellow-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user?.image || '/avatar.svg'}
                            alt="User Avatar Image"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="ring-1ring-black absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                Your Profile
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                Settings
                              </div>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() => signOut()}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block cursor-pointer px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                Sign out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>

            {/* // ! Mobile menu */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pt-2 pb-4">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                >
                  Dashboard
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Team
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Projects
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                >
                  Calendar
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <LoginModal open={loginFormOpen} setOpen={setloginFormOpen}></LoginModal>
      <main>{children}</main>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <Footer />
    </>
  );
};
