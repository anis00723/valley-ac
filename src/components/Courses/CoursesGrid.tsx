import Link from 'next/link';
import React from 'react';
import StarRatings from 'react-star-ratings';
import { ResultItem } from 'server/routers/course';
import { UsersIcon } from '@heroicons/react/outline';

const CoursesGrid = ({ courses }: { courses: ResultItem[] }) => {
  return (
    <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Courses</h2>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        {courses?.map((product) => (
          <div
            key={product.id}
            className="relative flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg group"
          >
            <div className="bg-gray-200 aspect-w-4 aspect-h-4 group-hover:opacity-75 sm:aspect-none sm:h-48">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="object-cover object-center w-full h-full sm:w-full sm:h-full"
              />
            </div>
            <div className="flex flex-col flex-1 p-4 space-y-2">
              <h3 className="flex items-center justify-between text-sm font-medium text-gray-900">
                <Link href={`/Course/${product.id}`}>
                  <a href="">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </Link>

                <p className="text-gray-700">${product.price}</p>
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <div className="flex flex-col justify-end flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm italic text-gray-600">
                    {product.category.name}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    {product._count.enrolledUsers}
                    <UsersIcon className="inline-block w-3 h-3 ml-1" />
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
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
          </div>
        ))}
      </div>
    </div>
  );
};
export default CoursesGrid;
