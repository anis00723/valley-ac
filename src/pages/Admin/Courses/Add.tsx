import Breadcrumbs from 'components/Admin/Breadcrumbs';
import CourseInputForm from 'components/Admin/Courses/CourseInputForm';
import ErrorModal from 'components/Admin/Courses/ErrorModal';
import SuccessModal from 'components/Admin/Courses/SuccessModal';
import AdminLayout from 'components/Layout/AdminLayout';
import { useCourseInputForm } from 'hooks';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { trpc } from 'utils/trpc';

const pages = [
  { name: 'Courses', href: '/Admin/Courses', current: false },
  { name: 'Add', href: '/Admin/Courses/Add', current: true },
];

const AddCourse: NextPageWithLayout = () => {
  const router = useRouter();

  const courseMutation = trpc.useMutation(['course.add']);

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
  } = useCourseInputForm(null, courseMutation);

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

AddCourse.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AddCourse;
