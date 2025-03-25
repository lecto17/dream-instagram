"use client";

import { ChangeEvent, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

type Props = {
  file?: File;
  onChange: (file: File | undefined) => void;
};

const FileUpload = ({ file, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = useState<string>();

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;

    if (!input.files?.[0]) return;

    onChange(input.files[0]);
    setUploaded(URL.createObjectURL(input.files[0]));
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleClickClose = () => {
    onChange(undefined);
  };

  return (
    <section className="flex w-full border-2 border-blue-300 border-dashed p-5 max-h-[300px] relative overflow-hidden">
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
      {file && (
        <div className="absolute inset-0 flex justify-center bg-white w-full">
          <div className="relative">
            <button
              className="absolute top-5 right-5 w-fit h-fit"
              onClick={handleClickClose}
            >
              X
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={uploaded}
              alt="uploaded image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default FileUpload;
