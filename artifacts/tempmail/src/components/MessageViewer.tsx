import { X, Download, Copy } from 'lucide-react';
import { EmailMessage } from '../hooks/useMailbox';

interface MessageViewerProps {
  message: EmailMessage | null;
  onClose: () => void;
}

export const MessageViewer = ({ message, onClose }: MessageViewerProps) => {
  if (!message) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.html || message.text);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([message.html || message.text], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${message.subject}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur flex items-center justify-center p-4">
      <div className="bg-dark-card border border-dark-border rounded-xl max-w-2xl w-full max-h-96 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border sticky top-0 bg-dark-card">
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg">{message.subject}</h3>
            <p className="text-sm text-gray-400 mt-1">من: {message.from.address}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-dark-border rounded transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 border-b border-dark-border">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded transition text-sm"
          >
            <Copy size={16} />
            نسخ
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded transition text-sm"
          >
            <Download size={16} />
            تحميل
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {message.html ? (
            <iframe
              srcDoc={message.html}
              className="w-full min-h-80 border border-dark-border rounded"
              sandbox={{ allow: ['same-origin'] as any }}
            />
          ) : (
            <div className="bg-dark-bg/50 p-4 rounded text-gray-300 whitespace-pre-wrap text-sm">
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
