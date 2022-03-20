import { StarIcon } from '@heroicons/react/solid';
import { Category, Course } from '@prisma/client';
import React from 'react';
import { classNames } from 'utils/classNames';

type CoursesGridPropType = {
  courses?: (Course & {
    category: Category;
  })[];
};

const CoursesGrid = ({ courses }: CoursesGridPropType) => {
  return (
    <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>

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
                <a href="#">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>

                <p className="text-gray-700">${product.price}</p>
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
              <div className="flex flex-col justify-end flex-1">
                <p className="text-sm italic text-gray-600">
                  {product.category.name}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <p className="text-sm text-gray-700">
                  {product.enrolledCount} reviews
                </p>
                <div className="flex flex-end">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating
                          ? 'text-yellow-400'
                          : 'text-gray-200',
                        'flex-shrink-0 h-5 w-5',
                      )}
                      aria-hidden="true"
                    />
                  ))}
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
