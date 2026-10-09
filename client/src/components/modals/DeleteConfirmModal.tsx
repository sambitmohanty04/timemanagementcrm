import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

type DeleteConfirmModalProps = {
  title?: string;
  itemName?: string;
  message?: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const DeleteConfirmModal = ({
  title = "Delete item",
  itemName,
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const onCancelRef = useRef(onCancel);
  const loadingRef = useRef(loading);

  useEffect(() => {
    onCancelRef.current = onCancel;
    loadingRef.current = loading;
  }, [onCancel, loading]);

  // Close on Escape (blocked while the request is running)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loadingRef.current) onCancelRef.current();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Focus Cancel (the safe option) when the modal opens
  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => {
        if (!loading) onCancel();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-message"
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-full bg-red-500/10 p-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onCancel}
            disabled={loading}
            className="rounded-full p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <h2
          id="delete-modal-title"
          className="mt-4 text-lg font-semibold text-white"
        >
          {title}
        </h2>

        <p id="delete-modal-message" className="mt-2 text-sm text-slate-400">
          {itemName && (
            <>
              <span className="font-medium text-white break-words">
                "{itemName}"
              </span>{" "}
              will be permanently deleted.{" "}
            </>
          )}
          {message}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;