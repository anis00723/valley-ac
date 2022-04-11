import AdminLayout from 'components/Layout/AdminLayout';
import { NextPageWithLayout } from 'pages/_app';
import React from 'react';

const ReviewsAdminPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>Reviews Admin page</h1>
    </>
  );
};

ReviewsAdminPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ReviewsAdminPage;
