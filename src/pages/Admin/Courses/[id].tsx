import AdminLayout from 'components/Layout/AdminLayout';
import { trpc } from '../../../utils/trpc';
import { ReactElement, useEffect, useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { createSSGHelpers } from '@trpc/react/ssg';
import { createContext } from 'server/context';
import superjson from 'superjson';
import { appRouter } from 'server/routers/_app';
import { useRouter } from 'next/router';
import SuccessModal from 'components/Admin/Courses/SuccessModal';
import ErrorModal from 'components/Admin/Courses/ErrorModal';
import humanize from '@jsdevtools/humanize-anything';
import { capitalize } from 'utils/capitalize';
import CourseInputForm from 'components/Admin/Courses/CourseInputForm';

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

  const categoryQuery = trpc.useQuery(['category.all']);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const course = courseQuery?.data ? courseQuery.data : null;
  const categories = categoryQuery.data ? categoryQuery.data : null;

  const [selectedCategory, setSelectedCategory] = useState(course?.category);
  const [thumbnail, setThumbnail] = useState(course?.thumbnail);

  const [formState, setFormState] = useState({
    name: course?.name,
    description: course?.description,
    price: course?.price,
    featured: course?.featured,
    published: course?.published,
  });
  const [editorValue, setEditorValue] = useState(course?.content);
  useEffect(() => setEditorValue(course?.content), [course?.content]);

  const handleChange = (e: any) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.type === 'number'
        ? parseFloat(e.target.value)
        : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  const onThumbnailDrop = async (acceptedFiles: File[]) => {
    const body = new FormData();
    body.append('file', acceptedFiles[0]);
    const response = await fetch('/api/image', {
      method: 'POST',
      body,
    });
    const { filePath } = await response.json();

    setThumbnail(filePath);
  };

  useEffect(() => {
    if (!id) {
      router.push('/Admin/Courses');
    }
  }, [id, router]);

  useEffect(() => {
    if (course) {
      setSelectedCategory(course.category);
    }
  }, [course]);

  const courseMutation = trpc.useMutation(['course.update']);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    courseMutation.mutate({
      id: id as string,
      name: formState.name || '',
      description: formState.description || '',
      price: formState.price || 0,
      featured: formState.featured || false,
      published: formState.published || false,
      categoryId: selectedCategory?.id || '',
      thumbnail: thumbnail || '',
      content: editorValue || '',
    });
  };

  useEffect(() => {
    if (courseMutation.isSuccess) {
      setSuccessModalOpen(true);
      courseMutation.reset();
    }

    if (courseMutation.isError) {
      setErrorModalOpen(true);
      const zodError = courseMutation.error?.data?.zodError;
      if (zodError) {
        const fields = Object.keys(zodError.fieldErrors).map((key) =>
          capitalize(key),
        );
        const huminizedFields = humanize.list(fields);

        const errorMessage = `${huminizedFields} ${
          fields.length > 1 ? 'are' : 'is'
        } wrong, please make sure you provided all the required fields`;
        setErrorMessage(errorMessage);
      }
      courseMutation.reset();
    }
  }, [courseMutation]);

  const handleCancel = () => {
    router.push('/Admin/Courses');
  };

  const handleSuccessDialogClose = () => {
    setSuccessModalOpen(false);
    router.push('/Admin/Courses');
  };

  return (
    <>
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

CoursesDetailAdminPage.getLayout = (page: ReactElement) => (
  <AdminLayout
    pages={[
      { name: 'Courses', href: '/Admin/Courses', current: false },
      { name: 'Update', href: '#', current: true },
    ]}
  >
    {page}
  </AdminLayout>
);

export default CoursesDetailAdminPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>,
) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson, // optional - adds superjson serialization
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
