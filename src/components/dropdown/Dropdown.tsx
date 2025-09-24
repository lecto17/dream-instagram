import type { ReactNode } from 'react';

type DropdownProps = {
  options: {
    label: ReactNode;
    value: string;
    onClick?: (data?: unknown) => void;
  }[];
};

const Dropdown = ({ options }: DropdownProps) => {
  return (
    <div className="bg-white rounded-md shadow-md min-w-20">
      <ul className="flex flex-col gap-2">
        {options.map((option) => (
          <li key={option.value}>
            <button
              className="w-full p-2 text-sm hover:bg-gray-300 transition whitespace-nowrap"
              onClick={option?.onClick}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
