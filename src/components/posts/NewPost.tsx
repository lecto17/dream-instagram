'use client';

import Avatar from '@/components/avatar/Avatar';
import PublishButton from '@/components/button/PublishButton';
import FileUpload from '@/components/input/FileUpload';
import Loading from '@/components/loading/Loading';
import usePosts from '@/hooks/usePosts';

// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import useUser from '@/hooks/useUser';

const NewPost = () => {
  // const { data } = useSession();
  // const user = data?.user;

  const router = useRouter();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const { addPost } = usePosts();

  const { user: userProfile } = useUser();

  // if (!user) {
  //   router.push('/auth/login');
  //   return;
  // }

  const handleClickPublish = async () => {
    setLoading(true);
    try {
      await addPost(textAreaRef.current?.value || '', file || undefined);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.toString());
    } finally {
      router.push('/');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 items-center">
      {loading && (
        <div className="absolute z-20 inset-0 w-full h-full bg-sky-400/20">
          <Loading />
        </div>
      )}
      {error && (
        <p className="w-full h-full bg-red-300 p-4 font-bold text-center mb-5">
          {error}
        </p>
      )}
      <div className="flex items-center mb-5">
        <Avatar user={userProfile!} />
        <span className="ml-3">{userProfile?.userName}</span>
      </div>
      <FileUpload
        file={file}
        onChange={setFile}
      />
      <textarea
        className="w-full border px-4 py-2 my-5 min-h-32 outline-none text-sm resize-none"
        placeholder="게시글의 내용을 입력해주세요 🎈"
        ref={textAreaRef}
      />
      <PublishButton onClick={handleClickPublish} />
    </div>
  );
};

export default NewPost;
