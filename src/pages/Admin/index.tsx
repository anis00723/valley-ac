import AdminLayout from 'components/Layout/AdminLayout';
import { NextPageWithLayout } from 'pages/_app';

const AdminViewPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

AdminViewPage.getLayout = (page) => (
  <AdminLayout pageName="Dashboard">{page}</AdminLayout>
);

export default AdminViewPage;
