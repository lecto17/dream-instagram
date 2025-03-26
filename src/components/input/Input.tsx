"use client";

type Props = {
  propValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Input = ({ propValue, onChange, placeholder }: Props) => {
  return (
    <section>
      <input
        className="w-full px-3 py-2 border border-black rounded-sm outline-none mt-3"
        placeholder={placeholder}
        value={propValue}
        onChange={onChange}
      />
    </section>
  );
};

export default Input;
