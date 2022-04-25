import humanize from '@jsdevtools/humanize-anything';
import { Category, Course as PrismaCourse, Review } from '@prisma/client';
import { TRPCClientErrorLike } from '@trpc/client';
import { useEffect, useState } from 'react';
import { UseMutationResult } from 'react-query';
import { appRouter } from 'server/routers/_app';
import { capitalize } from 'utils/capitalize';
import { trpc } from 'utils/trpc';

type Course =
  | (PrismaCourse & {
      _count: {
        reviews: number;
        enrolledUsers: number;
      };
      reviews: Review[];
      category: Category;
    })
  | null;

export const useCourseInputForm = (
  course: Course,
  courseMutation: UseMutationResult<
    Course,
    TRPCClientErrorLike<typeof appRouter>
  >,
) => {
  const categoryQuery = trpc.useQuery(['category.all']);
  const categories = categoryQuery.data ? categoryQuery.data : null;
  const [selectedCategory, setSelectedCategory] = useState(
    course?.category || undefined,
  );

  const [thumbnail, setThumbnail] = useState(course?.thumbnail);

  const [formState, setFormState] = useState({
    name: course?.name || '',
    description: course?.description || '',
    price: course?.price || 0,
    featured: course?.featured || false,
    published: course?.published || false,
  });

  const [editorValue, setEditorValue] = useState(course?.content);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => setEditorValue(course?.content), [course?.content]);

  useEffect(() => {
    if (course) {
      setSelectedCategory(course.category);
    }
  }, [course]);

  const handleChange = (e: any) => {
    const value =
      e.target.type === 'checkbox'
        ? e.target.checked
        : e.target.type === 'number'
        ? parseFloat(e.target.value || '0')
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    courseMutation.mutate({
      id: course?.id || '',
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

  return {
    handleSubmit,
    handleChange,
    onThumbnailDrop,
    formState,
    categories,
    selectedCategory,
    setSelectedCategory,
    thumbnail,
    setThumbnail,
    editorValue,
    setEditorValue,
    successModalOpen,
    setSuccessModalOpen,
    errorModalOpen,
    setErrorModalOpen,
    errorMessage,
    setErrorMessage,
  };
};
