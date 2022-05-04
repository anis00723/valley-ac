export type Option = {
  id: string;
  title: string;
};

export default function RadioGroup({
  options,
  selectedOption,
  setSelectedOption,
  label,
  comment,
}: {
  options: Option[];
  selectedOption: Option | undefined;
  setSelectedOption: (option: Option) => void;
  label: string;
  comment?: string;
}) {
  return (
    <div>
      <label className="text-base font-medium text-gray-900">{label}</label>
      {comment && <p className="text-sm leading-5 text-gray-500">{comment}</p>}
      <fieldset className="mt-4">
        <legend className="sr-only">{label}</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {options.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                id={option.id}
                name={option.id}
                type="radio"
                value={option.id}
                checked={selectedOption?.id === option.id}
                onChange={() => setSelectedOption(option)}
                className="h-4 w-4 border-gray-300 text-valley-yellow-600 focus:ring-valley-yellow-500"
              />
              <label
                htmlFor={option.id}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {option.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
