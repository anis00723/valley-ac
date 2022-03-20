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
      className="flex items-center justify-between px-4 py-3 mt-16 bg-white border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{firstElementIndex}</span> to{' '}
          <span className="font-medium">{lastElementIndex}</span> of{' '}
          <span className="font-medium">{count}</span> results
        </p>
      </div>
      <div className="flex justify-between flex-1 sm:justify-end">
        <button
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed"
          disabled={pageIndex === 0}
          onClick={onPreviousPage}
        >
          Previous
        </button>
        <button
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed"
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
