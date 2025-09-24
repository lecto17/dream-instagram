import { useCallback } from 'react';
import type { ReactNode } from 'react';

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: ReactNode;
  offIcon: ReactNode;
  ariaLabel?: string;
};

const ToggleButton = ({
  toggled,
  onToggle,
  onIcon,
  offIcon,
  ariaLabel,
}: Props) => {
  const handleToggle = useCallback(() => {
    onToggle(!toggled);
  }, [onToggle, toggled]);
  return (
    <button
      onClick={handleToggle}
      aria-label={ariaLabel ?? 'toggle button'}
    >
      {toggled ? onIcon : offIcon}
    </button>
  );
};

export default ToggleButton;
