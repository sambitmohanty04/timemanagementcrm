import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type ErrorModalProps = {
  message: string;
  onClose: () => void;
  title?: string;
};

const ErrorModal = ({ message, onClose, title = "Error" }: ErrorModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Focus the close button when the modal opens
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-message"
        className="relative flex max-h-[80vh] w-full max-w-sm flex-col rounded-xl bg-slate-900 p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between">
          <h2
            id="error-modal-title"
            className="text-lg font-semibold text-yellow-400"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-gray-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message */}
        <p
          id="error-modal-message"
          className="mt-2 min-h-0 flex-1 overflow-y-auto whitespace-pre-line break-words text-sm text-gray-300"
        >
          {message}
        </p>

        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="mt-5 w-full shrink-0 rounded-lg bg-red-700 py-2 text-gray-300 transition hover:bg-red-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;