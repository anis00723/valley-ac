import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const UsersFilter = ({
  query,
  setQuery,
}: {
  query: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div className="rounded-md bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <section aria-labelledby="filter-heading" className="py-6">
          <h2 id="filter-heading" className="sr-only">
            Users filters
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <SearchIcon
                    className="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  value={query || ''}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 transition duration-150 ease-in-out focus:z-10 focus:border-valley-yellow-300 focus:outline-none focus:ring-valley-yellow-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Search field */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default UsersFilter;
