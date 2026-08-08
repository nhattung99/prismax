import React from 'react';
import { AlertTriangle, Trash2, RotateCcw, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  type: 'delete_session' | 'reset_seed';
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  type,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  const isReset = type === 'reset_seed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#202020] border border-[rgba(223,216,208,0.15)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            {isReset ? <RotateCcw className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#9A938A] hover:text-white rounded-lg hover:bg-[rgba(223,216,208,0.08)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white font-serif-editorial">
            {isReset ? 'Reset Data to Default Seed Dataset?' : 'Confirm Session Deletion'}
          </h3>
          <p className="text-xs text-[#9A938A] mt-1.5 leading-relaxed">
            {isReset
              ? 'This action will reset your teleop log history back to the initial 15 demonstration sessions for Piper, TOK2, and YAM. All current sessions in local storage will be replaced.'
              : 'Are you sure you want to permanently delete this teleop session log? This action cannot be undone.'}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-[rgba(223,216,208,0.08)]">
          <button onClick={onClose} className="btn-secondary text-xs px-4 py-2">
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn-danger text-xs px-4 py-2 flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{isReset ? 'Reset Demo Data' : 'Delete Session'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
