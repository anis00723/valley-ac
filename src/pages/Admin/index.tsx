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

export default AdminViewPage;
