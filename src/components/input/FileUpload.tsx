"use client";

import { ChangeEvent, useRef } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

type Props = {
  onChange: (file: File) => void;
};

const FileUpload = ({ onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;

    if (!input.files?.[0]) return;
    onChange(input.files[0]);
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <section className="flex w-full border-2 border-blue-300 border-dashed p-5">
      <input
        type="file"
        id="fileUpload"
        onChange={handleChange}
        ref={inputRef}
        hidden
      />
      <div
        className="w-full flex flex-col justify-center items-center"
        onClick={handleClick}
      >
        <IoCloudUploadOutline className="w-full" size={250} />
        <label htmlFor="fileUpload">
          Drag and Drop your image here or click
        </label>
      </div>
    </section>
  );
};

export default FileUpload;
