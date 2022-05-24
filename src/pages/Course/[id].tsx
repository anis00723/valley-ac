import StarRatings from 'react-star-ratings';
import processCourse from 'utils/processCourse';
import { ResultItem } from 'server/routers/course';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { trpc } from 'utils/trpc';
import Image from 'next/image';
import Link from 'next/link';

export default function CoursePage() {
  const router = useRouter();
  const { id } = router.query;
  const courseQuery = trpc.useQuery(['course.one', { id: id as string }]);
  const [course, setCourse] = useState<ResultItem>();

  useEffect(() => {
    if (courseQuery?.data) {
      setCourse(processCourse(courseQuery.data));
    }
  }, [courseQuery]);

  const breadcrumbs = [
    { id: 1, name: 'Courses', href: '/Courses/all' },
    {
      id: 2,
      name: course?.category.name,
      href: `/Courses/${course?.category.name}`,
    },
  ];

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <Link href={`/Course/${course?.id}`} aria-current="page">
                <a className="font-medium text-gray-500 hover:text-gray-600">
                  {course?.name}
                </a>
              </Link>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="aspect-w-16 aspect-h-8 hidden overflow-hidden rounded-lg lg:block">
            <Image
              layout="fill"
              src={course?.thumbnail || '/placeholder.png'}
              className="h-full w-full object-cover object-center"
              alt={course?.name}
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {course?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Course information</h2>
            <p className="text-3xl text-gray-900">${course?.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <StarRatings
                  rating={course?.avgRating ? course.avgRating : 0}
                  starDimension="1.25rem"
                  starSpacing="0.px"
                  starRatedColor="rgb(250 204 21)"
                  starEmptyColor="rgb(229 231 235)"
                  numberOfStars={5}
                  svgIconViewBox="1 1 20 20"
                  svgIconPath="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  name="rating"
                />
                <p className="sr-only">
                  {course?.avgRating ? course.avgRating : 0} out of 5 stars
                </p>
                <a
                  href={'#'}
                  className="ml-3 text-sm font-medium text-valley-yellow-600 hover:text-valley-yellow-500"
                >
                  {course?._count.reviews} reviews
                </a>
              </div>
            </div>

            <form className="mt-4">
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Description
                </h3>

                <div className="mt-4">
                  <div className="list-disc space-y-2 text-sm">
                    <p className="text-base text-gray-600">
                      {course?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-valley-yellow-600 px-8 py-3 text-base font-medium text-white hover:bg-valley-yellow-700 focus:outline-none focus:ring-2 focus:ring-valley-yellow-500 focus:ring-offset-2"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            <div className="">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p
                  className="text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: course?.content || '' }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
