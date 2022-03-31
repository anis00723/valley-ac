import { trpc } from 'utils/trpc';

export default function FeaturedCourses() {
  const categoryQuery = trpc.useQuery(['course.featured']);
  console.log(categoryQuery);
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Les Formations du moment
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
          {categoryQuery.data?.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-lg bg-white p-3 pb-4 shadow-sm hover:opacity-75"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                <img
                  src={product.thumbnail}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
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
