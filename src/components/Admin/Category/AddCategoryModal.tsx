import { Transition, Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ImageSVG } from 'components/Shared/ImageSVG';
import { SpinnerComponent } from 'components/Shared/SpinnerComponent';
import { Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { classNames } from 'utils/classNames';
import { trpc } from 'utils/trpc';

const AddCategoryModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const utils = trpc.useContext();

  const [name, setName] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState();

  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailErrorMessage, setThumbnailErrorMessage] = useState();

  const [thumbnailIsUploading, setThumbnailIsUploading] = useState(false);

  const onThumbnailDrop = useCallback(async (acceptedFiles: File[]) => {
    const body = new FormData();
    body.append('file', acceptedFiles[0]);
    const response = await fetch('/api/image', {
      method: 'POST',
      body,
    });
    const { filePath } = await response.json();

    setThumbnail(filePath);
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setThumbnailIsUploading(true);
      onThumbnailDrop(acceptedFiles);
      setThumbnailIsUploading(false);
    },
    [onThumbnailDrop],
  );

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 10,
    accept: 'image/jpeg, image/png',
  });

  const categoryMutation = trpc.useMutation('category.add', {
    onSuccess: async () => {
      setOpen(false);
      await utils.invalidateQueries(['category.all']);
      await utils.invalidateQueries(['category.infinite']);
    },
    onError: (error) => {
      // @ts-ignore
      JSON.parse(error.message).forEach((message) => {
        if (message.path.includes('name')) {
          setNameErrorMessage(message.message);
        }

        if (message.path.includes('thumbnail')) {
          setThumbnailErrorMessage(message.message);
        }
      });
    },
  });

  const handleSave = async () => {
    setThumbnailErrorMessage(undefined);
    setNameErrorMessage(undefined);
    categoryMutation.mutate({
      name,
      thumbnail,
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
                  Modify a Category
                </Dialog.Title>
                <div className="mt-6">
                  <label
                    className="text-base font-medium text-gray-900"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <p className="text-sm leading-5 text-gray-500">
                    Modify the name of the category
                  </p>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {/* Error */}
                  {nameErrorMessage && (
                    <div className="mt-2 text-sm text-red-600">
                      {nameErrorMessage}
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="thumbnail-photo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Thumbnail
                    </label>
                    <div
                      className={classNames(
                        isDragActive || isFocused
                          ? 'border-blue-400'
                          : 'border-gray-300',
                        'mt-1 flex h-96 items-center justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6',
                      )}
                      style={{
                        backgroundImage: `url(${thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      {...getRootProps()}
                    >
                      <div
                        className={classNames(
                          thumbnail && !thumbnailIsUploading
                            ? 'opacity-0 transition ease-in-out hover:opacity-100'
                            : '',
                          'h-fit space-y-1 rounded-md border-2 border-dashed border-gray-400/80 bg-gray-100/80 p-4 text-center',
                        )}
                      >
                        {!thumbnailIsUploading && <ImageSVG />}
                        {thumbnailIsUploading && <SpinnerComponent />}
                        <div className="flex items-center text-sm text-gray-600">
                          <input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            className="sr-only"
                            {...getInputProps()}
                          />
                          <p className="pl-1">
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        </div>
                        <p className="text-xs text-gray-600">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                  {thumbnailErrorMessage && (
                    <div className="mt-2 text-sm text-red-600">
                      {thumbnailErrorMessage}
                    </div>
                  )}
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

export default AddCategoryModal;
