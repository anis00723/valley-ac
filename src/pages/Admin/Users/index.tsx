import AdminLayout from 'components/Layout/AdminLayout';
import { NextPageWithLayout } from 'pages/_app';
import React from 'react';

const UsersAdminPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>Users Admin page</h1>
    </>
  );
};

UsersAdminPage.getLayout = (page) => (
  <AdminLayout pageName="Users">{page}</AdminLayout>
);

export default UsersAdminPage;
