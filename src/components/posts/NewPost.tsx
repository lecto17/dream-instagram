"use client";

import Avatar from "@/components/avatar/Avatar";
import PublishButton from "@/components/button/PublishButton";
import FileUpload from "@/components/input/FileUpload";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

const NewPost = () => {
  const { data } = useSession();
  const user = data?.user;

  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();

  if (!user) redirect("/auth/login");

  return (
    <div className="flex flex-col p-4 items-center">
      <div className="flex items-center mb-5">
        <Avatar user={user} />
        <span className="ml-3">{user.username}</span>
      </div>
      <FileUpload file={file} onChange={setFile} />
      <textarea
        className="w-full border px-4 py-2 my-5 min-h-32 outline-none text-sm resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="write a message..."
      />
      <PublishButton text={text} file={file} />
    </div>
  );
};

export default NewPost;
