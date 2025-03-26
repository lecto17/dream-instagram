"use client";

import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

type Props = {
  file?: File;
  onChange: (file: File | undefined) => void;
};

const FileUpload = ({ file, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLElement>(null);
  const [uploaded, setUploaded] = useState<File>();
  const isDragging = useDragAndDrop({
    onChange: (e: DragEvent) => handleDrag(e),
    dragRef,
  });

  const setFileAndPreview = (file: File) => {
    onChange(file);
    setUploaded(file);
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
          <div className="relative w-full">
            <button
              className="absolute z-10 top-5 right-5 w-fit h-fit hover:scale-110 hover:font-semibold transition"
              onClick={handleClickClose}
            >
              X
            </button>
            <Image
              src={URL.createObjectURL(uploaded!)}
              alt="uploaded image"
              fill
              sizes="650px"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default FileUpload;
