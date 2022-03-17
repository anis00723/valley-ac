import { trpc } from 'utils/trpc';

export default function FeaturedCourses() {
  const categoryQuery = trpc.useQuery(['course.featured']);
  return (
    <div className="bg-gray-100">
      <div className="max-w-2xl px-4 py-10 mx-auto sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Les Formations du moment
          </h2>
        </div>
        <div className="grid grid-cols-1 mt-6 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {categoryQuery.data?.map((product) => (
            <div
              key={product.id}
              className="relative p-3 pb-4 bg-white rounded-lg shadow-sm group hover:opacity-75"
            >
              <div className="overflow-hidden bg-gray-100 rounded-lg shadow-sm aspect-w-4 aspect-h-3">
                <img
                  src={product.thumbnail}
                  alt=""
                  className="object-cover object-center w-full h-full"
                />
                <div
                  className="flex items-end p-4 transition-opacity duration-150 opacity-0 group-hover:opacity-100 group-focus:opacity-100"
                  aria-hidden="true"
                >
                  <div className="w-full px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white bg-opacity-75 rounded-md backdrop-filter backdrop-blur">
                    More Details
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 space-x-8 text-base font-medium text-gray-900">
                <h3>
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p>${product.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {product.category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
