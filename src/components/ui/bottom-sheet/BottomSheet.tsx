// BottomSheet.tsx
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number; // px, 기본 60vh
};

export default function BottomSheet({
  open,
  onClose,
  children,
  height = 0.6 * window.innerHeight,
}: BottomSheetProps) {
  const controls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);

  // // ESC로 닫기
  // useEffect(() => {
  //   const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
  //   if (open) window.addEventListener('keydown', onKey);
  //   return () => window.removeEventListener('keydown', onKey);
  // }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            className="absolute left-0 right-0 mx-auto max-w-md rounded-t-2xl bg-white shadow-xl"
            style={{ bottom: 0, height }}
            initial={{ y: height }} // 아래에서 시작
            animate={{ y: 0 }} // 올라옴
            exit={{ y: height }} // 내려가며 닫힘
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            drag="y"
            dragControls={controls}
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              const shouldClose = info.offset.y > 80 || info.velocity.y > 600;
              if (shouldClose) onClose();
            }}
          >
            <div className="flex flex-col items-center py-3 h-10">
              {/* Drag Handle */}
              <div
                className="mx-auto mt-2 mb-2 h-1 w-12 rounded-full bg-gray-300"
                onPointerDown={(e) => controls.start(e)}
              />
            </div>

            <div className="px-4 pb-4 h-[calc(100%-40px)] overflow-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
