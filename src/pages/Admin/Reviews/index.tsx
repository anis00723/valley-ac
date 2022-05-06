import { UserRole } from '@prisma/client';
import Breadcrumbs from 'components/Admin/Breadcrumbs';
import AdminLayout from 'components/Layout/AdminLayout';
import { NextPageWithLayout } from 'pages/_app';
import React from 'react';

const pages = [{ name: 'Reviews', href: '/Admin/Reviews', current: true }];

const ReviewsAdminPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="mb-6 mt-4 flex items-center justify-between">
        <Breadcrumbs pages={pages} />
      </div>
      <h1>Reviews Admin page</h1>
    </>
  );
};

ReviewsAdminPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
ReviewsAdminPage.requireAuth = true;
ReviewsAdminPage.authParams = {
  redirectTo: '/Admin',
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_CREATOR],
};

export default ReviewsAdminPage;
