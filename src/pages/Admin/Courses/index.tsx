import {
  AnnotationIcon,
  CalendarIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import CoursesNavigation from 'components/Courses/CoursesNavigation';
import AdminLayout from 'components/Layout/AdminLayout';
import { NextPageWithLayout } from 'pages/_app';
import StarRatings from 'react-star-ratings';
import { useInfiniteCourses } from 'hooks';
import Link from 'next/link';
import CoursesFilter from 'components/Admin/Courses/CoursesFilter';

const CoursesAdminPage: NextPageWithLayout = () => {
  const {
    courses,
    count,
    handleNextPage,
    handlePreviousPage,
    firstElementIndex,
    lastElementIndex,
    hasNextPage,
    pageIndex,
  } = useInfiniteCourses(true);

  return (
    <>
      <CoursesFilter />

      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {courses.map((course) => (
            <li key={course.id}>
              <Link href={`/Admin/Courses/${course.id}`}>
                <a href="#" className="flex justify-between hover:bg-gray-50">
                  <div className="grow px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="flex  truncate text-sm font-medium text-indigo-600">
                        {course.name}
                      </p>
                      <div className="ml-2 flex flex-shrink-0">
                        <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          {course.category.name}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <UsersIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {course._count.enrolledUsers}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <CurrencyDollarIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {course.price}
                        </p>
                        <p className="flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <AnnotationIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {course._count.reviews}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <div className="mr-4 flex flex-shrink-0">
                          <StarRatings
                            rating={course.avgRating}
                            starDimension="1.25rem"
                            starSpacing="0.0px"
                            starRatedColor="rgb(250 204 21)"
                            starEmptyColor="rgb(229 231 235)"
                            numberOfStars={5}
                            svgIconViewBox="1 2 20 20"
                            svgIconPath="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            name="rating"
                          />
                        </div>
                        <CalendarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          Created at{' '}
                          <time dateTime={course.createdAt.toDateString()}>
                            {course.createdAt.toDateString()}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mr-4 flex w-6 items-center">
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <CoursesNavigation
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

CoursesAdminPage.getLayout = (page) => (
  <AdminLayout pageName={'Courses'}>{page}</AdminLayout>
);

export default CoursesAdminPage;
