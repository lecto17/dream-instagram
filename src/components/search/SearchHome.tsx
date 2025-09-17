'use client';
import Input from '@/components/input/Input';
// import SearchResult from '@/components/search/SearchResult';
import { useState } from 'react';

const placeholder = '유저명 혹은 이름으로 검색해보세요.';

const SearchHome = () => {
  const [value, setValue] = useState<string>('');

  //   const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value);
  };

  return (
    <div className="flex flex-col space-y-5">
      <Input
        propValue={value}
        onChange={handleChangeValue}
        placeholder={placeholder}
      />
      {/* <SearchResult text={value} /> */}
    </div>
  );
};

export default SearchHome;
