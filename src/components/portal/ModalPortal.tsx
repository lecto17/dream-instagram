import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};
const ModalPortal = ({ children }: Props) => {
  if (typeof window === "undefined") {
    return null;
  }

  const portal = document.getElementById("portal");
  return createPortal(children, portal!);
};

export default ModalPortal;
