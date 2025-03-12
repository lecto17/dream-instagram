import React from "react";

interface InstagramBorderProps {
  children: React.ReactNode;
  padding?: string;
  rounded?:
    | "rounded-xs"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-xl"
    | "rounded-2xl"
    | "rounded-full";
  className?: string;
}

const InstagramBorder = ({
  children,
  padding = "p-[2px]",
  rounded = "rounded-full",
  className,
}: InstagramBorderProps) => {
  return (
    <div
      className={`flex w-fit overflow-hidden bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#C42D91] ${padding} ${rounded} ${className}`}
    >
      <div
        className={`flex-grow w-fit bg-white ${padding} ${rounded} hover:opacity-90 transition`}
      >
        {React.isValidElement(children)
          ? React.cloneElement(
              children as React.ReactElement<{ className?: string }>,
              {
                className: `${(children as React.ReactElement<{ className?: string }>).props.className ?? ""} ${rounded} bg-white`,
              }
            )
          : children}
      </div>
    </div>
  );
};

export default InstagramBorder;
