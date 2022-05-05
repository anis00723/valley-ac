import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from 'utils/classNames';
import { signOut } from 'next-auth/react';

export function ProfileDropdown({
  user,
}: {
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
}) {
  return (
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
  );
}
