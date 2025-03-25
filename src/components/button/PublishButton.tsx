import { addPost } from "@/utils/utils";
import { redirect } from "next/navigation";
import { memo } from "react";
import { useSWRConfig } from "swr";

type Props = {
  file?: File;
  text: string;
};

const PublishButton = memo(function PublishButton({ file, text }: Props) {
  const { mutate } = useSWRConfig();
  const handleClick = async () => {
    await addPost(text, file || undefined)
      .then(() => mutate("/api/posts"))
      .then(() => redirect("/"));
  };
  return (
    <button
      className="w-full border bg-sky-500 py-3 rounded-sm text-white"
      onClick={handleClick}
    >
      발행
    </button>
  );
});

export default PublishButton;
