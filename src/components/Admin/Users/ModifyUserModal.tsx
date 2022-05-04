import { Transition, Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { Fragment, useEffect, useState } from 'react';
import { trpc } from 'utils/trpc';
import { UserRole } from '@prisma/client';
import SelectMenu, { SelectableItem } from 'components/Shared/SelectMenu';
import RadioGroup, { Option } from 'components/Shared/RadioGroup';

const UserActiveOptions = [
  {
    id: 'active',
    title: 'Active',
  },
  {
    id: 'inactive',
    title: 'Inactive',
  },
];

const ModifyUserModal = ({
  open,
  setOpen,
  userId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
}) => {
  const utils = trpc.useContext();
  const userQuery = trpc.useQuery(['user.one', { id: userId }]);
  const user = userQuery.data?.user;

  const [selectedRole, setSelectedRole] = useState<SelectableItem>();
  const [selectedActiveOption, setSelectedActiveOption] = useState<Option>();

  const userMutation = trpc.useMutation('user.update', {
    onSuccess: async () => {
      setOpen(false);
      await utils.invalidateQueries(['user.all']);
      await utils.invalidateQueries(['user.one', { id: userId }]);
    },
  });

  useEffect(() => {
    if (user) {
      setSelectedRole({
        id: `${user.role}`,
        name: `${user.role}`,
      });

      setSelectedActiveOption(
        user?.isActive ? UserActiveOptions[0] : UserActiveOptions[1],
      );
    }
  }, [user, open]);

  const rolesOptions = Object.keys(UserRole).map((role) => ({
    id: role,
    name: role,
  }));

  const handleSave = async () => {
    const isActive = selectedActiveOption?.id === 'active';
    const role = selectedRole?.id;

    userMutation.mutate({
      id: userId,
      isActive,
      // @ts-ignore
      role,
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block transform rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-valley-yellow-500 focus:ring-offset-2"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Modify {user?.name}
                </Dialog.Title>
                <div className="mt-6">
                  <label className="text-base font-medium text-gray-900">
                    Role
                  </label>
                  <p className="text-sm leading-5 text-gray-500">
                    Defines what the user is able to do in the application
                  </p>
                  <SelectMenu
                    options={rolesOptions}
                    selected={selectedRole}
                    setSelected={setSelectedRole}
                  />
                </div>
                <div className="mt-6">
                  <RadioGroup
                    options={UserActiveOptions}
                    selectedOption={selectedActiveOption}
                    setSelectedOption={setSelectedActiveOption}
                    label={'Active'}
                    comment={'User is active or inactive?'}
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-valley-yellow-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-valley-yellow-700 focus:outline-none focus:ring-2 focus:ring-valley-yellow-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-valley-yellow-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModifyUserModal;
