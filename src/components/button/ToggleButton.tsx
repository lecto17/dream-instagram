import { useCallback } from "react";

type Props = {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

const ToggleButton = ({ toggled, onToggle, onIcon, offIcon }: Props) => {
  const handleToggle = useCallback(() => {
    onToggle(!toggled);
  }, [onToggle, toggled]);
  return <button onClick={handleToggle}>{toggled ? onIcon : offIcon}</button>;
};

export default ToggleButton;
