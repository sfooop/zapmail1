import { Mail, AlertCircle } from 'lucide-react';
import { EmailMessage } from '../hooks/useMailbox';
import { motion } from 'framer-motion';

interface InboxListProps {
  messages: EmailMessage[];
  onSelectMessage: (message: EmailMessage) => void;
  selectedId?: string;
  isLoading?: boolean;
}

export const InboxList = ({
  messages,
  onSelectMessage,
  selectedId,
  isLoading,
}: InboxListProps) => {
  if (isLoading) {
    return (
      <div className="card-dark h-96 flex items-center justify-center">
        <div className="animate-pulse-slow text-center">
          <Mail className="mx-auto mb-4 text-accent" size={40} />
          <p className="text-gray-400">جاري تحميل الرسائل...</p>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="card-dark h-96 flex flex-col items-center justify-center text-center">
        <AlertCircle className="text-gray-400 mb-4" size={40} />
        <p className="text-gray-300 mb-2">لا توجد رسائل حالياً</p>
        <p className="text-gray-400 text-sm">استخدم بريدك لتسجيل حساب جديد واستقبال رسائل التفعيل</p>
      </div>
    );
  }

  return (
    <div className="card-dark space-y-2 max-h-96 overflow-y-auto">
      {messages.map((message, index) => (
        <motion.button
          key={message.id}
          onClick={() => onSelectMessage(message)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`w-full text-right p-4 rounded-lg border transition-all ${
            selectedId === message.id
              ? 'bg-accent/20 border-accent'
              : 'border-dark-border hover:border-accent/50 bg-dark-bg/50'
          }`}
        >
          <div className="flex items-start gap-3">
            <Mail className="flex-shrink-0 mt-1 text-accent" size={18} />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white truncate">{message.from.name || message.from.address}</p>
              <p className="text-sm text-gray-400 truncate">{message.subject}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(message.createdAt).toLocaleString('ar-EG')}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
