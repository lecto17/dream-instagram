import { useClickOutside } from '@/hooks/useClickOutside';
import { useRef, useState } from 'react';
import { VscReactions } from 'react-icons/vsc';
import { REACTION_BAR_ITEMS } from '@/types/reaction';

type ReactionSelectorProps = {
  onReaction: (postId: string, reaction: string) => void;
  postId: string;
};

const ReactionSelector = ({ onReaction, postId }: ReactionSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  const handleReaction = (reaction: string) => {
    console.log('Selected reaction:', reaction, 'for post:', postId);
    onReaction(postId, reaction);
    setIsOpen(false); // 리액션 선택 후 드롭다운 닫기
  };

  return (
    <div
      ref={containerRef}
      className="flex w-full py-2 relative"
    >
      <VscReactions
        onClick={handleOpen}
        size={24}
        className="cursor-pointer w-fit"
      />

      <ul
        className={`flex absolute left-0 top-[90%] bg-white space-x-2 rounded-md shadow-md px-2 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {REACTION_BAR_ITEMS.map((item) => (
          <li
            key={item.id}
            className="text-lg p-1 cursor-pointer hover:bg-gray-100 rounded-md"
            onClick={() => handleReaction(item.icon)}
          >
            {item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReactionSelector;
