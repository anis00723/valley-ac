import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useState, Fragment } from 'react';
import { trpc } from 'utils/trpc';

const FormationDropdown = () => {
  const categoryQuery = trpc.useQuery(['category.all']);

  const [formationMenuOpen, setFormationMenuOpen] = useState(false);
  return (
    <div
      className="relative inline-flex items-center px-4 pt-1 text-sm font-medium text-gray-900 hover:bg-gray-100"
      onMouseEnter={() => setFormationMenuOpen(true)}
      onMouseLeave={() => setFormationMenuOpen(false)}
    >
      <>
        <div className="inline-flex justify-center w-full">
          <a href="#">Nos Formations</a>
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </div>
        <Transition
          as={Fragment}
          show={formationMenuOpen}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="absolute top-0 left-0 z-10 w-48 py-1 mt-16 origin-top-right bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {categoryQuery.data?.map(({ id, name }) => (
              <div key={id}>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:text-gray-700 hover:bg-gray-100"
                >
                  {name}
                </a>
              </div>
            ))}
          </div>
        </Transition>
      </>
    </div>
  );
};

export default FormationDropdown;
