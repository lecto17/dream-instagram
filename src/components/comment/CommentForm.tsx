import { Comment } from "@/types/post";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

type CommentFormProps = {
  postId: string;
  formStyle?: string;
  onSubmit: (comment: Comment, postId: string) => void;
};

const CommentForm = ({ postId, formStyle, onSubmit }: CommentFormProps) => {
  const { data } = useSession();
  const user = data?.user;
  const [value, setValue] = useState("");

  const handleChangeValue = useCallback((e: React.ChangeEvent) => {
    const comment = (e.target as HTMLInputElement).value;
    setValue(comment);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSubmit(
      {
        comment: value,
        user: { username: user?.username || "", image: user?.image },
      },
      postId
    );
    setValue("");
  };

  return (
    <form className={`flex w-full ${formStyle}`} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full py-2 pr-4 outline-none text-sm"
        value={value}
        onChange={handleChangeValue}
      />
      <input
        type="submit"
        value="게시"
        className={`py-1 px-2 font-bold hover:text-black rounded-md text-sm cursor-pointer transition-all duration-300 ${value.length ? "text-sky-400" : "text-gray-400"}`}
        disabled={!value}
      />
    </form>
  );
};

export default CommentForm;
