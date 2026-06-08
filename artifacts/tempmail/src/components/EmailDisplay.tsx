import { Copy, RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface EmailDisplayProps {
  email: string;
  password: string;
  onRefresh: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}

export const EmailDisplay = ({
  email,
  password,
  onRefresh,
  onDelete,
  isLoading,
}: EmailDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-dark-card to-dark-bg border border-accent/30 rounded-xl p-8 glow-border">
      {/* Email */}
      <div className="mb-6">
        <label className="text-gray-400 text-sm block mb-2">البريد الإلكتروني</label>
        <div className="flex items-center gap-3 bg-dark-bg/50 rounded-lg p-4 border border-dark-border">
          <input
            type="text"
            value={email}
            readOnly
            className="flex-1 bg-transparent outline-none text-accent font-mono text-sm"
          />
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-accent/10 rounded transition text-accent"
            title="نسخ البريد"
          >
            <Copy size={20} />
          </button>
        </div>
        {copied && <p className="text-accent text-sm mt-2">✓ تم النسخ</p>}
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="text-gray-400 text-sm block mb-2">كلمة المرور</label>
        <div className="flex items-center gap-3 bg-dark-bg/50 rounded-lg p-4 border border-dark-border">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            readOnly
            className="flex-1 bg-transparent outline-none text-gray-300 font-mono text-sm"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 hover:bg-accent/10 rounded transition text-gray-400"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex-1 gradient-btn px-4 py-3 rounded-lg flex items-center justify-center gap-2 text-white disabled:opacity-50"
        >
          <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
          تحديث البريد
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-danger/20 hover:bg-danger/30 border border-danger/50 text-danger px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <Trash2 size={20} />
          حذف
        </button>
      </div>
    </div>
  );
};
