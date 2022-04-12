import AdminLayout from 'components/Layout/AdminLayout';
import { NextPageWithLayout } from 'pages/_app';

const CoursesDetailAdminPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Courses Detail Admin Page</h1>
    </div>
  );
};

CoursesDetailAdminPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default CoursesDetailAdminPage;
