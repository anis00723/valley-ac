import AdminLayout from 'components/Layout/AdminLayout';
import { NextPageWithLayout } from 'pages/_app';
import React from 'react';

const CoursesAdminPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>Courses Admin page</h1>
    </>
  );
};

CoursesAdminPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default CoursesAdminPage;
