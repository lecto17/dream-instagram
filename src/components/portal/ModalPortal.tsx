import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const ModalPortal = ({ children }: Props) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const portal = document.getElementById('portal');
  return createPortal(children, portal!);
};

export default ModalPortal;
