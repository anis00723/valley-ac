import {
  MailIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import Breadcrumbs from 'components/Admin/Breadcrumbs';
import UsersFilter from 'components/Admin/Users/UsersFilter';
import AdminNavigation from 'components/Admin/AdminNavigation';
import AdminLayout from 'components/Layout/AdminLayout';
import { useInfiniteUsers } from 'hooks/useInfiniteUsers';
import { NextPageWithLayout } from 'pages/_app';
import React, { useState } from 'react';
import ModifyUserModal from 'components/Admin/Users/ModifyUserModal';

const pages = [{ name: 'Users', href: '/Admin/Users', current: true }];

const UsersAdminPage: NextPageWithLayout = () => {
  const [modifyUserModalOpen, setModifyUserModalOpen] = useState(false);
  const [modifiableUserId, setModifiableUserId] = useState('');

  const {
    users,
    count,
    firstElementIndex,
    lastElementIndex,
    handleNextPage,
    handlePreviousPage,
    hasNextPage,
    pageIndex,
    query,
    setQuery,
  } = useInfiniteUsers();

  const handleModifyUser = (userId: string) => {
    setModifyUserModalOpen(true);
    setModifiableUserId(userId);
  };

  return (
    <>
      <ModifyUserModal
        open={modifyUserModalOpen}
        setOpen={setModifyUserModalOpen}
        userId={modifiableUserId}
      />
      <div className="mb-6 mt-4 flex items-center justify-between">
        <Breadcrumbs pages={pages} />
      </div>

      <UsersFilter query={query} setQuery={setQuery} />

      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.email}>
              <div
                className="block cursor-pointer hover:bg-gray-50"
                onClick={() => handleModifyUser(user.id)}
              >
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={'/avatar.svg'}
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="truncate text-sm font-medium text-indigo-600">
                          {user.name}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <MailIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="truncate">{user.email}</span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          <p className="text-sm text-gray-900">
                            Since{' '}
                            <time dateTime={user.createdAt.toDateString()}>
                              {user.createdAt.toDateString()}
                            </time>
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <InformationCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <AdminNavigation
        count={count}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        firstElementIndex={firstElementIndex}
        lastElementIndex={lastElementIndex}
        hasNextPage={hasNextPage}
        pageIndex={pageIndex}
      />
    </>
  );
};

UsersAdminPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default UsersAdminPage;
