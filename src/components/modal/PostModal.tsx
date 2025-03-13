"use client";

import { useEffect } from "react";

type PostModal = {
  children: React.ReactNode;
  onClose: () => void;
};

const PostModal = ({ children, onClose }: PostModal) => {
  const handleClickOuter = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <section
      className="w-full h-full fixed top-0 left-0 z-10 bg-black bg-opacity-65 flex justify-center items-center max-w-[4000px]"
      onClick={handleClickOuter}
    >
      {children}
    </section>
  );
};

export default PostModal;
