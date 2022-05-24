import { UsersIcon } from '@heroicons/react/outline';
import Image from 'components/Image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import processCourses from 'utils/processCourses';
import { trpc } from 'utils/trpc';

export default function FeaturedCourses() {
  const featuredCoursesQuery = trpc.useQuery(['course.featured']);

  const [courses, setCourses] = useState(() =>
    processCourses(featuredCoursesQuery.data),
  );

  useEffect(() => {
    const processedCourses = processCourses(featuredCoursesQuery.data);
    setCourses(processedCourses);
  }, [featuredCoursesQuery.data]);

  return (
    <div className="bg-cape-cod-100">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Featured Courses
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {courses?.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-lg bg-white p-3 pb-4 shadow-sm hover:opacity-75"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                <div className="h-full w-full object-cover object-center">
                  <Image
                    layout="fill"
                    src={product.thumbnail}
                    alt={product.name}
                  />
                </div>
                <div
                  className="flex items-end p-4 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100"
                  aria-hidden="true"
                >
                  <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                    More Details
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                <h3>
                  <Link href={`/Course/${product.id}`}>
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </Link>
                </h3>
                <p>${product.price}</p>
              </div>

              <p className="mt-3 mr-2 text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-3 mb-4 flex items-center justify-between">
                <p className="text-sm italic text-gray-600">
                  {product.category.name}
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  {product._count.enrolledUsers}
                  <UsersIcon className="ml-1 inline-block h-3 w-3" />
                </p>
              </div>

              <div className="flex items-center justify-between border-t pt-2">
                <p className="text-sm text-gray-700">
                  {product._count.reviews} reviews
                </p>

                <div className="flex flex-shrink-0">
                  <StarRatings
                    rating={product.avgRating}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
