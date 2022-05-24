import AdminLayout from 'components/Layout/AdminLayout';
import { transformer, trpc } from '../../../utils/trpc';
import { ReactElement, useEffect } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { createSSGHelpers } from '@trpc/react/ssg';
import { createContext } from 'server/context';
import { appRouter } from 'server/routers/_app';
import { useRouter } from 'next/router';
import SuccessModal from 'components/Admin/Courses/SuccessModal';
import ErrorModal from 'components/Admin/Courses/ErrorModal';
import CourseInputForm from 'components/Admin/Courses/CourseInputForm';
import Breadcrumbs from 'components/Admin/Breadcrumbs';
import { useCourseInputForm } from 'hooks';
import { UserRole } from '@prisma/client';

const pages = [
  { name: 'Courses', href: '/Admin/Courses', current: false },
  { name: 'Update', href: '#', current: true },
];

const CoursesDetailAdminPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { id } = props;
  const router = useRouter();

  const courseQuery = trpc.useQuery([
    'course.one',
    {
      id: id as string,
    },
  ]);

  const course = courseQuery?.data ? courseQuery.data : null;
  const courseMutation = trpc.useMutation(['course.update']);

  const {
    handleSubmit,
    handleChange,
    onThumbnailDrop,
    formState,
    categories,
    selectedCategory,
    setSelectedCategory,
    thumbnail,
    editorValue,
    setEditorValue,
    successModalOpen,
    setSuccessModalOpen,
    errorModalOpen,
    setErrorModalOpen,
    errorMessage,
    // @ts-ignore
  } = useCourseInputForm(course, courseMutation);

  useEffect(() => {
    if (!id) {
      router.push('/Admin/Courses');
    }
  }, [id, router]);

  const handleCancel = () => {
    router.push('/Admin/Courses');
  };

  const handleSuccessDialogClose = () => {
    setSuccessModalOpen(false);
    router.push('/Admin/Courses');
  };

  return (
    <>
      <div className="mb-6 mt-4">
        <Breadcrumbs pages={pages} />
      </div>

      <SuccessModal
        open={successModalOpen}
        title={'Successfuly Saved'}
        message={'Your changes are successfully saved'}
        closeButtonText={'Go back to courses'}
        onClose={handleSuccessDialogClose}
      />

      <ErrorModal
        open={errorModalOpen}
        title={'Saving is failed'}
        errorMessage={errorMessage}
        closeButtonText={'Ok'}
        onClose={() => setErrorModalOpen(false)}
      />

      <CourseInputForm
        onThumbnailDrop={onThumbnailDrop}
        formState={formState}
        thumbnail={thumbnail}
        categories={categories}
        selectedCategory={selectedCategory}
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        handleChange={handleChange}
        setSelectedCategory={setSelectedCategory}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default CoursesDetailAdminPage;

CoursesDetailAdminPage.getLayout = (page: ReactElement) => (
  <AdminLayout>{page}</AdminLayout>
);
CoursesDetailAdminPage.requireAuth = true;
CoursesDetailAdminPage.authParams = {
  redirectTo: '/Admin',
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_CREATOR],
};

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>,
) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: transformer, // optional - adds superjson serialization
  });

  const id = context.params?.id;

  const nullResult = {
    props: {
      trpcState: ssg.dehydrate(),
      id: null,
    },
  };

  if (id) {
    try {
      const course = await ssg.fetchQuery('course.one', {
        id,
      });

      if (course) {
        await ssg.prefetchQuery('category.all');
        await ssg.prefetchQuery('course.one', {
          id,
        });

        return {
          props: {
            trpcState: ssg.dehydrate(),
            id,
          },
        };
      }
    } catch (err) {
      return nullResult;
    }
  } else {
    return nullResult;
  }
}
