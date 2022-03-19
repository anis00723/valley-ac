import { trpc } from 'utils/trpc';

export default function CategoriesPreview() {
  const categoryQuery = trpc.useQuery(['category.all']);

  return (
    <div className="bg-white">
      <div className="py-10 sm:py-16 xl:max-w-7xl xl:mx-auto xl:px-8">
        <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Nos Formations par Catégorie
          </h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Voir toutes nos formations<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="flow-root mt-4">
          <div className="-my-2">
            <div className="box-content relative py-2 overflow-x-auto h-80 xl:overflow-visible">
              <div className="absolute flex px-4 space-x-8 min-w-screen-xl sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                {categoryQuery.data?.map((category) => (
                  <a
                    key={category.id}
                    href="#"
                    className="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto"
                  >
                    <span aria-hidden="true" className="absolute inset-0">
                      <img
                        src={category.thumbnail}
                        alt=""
                        className="object-cover object-center w-full h-full"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
                    />
                    <span className="relative mt-auto text-xl font-bold text-center text-white">
                      {category.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mt-6 sm:hidden">
          <a
            href="#"
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all categories<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
