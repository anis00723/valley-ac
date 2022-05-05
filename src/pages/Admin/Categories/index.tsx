import {
  CalendarIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/outline';
import AdminNavigation from 'components/Admin/AdminNavigation';
import AdminLayout from 'components/Layout/AdminLayout';
import { NextPageWithLayout } from 'pages/_app';
import Breadcrumbs from 'components/Admin/Breadcrumbs';
import { useInfiniteCategories } from 'hooks/useInfiniteCategories';
import { useState } from 'react';
import ModifyCategoryModal from 'components/Admin/Category/ModifyCategoryModal';
import { Category } from '@prisma/client';
import AddCategoryModal from 'components/Admin/Category/AddCategoryModal';
import CategoryFilter from 'components/Admin/Category/CategoryFilter';

const pages = [{ name: 'Courses', href: '/Admin/Courses', current: true }];

const CategoriesAdminPage: NextPageWithLayout = () => {
  const [modifyCategoryModalOpen, setModifyCategoryModalOpen] = useState(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  const handleClickedCategory = (category: Category) => {
    setSelectedCategoryId(category.id);
    setModifyCategoryModalOpen(true);
  };

  const handleAddCategoryClicked = () => {
    setAddCategoryModalOpen(true);
  };

  const {
    categories,
    count,
    handleNextPage,
    handlePreviousPage,
    firstElementIndex,
    lastElementIndex,
    hasNextPage,
    pageIndex,
    query,
    setQuery,
  } = useInfiniteCategories();

  return (
    <>
      {selectedCategoryId && (
        <ModifyCategoryModal
          open={modifyCategoryModalOpen}
          setOpen={setModifyCategoryModalOpen}
          categoryId={selectedCategoryId}
        />
      )}

      <AddCategoryModal
        open={addCategoryModalOpen}
        setOpen={setAddCategoryModalOpen}
      />

      <div className="mb-6 mt-4 flex items-center justify-between">
        <Breadcrumbs pages={pages} />
        <div
          className="inline-flex h-fit cursor-pointer items-center rounded-md border border-transparent bg-selective-yellow-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-valley-yellow-600 focus:outline-none focus:ring-2 focus:ring-selective-yellow-500 focus:ring-offset-2"
          onClick={handleAddCategoryClicked}
        >
          Add
        </div>
      </div>
      <CategoryFilter query={query} setQuery={setQuery} />

      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="cursor-pointer divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category.id}>
              <div
                className="block hover:bg-gray-50"
                onClick={() => handleClickedCategory(category)}
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold text-valley-yellow-700 antialiased">
                      {category.name}
                    </p>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <PresentationChartLineIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {category._count.Courses}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>
                        Created at{' '}
                        <time dateTime={category.createdAt.toDateString()}>
                          {category.createdAt.toDateString()}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <AdminNavigation
        count={count}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        firstElementIndex={firstElementIndex}
        lastElementIndex={lastElementIndex}
        hasNextPage={hasNextPage}
        pageIndex={pageIndex}
      />
    </>
  );
};

CategoriesAdminPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default CategoriesAdminPage;
