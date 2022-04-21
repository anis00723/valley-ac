import { Category } from '@prisma/client';
import { Editor } from '@tinymce/tinymce-react';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { classNames } from 'utils/classNames';
import SelectMenu from './SelectMenu';

const ImageSVG = () => (
  <svg
    className="mx-auto h-12 w-12 text-gray-600"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    <path
      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SpinnerComponent = () => (
  <div className="mx-auto h-12 w-12 text-gray-600">
    <div
      className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

type PropsType = {
  formState: {
    name: string | undefined;
    description: string | undefined;
    price: number | undefined;
    featured: boolean | undefined;
    published: boolean | undefined;
  };
  thumbnail: string | undefined;
  categories: Category[] | null;
  selectedCategory: Category | undefined;
  editorValue: string | undefined;
  setEditorValue: (value: string) => void;
  handleChange: (e: any) => void;
  onThumbnailDrop: (acceptedFiles: File[]) => void;
  setSelectedCategory: (category: Category) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
};

const CourseInputForm = ({
  formState,
  handleChange,
  onThumbnailDrop,
  thumbnail,
  categories,
  selectedCategory,
  setSelectedCategory,
  editorValue,
  setEditorValue,
  handleCancel,
  handleSubmit,
}: PropsType) => {
  const [thumbnailIsUploading, setThumbnailIsUploading] = useState(false);

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

  const editorRef = useRef(null);

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              General Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              General information about the course.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formState.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences what this course is about.
              </p>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formState.price}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    USD
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <fieldset>
                <legend className="text-base font-medium text-gray-900">
                  Featured & Published
                </legend>
                <div className="mt-4 space-y-4">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="featured"
                        name="featured"
                        checked={formState.featured}
                        onChange={handleChange}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="featured"
                        className="font-medium text-gray-700"
                      >
                        Is Featured
                      </label>
                      <p className="text-gray-500">
                        If a course is featured it will be displayed in the
                        langing page.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="published"
                        name="published"
                        checked={formState.published}
                        onChange={handleChange}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="published"
                        className="font-medium text-gray-700"
                      >
                        Is Published
                      </label>
                      <p className="text-gray-500">
                        If a course is published it will show in the courses
                        list else it will be hidden.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

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
                      defaultValue={thumbnail}
                      className="sr-only"
                      {...getInputProps()}
                    />
                    <p className="pl-1">
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Category
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Select the category and modules that this course belongs to.
            </p>
          </div>

          <div className="mt-6">
            <SelectMenu
              label={'Category'}
              options={categories}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Front page
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Write a few sentences what this course is about.
            </p>
          </div>
          <div className="mt-6">
            {
              <Editor
                // @ts-ignore
                onInit={(evt, editor) => (editorRef.current = editor)}
                apiKey="2ldt4e6fud5ahxocva48icsccabhi0x8iobaa5qxkutkay8d"
                // initialValue="<p>This is the initial content of the editor.</p>"
                onEditorChange={(newValue) => setEditorValue(newValue)}
                value={editorValue}
                textareaName="content"
                init={{
                  height: 500,
                  menubar: true,
                  plugins:
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
                  toolbar:
                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                  quickbars_selection_toolbar:
                    'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                  toolbar_mode: 'sliding',
                  relative_urls: false,
                  convert_urls: false,
                  remove_script_host: false,
                  file_picker_callback: (callback, value, meta) => {
                    // /* Provide file and text for the link dialog */
                    // if (meta.filetype === 'file') {
                    //   callback('https://www.google.com/logos/google.jpg', {
                    //     text: 'My text',
                    //   });
                    // }
                    /* Provide image and alt text for the image dialog */
                    if (meta.filetype === 'image') {
                      const input = document.createElement('input');
                      input.setAttribute('type', 'file');
                      input.setAttribute('accept', 'image/*');
                      input.addEventListener('change', async (event) => {
                        // @ts-ignore
                        const files = event.target?.files;
                        if (files && files[0]) {
                          const image = files[0];
                          const body = new FormData();
                          body.append('file', image);
                          const response = await fetch('/api/image', {
                            method: 'POST',
                            body,
                          });
                          const { filePath } = await response.json();
                          callback(filePath, {
                            alt: 'My alt text',
                          });
                        }
                      });
                      input.click();
                    }
                    // /* Provide alternative source and posted for the media dialog */
                    // if (meta.filetype === 'media') {
                    //   callback('movie.mp4', {
                    //     source2: 'alt.ogg',
                    //     poster: 'https://www.google.com/logos/google.jpg',
                    //   });
                    // }
                  },
                }}
              />
            }
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Modules
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add or delele Modules for this course
            </p>
          </div>
          <div className="mt-6">{/* Modules */}</div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default CourseInputForm;
