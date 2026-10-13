import { useEffect, useRef, type ReactNode } from "react";

export function Modal({
  title,
  onClose,
  children,
  className = "",
  onKeyDown,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  onKeyDown?: (key: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    dialog.focus({ preventScroll: true });
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={title}
      tabIndex={-1}
      onCancel={onClose}
      onKeyDown={(e) => onKeyDown?.(e.key)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          className="icon-button modal-close"
          onClick={onClose}
          aria-label="Đóng cửa sổ"
        >
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
}
