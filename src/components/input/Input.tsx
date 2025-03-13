"use client";

type Props = {
  propValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ propValue, onChange }: Props) => {
  return (
    <section>
      <input
        className="w-full px-3 py-2 border border-black rounded-sm outline-none mt-3"
        placeholder="유저명 혹은 이름으로 검색해보세요."
        value={propValue}
        onChange={onChange}
      />
    </section>
  );
};

export default Input;
