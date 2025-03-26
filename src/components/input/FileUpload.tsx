"use client";

import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { ChangeEvent, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

type Props = {
  file?: File;
  onChange: (file: File | undefined) => void;
};

const FileUpload = ({ file, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLElement>(null);
  const [uploaded, setUploaded] = useState<string>();
  const isDragging = useDragAndDrop({
    onChange: (e: DragEvent) => handleDrag(e),
    dragRef,
  });

  const setFileAndPreview = (file: File) => {
    onChange(file);
    setUploaded(URL.createObjectURL(file));
  };

  const handleDrag = (e: DragEvent) => {
    const files = e.dataTransfer?.files;
    if (!files || !files?.length) return;

    setFileAndPreview(files[0]);
  };

  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;

    if (!input.files?.[0]) return;

    setFileAndPreview(input.files[0]);
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleClickClose = () => {
    onChange(undefined);
  };

  return (
    <section
      className={`flex w-full border-2 border-blue-300 border-dashed p-5 max-h-[300px] relative overflow-hidden ${isDragging ? "bg-sky-300 bg-opacity-15" : ""}`}
      ref={dragRef}
    >
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
              className="absolute top-5 right-5 w-fit h-fit hover:scale-110 hover:font-semibold transition"
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
