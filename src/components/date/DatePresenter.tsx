type DateProps = {
  date: number;
  isSelected: boolean;
  onClick?: () => void;
};

export default function DatePresenter({
  date,
  onClick,
  isSelected,
}: DateProps) {
  return (
    <div
      className="flex items-center justify-center border border-gray-300 rounded-md p-5 w-full cursor-pointer hover:font-bold hover:text-blue-500 transition-all duration-300"
      onClick={onClick}
    >
      <span
        className={`text-lg font-semibold ${isSelected ? 'text-blue-500' : ''}`}
      >
        {date}
      </span>
    </div>
  );
}
