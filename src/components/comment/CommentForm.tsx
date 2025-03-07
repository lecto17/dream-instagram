const CommentForm = () => {
  return (
    <form className="flex w-full">
      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full py-1 px-4 outline-none text-sm"
      />
      <input
        type="submit"
        value="등록"
        className="py-1 px-2 text-sky-400 font-bold hover:text-black rounded-md text-sm cursor-pointer transition-all duration-300"
      />
    </form>
  );
};

export default CommentForm;
