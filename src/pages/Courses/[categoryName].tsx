import React, { useEffect } from 'react';
import { createSSGHelpers } from '@trpc/react/ssg';
import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, PlusSmIcon } from '@heroicons/react/solid';
import { classNames } from 'utils/classNames';
import { transformer, trpc } from 'utils/trpc';
import CoursesGrid from 'components/Courses/CoursesGrid';
import { useCoursesStore } from 'store/CoursesStore';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { createContext } from 'server/context';
import { appRouter } from 'server/routers/_app';
import AdminNavigation from 'components/Admin/AdminNavigation';
import { useInfiniteCourses } from '../../hooks';
import axios from 'axios';

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
    if (categoryIds.length === 0) {
      setOneOptionSelected('category', 'all');
    }
  }, [categoryIds, setOneOptionSelected]);
  const [selectedCat, setSelectedCat] = useState(['' + categoryIds]);
  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleOptionSelect('category', e.target.value);
    if (selectedCat.indexOf('' + e.target.value) === -1) {
      setSelectedCat([...selectedCat, '' + e.target.value]);
    } else {
      setSelectedCat(selectedCat.filter(cat => cat !== '' + e.target.value));
    }
    setPageIndex(0);
    setUserSelectedCategory(true);
  };

  const {
    courses,
    count,
    handleNextPage,
    handlePreviousPage,
    firstElementIndex,
    lastElementIndex,
    hasNextPage,
    setPageIndex,
    pageIndex,
  } = useInfiniteCourses(userSelectedCategory, categoryIds, true);

  // console.log('userSelectedCategory: ', userSelectedCategory);

  // console.log('userSelectedCategory: ', userSelectedCategory);
  const [coursesFromApi, setCoursesFromApi] = useState([]);
  const [lastItem, setLastItem] = useState(0);
  const [resultCount, setResultCount] = useState(0);
  const setCoursesFromApiFun = async () => {
    const response = await axios.post('/api/courses/coursesByCat_Id', {
      categoryIds: selectedCat,
      pageNum: 1,
    });
    setCoursesFromApi(response.data.resultWithPagination);
    setLastItem(response.data.lastItem);
    setResultCount(response.data.count);
  };

  useEffect(() => {
    setCoursesFromApiFun().catch(console.error);
  }, [selectedCat, setCoursesFromApi, userSelectedCategory]);



  // console.log('maxPages: ', maxPages);
  return (
    <div className='bg-white'>
      <div>
        {/* // ! Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-40 flex lg:hidden'
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <div
                className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>
                <div className='flex items-center justify-between px-4'>
                  <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                  <button
                    type='button'
                    className='-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500'
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Filters */}
                <form className='mt-4'>
                  {filters.map((section) => (
                    <Disclosure
                      as='div'
                      key={section.name}
                      className='border-t border-gray-200 pt-4 pb-4'
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className='w-full px-2'>
                            <Disclosure.Button
                              className='flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500'>
                              <span className='text-sm font-medium text-gray-900'>
                                {section.name}
                              </span>
                              <span className='ml-6 flex h-7 items-center'>
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? '-rotate-180' : 'rotate-0',
                                    'h-5 w-5 transform',
                                  )}
                                  aria-hidden='true'
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className='px-4 pt-4 pb-2'>
                            <div className='space-y-6'>
                              {section.options?.map((option, optionIdx) => (
                                <div
                                  key={option.id}
                                  className='flex items-center'
                                >
                                  <input
                                    id={`${section.id}-${optionIdx}-mobile`}
                                    name={`${section.id}[]`}
                                    checked={option.selected}
                                    defaultValue={option.id}
                                    type='checkbox'
                                    className='h-4 w-4 rounded border-gray-300 text-valley-yellow-700 focus:ring-valley-yellow-500'
                                  />
                                  <label
                                    htmlFor={`${section.id}-${optionIdx}-mobile`}
                                    className='ml-3 text-sm text-gray-500'
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

        <main className='mx-auto max-w-2xl px-4 py-16 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='border-b border-gray-200 pb-10'>
            <h1 className='text-4xl font-extrabold tracking-tight text-gray-900'>
              Formations
            </h1>
            <p className='mt-4 text-base text-gray-500'>
              Check out our latest courses and tutorials.
            </p>
          </div>

          <div className='pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
            <aside>
              <h2 className='sr-only'>Filters</h2>

              <button
                type='button'
                className='inline-flex items-center lg:hidden'
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className='text-sm font-medium text-gray-700'>
                  Filters
                </span>
                <PlusSmIcon
                  className='ml-1 h-5 w-5 flex-shrink-0 text-gray-400'
                  aria-hidden='true'
                />
              </button>

              <div className='hidden lg:block'>
                <form className='space-y-10 divide-y divide-gray-200'>
                  {filters.map((section, sectionIdx) => (
                    <div
                      key={section.name}
                      className={sectionIdx === 0 ? '' : 'pt-10'}
                    >
                      <fieldset>
                        <legend className='block text-sm font-medium text-gray-900'>
                          {section.name}
                        </legend>
                        <div className='space-y-3 pt-6'>
                          {section.options?.map((option, optionIdx) => (
                            <div key={option.id} className='flex items-center'>
                              <input
                                id={`${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                checked={option.selected}
                                defaultValue={option.id}
                                onChange={(e) => handleOptionsChange(e)}
                                type='checkbox'
                                className='h-4 w-4 rounded border-gray-300 text-valley-yellow-700 focus:ring-valley-yellow-500'
                              />
                              <label
                                htmlFor={`${section.id}-${optionIdx}`}
                                className='ml-3 text-sm text-gray-600'
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
            <div className='mt-6 mb-10 lg:col-span-2 lg:mt-0 xl:col-span-3'>
              <CoursesGrid courses={coursesFromApi} />

              <AdminNavigation
                count={resultCount}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                firstElementIndex={firstElementIndex}
                lastElementIndex={lastItem}
                hasNextPage={hasNextPage}
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
    transformer: transformer, // optional - adds superjson serialization
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
