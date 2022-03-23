import React, { useCallback, useEffect } from 'react';

import { createSSGHelpers } from '@trpc/react/ssg';
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, PlusSmIcon } from '@heroicons/react/solid';
import { classNames } from 'utils/classNames';
import { trpc } from 'utils/trpc';
import CoursesGrid from 'components/Courses/CoursesGrid';
import { useCoursesStore } from 'store/CoursesStore';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { createContext } from 'server/context';
import superjson from 'superjson';
import { appRouter } from 'server/routers/_app';
import CoursesNavigation from 'components/Courses/CoursesNavigation';
import { ResultItem } from 'server/routers/course';

const processCouses = (courses: ResultItem[] | undefined) => {
  return (
    courses?.map((course) => {
      const avgRating =
        course.reviews.reduce((acc, review) => acc + review.rating, 0) /
        course.reviews.length;
      return {
        ...course,
        avgRating,
      };
    }) || []
  );
};

const CoursesPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { categoryIds } = props;
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [userSelectedCategory, setUserSelectedCategory] = useState(false);

  const filters = useCoursesStore((store) => store.filters);
  const addOption = useCoursesStore((store) => store.addOption);
  const toggleOptionSelect = useCoursesStore(
    (store) => store.toggleOptionSelect,
  );
  const setOneOptionSelected = useCoursesStore(
    (store) => store.setOneOptionSelected,
  );

  const selectedOptionsIds = useCallback(
    (filterId: string) =>
      (filters.find((filter) => filter.id === filterId)?.options || [])
        .filter((option) => option.selected)
        .map((option) => option.id),
    [filters],
  );

  const coursesQuery = trpc.useInfiniteQuery(
    [
      'course.all',
      {
        categoryIds: userSelectedCategory
          ? selectedOptionsIds('category')
          : categoryIds,
      },
    ],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const [pageIndex, setPageIndex] = useState(0);

  const [courses, setCourses] = useState(() =>
    processCouses(coursesQuery.data?.pages[pageIndex]?.result.items),
  );

  const [count, setCount] = useState(
    coursesQuery.data?.pages[pageIndex]?.result.count || 0,
  );

  const [firstElementIndex, setFirstElementIndex] = useState(0);
  const [lastElementIndex, setLastElementIndex] = useState(0);

  const replaceCourses = useCallback((newCourses) => {
    setCourses(newCourses);
  }, []);

  const categoryQuery = trpc.useQuery(['category.all']);

  useEffect(() => {
    categoryQuery.data?.forEach((category) => {
      addOption('category', category);
    });
  }, [addOption, categoryQuery.data]);

  useEffect(() => {
    categoryIds?.map((categoryId) => {
      setOneOptionSelected('category', categoryId);
    });
  }, [categoryIds, setOneOptionSelected]);

  useEffect(() => {
    const courses = processCouses(
      coursesQuery.data?.pages[pageIndex]?.result.items,
    );
    const count = coursesQuery.data?.pages[pageIndex]?.result.count || 0;
    replaceCourses(courses);
    setCount(count);
  }, [coursesQuery.data?.pages, pageIndex, replaceCourses]);

  useEffect(() => {
    setFirstElementIndex(() => {
      if (pageIndex === 0) {
        return 1;
      }
      return (
        pageIndex *
          // @ts-ignore
          coursesQuery?.data?.pages[pageIndex - 1]?.result?.items?.length +
        1
      );
    });
  }, [pageIndex, coursesQuery.data?.pages, courses.length]);

  useEffect(() => {
    setLastElementIndex(firstElementIndex + courses.length - 1);
  }, [firstElementIndex, courses]);

  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleOptionSelect('category', e.target.value);
    setPageIndex(0);
    setUserSelectedCategory(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const handleNextPage = async () => {
    setPageIndex((pageIndex) => pageIndex + 1);
    await coursesQuery.fetchNextPage();
    scrollToTop();
  };

  const handlePreviousPage = async () => {
    setPageIndex((pageIndex) => pageIndex - 1);
    await coursesQuery.fetchPreviousPage();
    scrollToTop();
  };

  return (
    <div className="bg-white">
      <div>
        {/* // ! Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.name}
                      className="pt-4 pb-4 border-t border-gray-200"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="flex items-center justify-between w-full p-2 text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="flex items-center ml-6 h-7">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? '-rotate-180' : 'rotate-0',
                                    'h-5 w-5 transform',
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="px-4 pt-4 pb-2">
                            <div className="space-y-6">
                              {section.options?.map((option, optionIdx) => (
                                <div
                                  key={option.id}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`${section.id}-${optionIdx}-mobile`}
                                    name={`${section.id}[]`}
                                    checked={option.selected}
                                    defaultValue={option.id}
                                    type="checkbox"
                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}-mobile`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-2xl px-4 py-16 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="pb-10 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Formations
            </h1>
            <p className="mt-4 text-base text-gray-500">
              Checkout out the latest release of Basic Tees, new and improved
              with four openings!
            </p>
          </div>

          <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusSmIcon
                  className="flex-shrink-0 w-5 h-5 ml-1 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-gray-200">
                  {filters.map((section, sectionIdx) => (
                    <div
                      key={section.name}
                      className={sectionIdx === 0 ? '' : 'pt-10'}
                    >
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">
                          {section.name}
                        </legend>
                        <div className="pt-6 space-y-3">
                          {section.options?.map((option, optionIdx) => (
                            <div key={option.id} className="flex items-center">
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                checked={option.selected}
                                defaultValue={option.id}
                                onChange={(e) => handleOptionsChange(e)}
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}
                </form>
              </div>
            </aside>

            {/* Product grid */}
            <div className="mt-6 mb-10 lg:mt-0 lg:col-span-2 xl:col-span-3">
              <CoursesGrid courses={courses} />

              <CoursesNavigation
                count={count}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                firstElementIndex={firstElementIndex}
                lastElementIndex={lastElementIndex}
                hasNextPage={
                  coursesQuery.data?.pages[pageIndex]?.nextCursor !== null
                }
                pageIndex={pageIndex}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursesPage;

// ! Only need this for SSG
// export const getStaticPaths: GetStaticPaths = async () => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//     transformer: superjson, // optional - adds superjson serialization
//   });

//   const categories = await ssg.fetchQuery('category.all');
//   const paths = categories.map((category) => ({
//     params: {
//       categoryName: category.name,
//     },
//   }));

//   return {
//     paths: [
//       {
//         params: {
//           categoryName: 'all',
//         },
//       },
//       ...paths,
//     ],
//     fallback: false,
//   };
// };

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ categoryName: string }>,
) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson, // optional - adds superjson serialization
  });

  const categoryName = context.params?.categoryName
    ? [context.params.categoryName]
    : [];

  const categories = await ssg.fetchQuery('category.all');
  const categoriesToGet = categories.filter((category) =>
    categoryName.includes(category.name),
  );

  const categoryIds = categoriesToGet.map((category) => category.id);

  await ssg.prefetchInfiniteQuery('course.all', {
    categoryIds: categoryIds,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      categoryIds,
    },
  };
}
