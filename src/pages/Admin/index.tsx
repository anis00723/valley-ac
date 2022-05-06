import { UserRole } from '@prisma/client';
import AdminLayout from 'components/Layout/AdminLayout';
import { useSession } from 'next-auth/react';
import { NextPageWithLayout } from 'pages/_app';

const AdminViewPage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  return (
    <>
      Signed in as {session?.user?.email} <br />
      <h1>Dashboard</h1>
    </>
  );
};

AdminViewPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
AdminViewPage.requireAuth = true;
AdminViewPage.authParams = {
  redirectTo: '/',
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_CREATOR],
};

export default AdminViewPage;
