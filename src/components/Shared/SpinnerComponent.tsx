export const SpinnerComponent = () => (
  <div className="mx-auto h-12 w-12 text-gray-600">
    <div
      className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
