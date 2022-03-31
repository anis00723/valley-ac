type CoursesNavigationProps = {
  onNextPage: () => void;
  onPreviousPage: () => void;
  count: number;
  firstElementIndex: number;
  lastElementIndex: number;
  hasNextPage: boolean;
  pageIndex: number;
};

const CoursesNavigation = (props: CoursesNavigationProps) => {
  const {
    onNextPage,
    onPreviousPage,
    count,
    firstElementIndex,
    lastElementIndex,
    hasNextPage,
    pageIndex,
  } = props;
  return (
    <nav
      className="mt-16 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{firstElementIndex}</span> to{' '}
          <span className="font-medium">{lastElementIndex}</span> of{' '}
          <span className="font-medium">{count}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-25"
          disabled={pageIndex === 0}
          onClick={onPreviousPage}
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-25"
          onClick={onNextPage}
          disabled={!hasNextPage}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default CoursesNavigation;
